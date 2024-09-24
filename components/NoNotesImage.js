"use client"
import { Image } from '@mantine/core';
import styles from '../styles/NoNotesImage.module.css';

const NoNotesImage = () => {
  return (
    <div className={styles.noNotesContainer}>
      <p>No notes to display. Add a new one!</p>
    </div>
  );
};

export default NoNotesImage;
