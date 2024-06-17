'use client';
import React from 'react';
import { useEditor, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor, Link } from '@mantine/tiptap';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import classes from './RichTextEditor.module.css';
import Placeholder from '@tiptap/extension-placeholder';



function TipTap() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Placeholder.configure({ placeholder: 'Provide your answer to this question here' }),
      Link,
      Underline,
      Subscript,
      Superscript,
    ],
    content: '',
  });

  return (
    <div className={classes.editorContainer}>
      <RichTextEditor editor={editor} styles={{root: {display:'flex', flexdirection: 'column', flex: 1}}}>
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className={classes.bubblemenu}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Link />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>
          </BubbleMenu>
        )}
        <RichTextEditor.Content className={classes.editorContent} />
      </RichTextEditor>
    </div>
  );
}

export default TipTap;
