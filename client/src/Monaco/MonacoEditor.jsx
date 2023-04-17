/* eslint-disable */

import React from 'react';
import './vs-dark.css';
import Editor from '@monaco-editor/react';

function MonacoEditor() {
  function handleEditorDidMount(editor, monaco) {
    console.log('Editor is mounted:', editor);
    // return () => {
    //   editor.dispose();
    // };
  }

  function handleEditorChange(value, event) {
    console.log('Value changed:', value);
  }

  return (
    <Editor
      // width="800"
      height="60vh"
      language="javascript"
      textAlign="start"
      theme="vs-dark"
      value=""
      editorDidMount={handleEditorDidMount}
      onChange={handleEditorChange}
    />
  );
}

export default MonacoEditor;
