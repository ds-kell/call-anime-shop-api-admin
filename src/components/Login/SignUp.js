import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './Login';

function SignUp({ setToken }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8088/api/auth/signup', {
        username,
        email,
        password,
        authorities: ['CUSTOMER']
      });
      if (response.data.message === 'Created') {
        // Đăng nhập tự động
        const token = await loginUser({ username, password });
        if (token) {
          setToken(token);
          setShouldNavigate(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  if (shouldNavigate) {
    navigate('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default SignUp;
