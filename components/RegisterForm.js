"use client"
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/RegisterForm.module.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      await axios.post('/api/auth/register', { username, email, password });
      // Redirect user or show success message
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className={styles.registerBody}>
    <div className={styles.registerContainer}>
      <h2 className={styles.header}>Create a new account</h2>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <TextInput
        label="Username"
        placeholder="Your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <TextInput
        label="Email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={styles.input}
      />
      <Button color="teal" fullWidth onClick={handleRegister} className={styles.button}>
        Sign Up
      </Button>
    </div>
    </div>
  );
};

export default RegisterForm;
