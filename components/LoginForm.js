"use client";
import { TextInput, PasswordInput, Button, Anchor } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import styles from '../styles/LoginForm.module.css';

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email format'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters long' : null),
    },
  });

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: values.email,
        password: values.password,
      });

      // Store token and redirect to notes page
      localStorage.setItem('token', response.data.token);
      showNotification({
        title: 'Login Successful',
        message: 'Redirecting to your notes...',
        color: 'green',
      });
      router.push('/notes');
    } catch (error) {
      showNotification({
        title: 'Login Failed',
        message: 'Invalid email or password. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginBody}>
      <div className={styles.loginContainer}>
        <h2 className={styles.header}>Login to your account</h2>

        <form onSubmit={form.onSubmit(handleLogin)}>
          <TextInput
            label="Email"
            placeholder="Your email"
            {...form.getInputProps('email')}
            classNames={{
              input: styles.input,
              label: styles.inputLabel
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('password')}
            classNames={{
              input: styles.input,
              label: styles.inputLabel
            }}
          />
          <Button color="teal" fullWidth type="submit" disabled={loading} loading={loading} className={styles.button}>
            Login
          </Button>
        </form>

        <p className={styles.forgotPassword}>
          <Anchor href="/forgot-password">Forgot Password?</Anchor>
        </p>

        <Anchor c={'teal'} href="/register" size="sm" className={styles.registerLink}>
          Not yet registered? Sign Up
        </Anchor>
      </div>
    </div>
  );
};

export default LoginForm;
