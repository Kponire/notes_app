"use client";
import { TextInput, PasswordInput, Button, Anchor } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import styles from '../styles/RegisterForm.module.css';

const RegisterForm = () => {
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      username: (value) => (value.length < 2 ? 'Username must be at least 2 characters long' : null),
      email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email format'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters long' : null),
      confirmPassword: (value, values) => (value !== values.password ? "Passwords don't match" : null),
    },
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      
      // Show success notification
      showNotification({
        title: 'Success',
        message: 'Registration successful! Redirecting to login...',
        color: 'green',
      });
      
      // Redirect user or perform other actions here
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Registration failed. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerBody}>
      <div className={styles.registerContainer}>
        <h2 className={styles.header}>Create a new account</h2>
        
        <form onSubmit={form.onSubmit(handleRegister)}>
          <TextInput
            label="Username"
            placeholder="Your username"
            {...form.getInputProps('username')}
            classNames={{
              input: styles.input,
              label: styles.inputLabel
            }}
          />
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
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            {...form.getInputProps('confirmPassword')}
            classNames={{
              input: styles.input,
              label: styles.inputLabel
            }}
          />
          <Button color="teal" fullWidth type="submit" loading={loading} disabled={loading} className={styles.button}>
            Sign Up
          </Button>
        </form>

        <Anchor c={'teal'} href="/login" size="sm" className={styles.loginLink}>
          Already registered? Login
        </Anchor>
      </div>
    </div>
  );
};

export default RegisterForm;
