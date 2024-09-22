"use client"
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../styles/LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      router.push('/notes'); // Redirect to the notes page on successful login
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className={styles.loginBody}>
    <div className={styles.loginContainer}>
      <h2 className={styles.header}>Login to your account</h2>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
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
      <Button color="teal" fullWidth onClick={handleLogin} className={styles.button}>
        Login
      </Button>
      <p className={styles.forgotPassword}>
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </div>
    </div>
  );
};

export default LoginForm;
