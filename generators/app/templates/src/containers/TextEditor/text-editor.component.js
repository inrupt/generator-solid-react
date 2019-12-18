/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SolidAuth from 'solid-auth-client';
import { successToaster, errorToaster } from '@utils';
import ldflex from '@solid/query-ldflex';
import { AccessControlList } from '@inrupt/solid-react-components';
import {
  TextEditorWrapper,
  TextEditorContainer,
  Header,
  Form,
  FullGridSize,
  Button,
  Label,
  Input,
  TextArea,
  WebId
} from './text-editor.style';

type Props = { webId: String };

function extractWacAllow(response) {
  // WAC-Allow: user="read write append control",public="read"
  const modes = {
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
    wacAllowHeader // 'user="read write append control",public="read"'
      .split(',') // ['user="read write append control"', 'public="read"']
      .map(str => str.trim())
      .forEach(statement => {
        // 'user="read write append control"'
        const parts = statement.split('='); // ['user', '"read write control"']
        if (
          parts.length >= 2 &&
          ['user', 'public'].indexOf(parts[0]) !== -1 &&
          parts[1].length > 2
        ) {
          const modeStr = parts[1].replace(/"/g, ''); // 'read write control' or ''
          if (modeStr.length) {
            modeStr.split(' ').forEach(mode => {
              modes[parts[0]][mode] = true;
            });
          }
        }
      });
  }
  return modes;
}

export const Editor = ({ webId }: Props) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [friend, setFriend] = useState('https://example-friend.com/profile/card#me');
  const [text, setText] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [editable, setEditable] = useState(false);
  const [sharable, setSharable] = useState(false);

  async function setUrlFromStorage() {
    if (webId && !url) {
      const storageRoot = await ldflex[webId]['pim:storage'];
      if (storageRoot) {
        const exampleUrl = new URL('/share/some-doc.txt', storageRoot.value);
        setUrl(exampleUrl);
      }
    }
  }

  useEffect(() => {
    setUrlFromStorage();
  }, [webId]);

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
    const doc = SolidAuth.fetch(url);
    doc
      .then(async response => {
        const text = await response.text();
        if (response.ok) {
          setText(text);
        } else if (response.status === 404) {
          successToaster(t('notifications.404'));
        } else {
          errorToaster(t('notifications.errorLoading'));
        }
        const wacAllowModes = extractWacAllow(response);
        setEditable(wacAllowModes.user.write);
        setSharable(wacAllowModes.user.control);
        setLoaded(true);
      })
      .catch(() => {
        errorToaster(t('notifications.errorFetching'));
      });
  } // assuming the logged in user doesn't change without a page refresh

  async function handleShare(event) {
    event.preventDefault();
    try {
      const permissions = [
        {
          agents: [friend],
          modes: [AccessControlList.MODES.READ, AccessControlList.MODES.WRITE]
        }
      ];
      const ACLFile = new AccessControlList(webId, url);
      await ACLFile.createACL(permissions);
      successToaster(t('notifications.accessGranted'));
    } catch (e) {
      errorToaster(t('notifications.errorGrantingAccess'));
    }
  }

  async function handleSave(event) {
    event.preventDefault();
    // Not using LDFlex here, because this is not an RDF document.
    const result = await SolidAuth.fetch(url, {
      method: 'PUT',
      body: text,
      headers: {
        'Content-Type': 'text/plain'
      }
    });

    if (result.ok) {
      successToaster(t('notifications.saved'));
    } else if (result.ok === false) {
      errorToaster(t('notifications.errorSaving'));
    }
  }

  return (
    <Form>
      <FullGridSize>
        <WebId>
          <b>
            Connected as: <a href={webId}>{webId}</a>
          </b>
        </WebId>
      </FullGridSize>
      <FullGridSize>
        <Label>
          {t('editor.url')}:
          <Input type="text" size="200" value={url} onChange={handleUrlChange} />
        </Label>
        <div className="input-wrap">
          <Button className="ids-link-filled ids-link-filled--primary button" onClick={handleLoad}>
            {t('editor.load')}
          </Button>
          {editable ? (
            <Button
              className="ids-link-filled ids-link-filled--secondary button"
              onClick={handleSave}
            >
              {t('editor.save')}
            </Button>
          ) : loaded ? (
            t('notifications.notEditable')
          ) : (
            ''
          )}
        </div>
      </FullGridSize>
      <FullGridSize>
        <TextArea value={text} onChange={handleTextChange} cols={40} rows={10} />
      </FullGridSize>
      {sharable && (
        <FullGridSize>
          <Label>
            {t('editor.friend')}:
            <Input type="text" size="200" value={friend} onChange={handleFriendChange} />
          </Label>
          <Button className="ids-link-stroke ids-link-stroke--primary button" onClick={handleShare}>
            {t('editor.grantAccess')}
          </Button>
        </FullGridSize>
      )}
      {loaded && !sharable && t('notifications.notSharable')}
    </Form>
  );
};

/**
 * A React component page that is displayed when there's no valid route. Users can click the button
 * to get back to the home/welcome page.
 */
const TextEditor = ({ webId }: Props) => {
  const { t } = useTranslation();
  console.log(webId);
  return (
    <TextEditorWrapper>
      <TextEditorContainer>
        <Header>
          <p>{t('editor.explanation')}</p>
        </Header>
        <Editor webId={webId} />
      </TextEditorContainer>
    </TextEditorWrapper>
  );
};

export default TextEditor;
