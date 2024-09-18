import { TextInput, Button, ColorInput, Textarea } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import { useState } from 'react';
import axios from 'axios';
import { TagsInput } from '@mantine/lab';
import styles from '../styles/NoteForm.module.css';

const NoteForm = ({ note, onSubmit }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState(note?.tags || []);
  const [color, setColor] = useState(note?.color || '#fff');

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
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="Write your note here..."
        className={styles.editor}
      />
      <Button onClick={handleSubmit} color="teal" fullWidth className={styles.submitButton}>
        Add Note
      </Button>
    </div>
  );
};

export default NoteForm;
