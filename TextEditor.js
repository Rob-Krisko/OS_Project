import React, { useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, getDefaultKeyBinding } from 'draft-js';
import styles from './TextEditor.module.css';

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);
  const fileInput = useRef(null);

  // style toggling
  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  // saving and opening
  const saveFile = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const file = new Blob([JSON.stringify(raw, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = 'myFile.json';
    link.click();
  }

  const openFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      const raw = JSON.parse(event.target.result);
      const contentState = convertFromRaw(raw);
      setEditorState(EditorState.createWithContent(contentState));
    }
    reader.readAsText(file);
  }

  const onTab = (e) => {
    e.preventDefault();
    const newContentState = RichUtils.onTab(e, editorState, 4);
    if (newContentState !== editorState) {
      setEditorState(newContentState);
    }
  };

  // render
  return (
    <div className={styles.textEditor}>
      <button onClick={() => toggleInlineStyle('BOLD')}><b>B</b></button>
      <button onClick={() => toggleInlineStyle('ITALIC')}><i>I</i></button>
      <button onClick={() => toggleInlineStyle('UNDERLINE')}><u>U</u></button>
      <button onClick={() => toggleBlockType('align-left')}>Left Align</button>
      <button onClick={() => toggleBlockType('align-center')}>Center Align</button>
      <button onClick={() => toggleBlockType('align-right')}>Right Align</button>
      <button onClick={saveFile}>Save</button>
      <button onClick={() => fileInput.current.click()}>Open</button>
      <input type="file" onChange={openFile} style={{display: 'none'}} ref={fileInput} />
      <div className={styles.editor} ref={editor}>
        <Editor 
          editorState={editorState} 
          onChange={setEditorState}
          onTab={onTab} 
        />
      </div>
    </div>
  );
}

export default TextEditor;
