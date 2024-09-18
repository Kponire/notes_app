"use client"
import { TextInput, Button } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/ForgotPasswordForm.module.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setSuccessMessage('If an account exists for this email, a password reset link will be sent.');
      setErrorMessage(''); // Clear error message
    } catch (error) {
      setErrorMessage('Unable to process the request. Please try again.');
      setSuccessMessage(''); // Clear success message
    }
  };

  return (
    <div className={styles.forgotPasswordBody}>
    <div className={styles.forgotPasswordContainer}>
      <h2 className={styles.header}>Forgot Password</h2>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <TextInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <Button color="teal" fullWidth onClick={handleForgotPassword} className={styles.button}>
        Send Reset Link
      </Button>
    </div>
    </div>
  );
};

export default ForgotPasswordForm;
