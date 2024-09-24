"use client";
import { TextInput, Button } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';
import styles from '../styles/ForgotPasswordForm.module.css';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Please enter a valid email address',
    },
  });

  const handleForgotPassword = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgotPassword', { email: values.email });
      showNotification({
        title: 'Success',
        message: response.data.message || 'If an account exists for this email, a reset link will be sent.',
        color: 'green',
      });
      router.push('/reset-password')
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.response?.data.message || 'Unable to process the request. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.forgotPasswordBody}>
      <div className={styles.forgotPasswordContainer}>
        <h2 className={styles.header}>Forgot Password</h2>

        <form onSubmit={form.onSubmit(handleForgotPassword)}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps('email')}
            classNames={{
              input: styles.input,
              label: styles.inputLabel
            }}
          />
          <Button
            color="teal"
            fullWidth
            type="submit"
            loading={loading}
            disabled={loading}
            className={styles.button}
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
