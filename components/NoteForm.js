"use client"
import { TextInput, Button, ColorInput, Textarea, TagsInput } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useState } from 'react';
import styles from '../styles/NoteForm.module.css';

const NoteForm = ({ note, onSubmit }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState(Array.isArray(note?.tags) ? note?.tags : note?.tags?.split(',') || []);
  const [color, setColor] = useState(note?.color || '#cc2121');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Write your note here...' })
    ],
    onUpdate(props) {
      const upcontent = props.editor.getHTML();
      setContent(upcontent);
    },
    content,
  });

  useEffect(() => {
    console.log(content);
  }, [content]);

  const handleSubmit = async () => {
    const noteData = { title, content, tags, color };
    await onSubmit(noteData);
  };

  return (
    <div className={styles.formContainer}>
      <TextInput
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter note title"
        className={styles.input}
      />
      <TagsInput
        label="Tags"
        value={tags}
        onChange={setTags}
        placeholder="Enter tags"
        className={styles.input}
      />
      <ColorInput
        label="Background Color"
        value={color}
        onChange={setColor}
        className={styles.input}
      />
      <RichTextEditor editor={editor} onChange={(e) => setContent(e.target.value)}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
      <Button onClick={handleSubmit} color="teal" fullWidth className={styles.submitButton}>
        Add Note
      </Button>
    </div>
  );
};

export default NoteForm;
