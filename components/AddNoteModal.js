"use client"
import { Modal, Button } from '@mantine/core';
import { useState } from 'react';
import NoteForm from './NoteForm';
import styles from '../styles/AddNoteModal.module.css';

const AddNoteModal = ({ onSubmit }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)} className={styles.addButton}>+ Add Note</Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add a new note">
        <NoteForm onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

export default AddNoteModal;
