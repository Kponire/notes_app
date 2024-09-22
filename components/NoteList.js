"use client";
import { Card, Text, Badge, Group, ActionIcon, Modal } from '@mantine/core';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useState } from 'react';
import styles from '../styles/NoteList.module.css';
import NoteForm from './NoteForm';
import { format } from 'date-fns';

const NoteList = ({ notes, onEdit, onDelete }) => {
  const [opened, setOpened] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const handleEditClick = (note) => {
    setNoteToEdit(note);
    setOpened(true);
  };

  const handleEditSubmit = async (noteData) => {
    await onEdit({ ...noteToEdit, ...noteData });
    setOpened(false);
  };

  if (notes.length === 0) {
    return <p>No notes available. Add a new one!</p>;
  }

  return (
    <div className={styles.noteListContainer}>
      {notes.map((note) => (
        <Card
          key={note.id}
          shadow="md"
          p="lg"
          style={{ backgroundColor: note.color || '#f5f5f5' }}
          className={styles.noteCard}
        >
          <Group position="apart">
            <Text weight={600} size="lg">{note.title}</Text>
            <Badge>{note.tags ? note.tags.split(',').join(', ') : 'No Tags'}</Badge>
          </Group>
          
          <Text size="sm" mt="md" dangerouslySetInnerHTML={{ __html: note.content }} />

          <Group position="apart" mt="md">
            <Text size="xs" color="dimmed">
              Created: {format(new Date(note.created_at), 'PPpp')}
            </Text>
            <Text size="xs" color="dimmed">
              Updated: {format(new Date(note.updated_at), 'PPpp')}
            </Text>
          </Group>

          <Group position="right" mt="md">
            <ActionIcon color="blue" onClick={() => handleEditClick(note)}>
              <FiEdit />
            </ActionIcon>
            <ActionIcon color="red" onClick={() => onDelete(note.id)}>
              <FiTrash />
            </ActionIcon>
          </Group>
        </Card>
      ))}

      <Modal opened={opened} onClose={() => setOpened(false)} title="Edit Note">
        <NoteForm note={noteToEdit} onSubmit={handleEditSubmit} />
      </Modal>
    </div>
  );
};

export default NoteList;
