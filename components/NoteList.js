"use client";
import { Card, Text, Badge, Group, ActionIcon, Modal, Tooltip, Box, Divider, Menu, rem } from '@mantine/core';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { FaBell, FaArchive, FaThumbtack, FaTrashRestore } from 'react-icons/fa'; 
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import styles from '../styles/NoteList.module.css';
import NoteForm from './NoteForm';
import { format } from 'date-fns';

const NoteList = ({ notes, onEdit, onDelete, onPin, onArchive, onReminder, categories }) => {
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

  const handleDeleteClick = async (note) => {
    if (note.trash) {
      await onDelete(note.id, true); // Pass true to indicate permanent delete
    } else {
      await onDelete(note.id, false, true); // Soft delete (move to trash)
    }
  };

  const renderIcon = (isActive, ActiveIcon, InactiveIcon, onClickHandler, tooltipText) => (
    <Tooltip label={tooltipText} position="top">
      <ActionIcon onClick={onClickHandler} color={isActive ? 'teal' : 'gray'}>
        {isActive ? <ActiveIcon /> : <InactiveIcon />}
      </ActionIcon>
    </Tooltip>
  );

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
          style={{ backgroundColor: note.background_color || '#f5f5f5' }}
          className={styles.noteCard}
        >
          <Box>
            <Text size="xs" color="dimmed">
              Created: {format(new Date(note.created_at), 'PPpp')}
            </Text>
          </Box>
          <Box className={styles.titleBody}>
            <Text fw={600} size="lg" c={'black'}>{note.title}</Text>
            <Box className={styles.titleSubBody}>
              <ActionIcon color="teal" onClick={() => handleEditClick(note)}>
                <FiEdit />
              </ActionIcon>
              {
                note.trash ? (
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                    <ActionIcon color="red">
                      <FiTrash />
                    </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item fw={'bold'} c={'teal'} onClick={() =>  onDelete(note.id, false, false)} leftSection={<FaTrashRestore style={{ width: rem(14), height: rem(14) }} />}>
                        Restore
                      </Menu.Item>
                      <Menu.Item fw={'bold'} c={'red'} onClick={() =>  onDelete(note.id, true)} leftSection={<MdDelete style={{ width: rem(14), height: rem(14) }} />}>
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>

                ) : (
                  <ActionIcon color="red" onClick={() => handleDeleteClick(note)}>
                    <FiTrash />
                  </ActionIcon>
                )
              }
            </Box>
          </Box>
          <Divider my={'15px'} />
          <Text style={{ height: 'fit-contain', wordWrap: 'break-word'}} dangerouslySetInnerHTML={{ __html: note.content }} />
          <Badge bg={'teal'}>{note.tags ? note.tags.split(',').join(', ') : 'No Tags'}</Badge>

          <Box className={styles.footer}>
            <Text size="xs" color="dimmed">
              {format(new Date(note.updated_at), 'PPpp')}
            </Text>
            <Box className={styles.subFooter}>
            {/* Pin icon */}
            {renderIcon(
              note.pinned, 
              FaThumbtack, 
              FaThumbtack, 
              () => onPin(note.id, !note.pinned), 
              note.pinned ? 'Unpin' : 'Pin'
            )}

            {/* Archive icon */}
            {renderIcon(
              note.archived, 
              FaArchive, 
              FaArchive, 
              () => onArchive(note.id, !note.archived), 
              note.archived ? 'Unarchive' : 'Archive'
            )}

            {/* Reminder icon */}
            {renderIcon(
              note.reminder, 
              FaBell, 
              FaBell, 
              () => onReminder(note.id), 
              note.reminder ? 'Remove Reminder' : 'Set Reminder'
            )}
            </Box>
          </Box>
        </Card>
      ))}

      <Modal opened={opened} onClose={() => setOpened(false)} title="Edit Note">
        <NoteForm note={noteToEdit} onSubmit={handleEditSubmit} categories={categories} text={"Update Note"} />
      </Modal>
    </div>
  );
};

export default NoteList;
