"use client"
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await axios.post('/api/auth/login', { email, password });
  };

  return (
    <div>
      <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button color="teal" onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default LoginForm;
