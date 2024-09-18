import { TextInput, Button } from '@mantine/core';
import { useState } from 'react';
import axios from 'axios';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    await axios.post('/api/auth/forgot-password', { email });
  };

  return (
    <div>
      <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button color="teal" onClick={handleSubmit}>Send Reset Link</Button>
    </div>
  );
};

export default ForgotPasswordForm;
