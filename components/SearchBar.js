"use client"
import { TextInput } from '@mantine/core';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ value, onChange }) => {
  return (
    <TextInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search notes..."
      className={styles.searchBar}
    />
  );
};

export default SearchBar;
