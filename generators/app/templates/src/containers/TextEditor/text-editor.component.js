/* eslint-disable constructor-super */
import React, { useState, useEffect } from 'react';
import { TextEditorWrapper, TextEditorContainer, Header, Form, FullGridSize, Button, Label, Input, TextArea, WebId } from './text-editor.style';
import SolidAuth from 'solid-auth-client';
import { successToaster, errorToaster } from '@utils';
import LinkHeader from 'http-link-header';
// import ldflex from '@solid/query-ldflex';
import { fetchDocument, createDocument } from 'tripledoc';
import { rdf, acl /*, pim */ } from 'rdf-namespaces';
import { useWebId } from '@solid/react';

const pim = { storage: 'http://www.w3.org/ns/pim/space#storage' };

// copied from https://gitlab.com/vincenttunru/tripledoc/blob/master/src/document.ts#L115-126

function extractAclRef(response, documentRef) {
  let aclRef;
  const linkHeader = response.headers.get('Link');
  if (linkHeader) {
    const parsedLinks = LinkHeader.parse(linkHeader);
    const aclLinks = parsedLinks.get('rel', 'acl');
    if (aclLinks.length === 1) {
      aclRef = new URL(aclLinks[0].uri, documentRef).href;
    }
  }
  console.log('aclRef', aclRef);
  if (!aclRef) {
    aclRef = documentRef + '.acl';
  }
  return aclRef;
}

function extractWacAllow(response) {
  // WAC-Allow: user="read write append control",public="read"
  let modes = {
    user: {
      read: false,
      append: false,
      write: false,
      control: false
    },
    public: {
      read: false,
      append: false,
      write: false,
      control: false
    }
  };
  const wacAllowHeader = response.headers.get('WAC-Allow');
  if (wacAllowHeader) {
    console.log({ wacAllowHeader });
    wacAllowHeader // 'user="read write append control",public="read"'
      .split(',') // ['user="read write append control"', 'public="read"']
      .map(str => str.trim())
      .forEach(statement => { // 'user="read write append control"'
         const parts = statement.split('='); // ['user', '"read write control"']
         if (parts.length >= 2 && ['user', 'public'].indexOf(parts[0]) !== -1 && parts[1].length > 2) {
           const modeStr = parts[1].replace(/"/g, ''); // 'read write control' or ''
           console.log(`modes for ${parts[0]}`, parts, modeStr);
           if (modeStr.length) {
            modeStr.split(' ').forEach(mode => {
              modes[parts[0]][mode] = true; 
            });
          }
        }
      });
  }
  console.log({ modes });
  return modes;
}

export const Editor = (props) => {
  const [url, setUrl] = useState('');
  const [aclUrl, setAclUrl] = useState('');
  const [friend, setFriend] = useState('https://example-friend.com/profile/card#me');
  const [text, setText] = useState('');
  const [profileDoc, setProfileDoc] = useState();
  const webId = useWebId();
  useEffect(() => {
    async function fetchProfileDoc () {
      if (webId) {
        setProfileDoc(await fetchDocument(webId));
      }
    }
    fetchProfileDoc();
  }, [webId]);
  useEffect(() => {
    if (profileDoc && !url) {
      const sub = profileDoc.getSubject(webId);
      const storageRoot = sub.getNodeRef(pim.storage);
      if (storageRoot) {
        const exampleUrl = new URL('/share/some-doc.txt', storageRoot);
        setUrl(exampleUrl.toString());
        setAclUrl(exampleUrl.toString() + '.acl');
      }
    }
  }, [profileDoc]);

  const [loaded, setLoaded] = useState(false);
  const [editable, setEditable] = useState(false);
  const [sharable, setSharable] = useState(false);

  function handleUrlChange(event) {
    event.preventDefault();
    setUrl(event.target.value);
  }

  function handleFriendChange(event) {
    event.preventDefault();
    setFriend(event.target.value);
  }

  function handleTextChange(event) {
    event.preventDefault();
    setText(event.target.value);
  }

  function handleLoad(event) {
    event.preventDefault();
    console.log('handle load!');
    const doc = SolidAuth.fetch(url);
    doc.then(async (response) => {
      const text = await response.text();
      console.log('fetched', text);
      if (response.ok) {
        setText(text);
      }
      const wacAllowModes = extractWacAllow(response);
      setEditable(wacAllowModes.user.write);
      setSharable(wacAllowModes.user.control);
      setAclUrl(extractAclRef(response, url));
      setLoaded(true);
    });
  } // assuming the logged in user doesn't change without a page refresh

  async function handleShare(event) {
    event.preventDefault();
    try {
      // not sure how to do this with ldflex,
      // will use TripleDoc for now:
      let doc;
      try {
        doc = await fetchDocument(aclUrl);
      } catch(e) {
        doc = createDocument(aclUrl);
      }

      const subOwner = doc.getSubject(new URL('#owner', url).toString());
      subOwner.setNodeRef(rdf.type, acl.Authorization);
      subOwner.setNodeRef(acl.agent, webId);
      subOwner.setNodeRef(acl.accessTo, url);
      subOwner.addNodeRef(acl.mode, acl.Read);
      subOwner.addNodeRef(acl.mode, acl.Write);
      subOwner.addNodeRef(acl.mode, acl.Control);
      const subSharedWith = doc.addSubject();
      subSharedWith.setNodeRef(rdf.type, acl.Authorization);
      subSharedWith.setNodeRef(acl.agent, friend);
      subSharedWith.setNodeRef(acl.accessTo, url);
      subSharedWith.addNodeRef(acl.mode, acl.Read);
      subSharedWith.addNodeRef(acl.mode, acl.Write);
      await doc.save();
      console.log('ACL saved');
      successToaster(`${friend} now has read/write access.`);
    } catch (e) {
      errorToaster('There was an error sharing your file, please try again.');
    }
  }

  async function handleSave(event) {
    event.preventDefault();
    const result = await SolidAuth.fetch(url, {
      method: 'PUT',
      body: text,
      headers: {
        'Content-Type': 'text/plain'
      }
    });

    if (result.ok) {
      successToaster('Your file was saved successfully.');
    } else if(result.ok === false) {
      errorToaster('There was an error saving your file, please try again.');
    }
  }

  return (
    <Form>
      <FullGridSize>
        <WebId><b>Connected as: <a href={webId}>{webId}</a></b></WebId>
      </FullGridSize>
      <FullGridSize>
        <Label>
          URL:
          <Input type="text" size="200" value={url} onChange={handleUrlChange} />
        </Label>
        <div class="input-wrap">
          <Button className="ids-link-filled ids-link-filled--primary button" onClick={handleLoad}>Load</Button>
          {editable ?
            <Button className="ids-link-filled ids-link-filled--secondary button" onClick={handleSave}>Save</Button>
          : (loaded ? '(not editable)' : '')}
        </div>
      </FullGridSize>
      <FullGridSize>
        <TextArea value={text} onChange={handleTextChange} cols={40} rows={10} />
      </FullGridSize>
      {sharable ? <FullGridSize>
        <Label>
          Share:
          <Input type="text" size="200" value={friend} onChange={handleFriendChange} />
        </Label>
        <Button className="ids-link-stroke ids-link-stroke--primary button" onClick={handleShare}>Share</Button>
      </FullGridSize>: '(log in and load a doc on your own pod to enable sharing'}
    </Form>
  );
}

/**
 * A React component page that is displayed when there's no valid route. Users can click the button
 * to get back to the home/welcome page.
 */
const TextEditor = () => {
  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>
          This simple text editor enables you to create a plaintext file and save it in a Pod.
          To make this very clear for the demo you provide a URL as an absolute path to the file in the Pod.
          The Pod can be the one this App has been logged into or another person's Pod.
          To write, and read, into another person's Pod the owner will have had to provide you with
          write permission.
          </p>
        </Header>
        <Editor/>
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default TextEditor;
