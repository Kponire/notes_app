"use client";
import { PasswordInput, Button } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import styles from '../styles/ResetPasswordForm.module.css';

const ResetPasswordForm = ({token}) => {
  const router = useRouter();
  //const { token } = router.query || 0;
  const [loading, setLoading] = useState(false);
  console.log(token);
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    validate: {
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters long' : null),
      confirmPassword: (value, values) => (value !== values.password ? "Passwords don't match" : null),
    },
  });

  const handleResetPassword = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/resetPassword', {
        token,
        password: values.password,
      });

      // Show success notification based on backend response
      showNotification({
        title: 'Success',
        message: response.data.message,
        color: 'green',
      });

      // Redirect to login page after successful password reset
      router.push('/login');
    } catch (error) {
      showNotification({
        title: 'Reset Failed',
        message: error.response?.data.message || 'Password reset failed. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.resetBody}>
      <div className={styles.resetContainer}>
        <h2 className={styles.header}>Reset your password</h2>

        <form onSubmit={form.onSubmit(handleResetPassword)}>
          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            {...form.getInputProps('password')}
            classNames={{
              input: styles.input,
              label: styles.inputLabel
            }}
          />
          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm your new password"
            {...form.getInputProps('confirmPassword')}
            classNames={{
              input: styles.input,
              label: styles.inputLabel
            }}
          />
          <Button color="teal" fullWidth type="submit" disabled={loading} loading={loading} className={styles.button}>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
