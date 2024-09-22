"use client"
import { Image } from '@mantine/core';
import styles from '../styles/NoNotesImage.module.css';

const NoNotesImage = () => {
  return (
    <div className={styles.noNotesContainer}>
      <Image src="/no-notes.svg" alt="No notes" />
      <p>No notes to display. Add a new one!</p>
    </div>
  );
};

export default NoNotesImage;
