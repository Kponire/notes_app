"use client";
import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from '../styles/NoteList.module.css';

const NoteList = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return <p>No notes available. Add a new one!</p>;
  }

  return (
    <div className={styles.noteListContainer}>
      {notes.map((note) => (
        <Card
          key={note.id}
          shadow="sm"
          p="lg"
          style={{ backgroundColor: note.background_color || '#fff' }}
          className={styles.noteCard}
        >
          <Group position="apart">
            <Text weight={500}>{note.title}</Text>
            <Badge>{note.tags ? note.tags.split(',').join(', ') : 'No Tags'}</Badge> {/* Fix here */}
          </Group>
          <Text size="sm" c="dimmed">{note.content}</Text>
          <Group position="right" mt="md">
            <Button size="xs" color="blue" leftIcon={<FiEdit />} onClick={() => onEdit(note)}>
              Edit
            </Button>
            <Button size="xs" color="red" leftIcon={<FiTrash />} onClick={() => onDelete(note.id)}>
              Delete
            </Button>
          </Group>
        </Card>
      ))}
    </div>
  );
};

export default NoteList;
