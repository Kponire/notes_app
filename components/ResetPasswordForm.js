"use client"
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../styles/ResetPasswordForm.module.css';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { token } = router.query || 0;

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      await axios.post('/api/auth/reset-password', { token, password });
      router.push('/login'); // Redirect to login after successful reset
    } catch (error) {
      setErrorMessage('Password reset failed. Please try again.');
    }
  };

  return (
    <div className={styles.resetBody}>
    <div className={styles.resetContainer}>
      <h2 className={styles.header}>Reset your password</h2>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <PasswordInput
        label="New Password"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <PasswordInput
        label="Confirm New Password"
        placeholder="Confirm your new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={styles.input}
      />
      <Button color="teal" fullWidth onClick={handleResetPassword} className={styles.button}>
        Reset Password
      </Button>
    </div>
    </div>
  );
};

export default ResetPasswordForm;
