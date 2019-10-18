/* eslint-disable constructor-super */
import React from 'react';
import { TextEditorWrapper, TextEditorContainer, Header, Form, FullGridSize, Button, Label, Input, TextArea } from './text-editor.style';
import SolidAuth from 'solid-auth-client';
import { successToaster, errorToaster } from '@utils';

class Editor extends React.Component {
  state
  constructor(props) {
    super(props);
    this.state = {url: 'https://example-pod.com/shared/some-doc.txt'};

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleUrlChange(event) {
    this.setState({url: event.target.value});
  }

  handleTextChange(event) {
    this.setState({text: event.target.value});
  }

  handleLoad(event) {
    console.log('handle load!');
    event.preventDefault();
    console.log('default prevented!');
    const doc = SolidAuth.fetch(this.state.url);
    doc.then(async (response) => {
      const text = await response.text();
      console.log('fetched', text);
      this.setState({ text });
    });
  }

  async handleSave(event) {
    event.preventDefault();
    const result = await SolidAuth.fetch(this.state.url, {
      method: 'PUT',
      body: this.state.text,
      headers: {
        'Content-Type': 'text/plain'
      }
    });

    if (result.ok) {
      successToaster('Your file was saved successfully.');
    } else if(result.ok === false) {
      errorToaster('There was an error saving your file, please try again.')
    }
  }

  render() {
    return (
      <Form>
        <FullGridSize>
          <Label>
            URL:
            <Input type="text" size="200" value={this.state.url} onChange={this.handleUrlChange} />
          </Label>
          <Button className="is-default button" onClick={this.handleLoad}>Load</Button>
          <Button className="is-warning button" onClick={this.handleSave}>Save</Button>
        </FullGridSize>
        <FullGridSize>
         <TextArea value={this.state.text} onChange={this.handleTextChange} cols={40} rows={10} />
        </FullGridSize>
      </Form>
    );
  }
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
