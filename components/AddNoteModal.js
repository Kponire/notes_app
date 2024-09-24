"use client"
import { Modal, Button } from '@mantine/core';
import { useState } from 'react';
import NoteForm from './NoteForm';
import styles from '../styles/AddNoteModal.module.css';

const AddNoteModal = ({ onSubmit, categories, text }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button bg={'teal'} onClick={() => setOpened(true)} className={styles.addButton}>+ Add Note</Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add a new note">
        <NoteForm onSubmit={onSubmit} categories={categories} text={text} />
      </Modal>
    </>
  );
};

export default AddNoteModal;
