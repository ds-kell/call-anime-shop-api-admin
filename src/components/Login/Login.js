import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials) {
  try {
    const response = await axios.post('http://localhost:8088/api/auth/signin', credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message); // Ném lỗi với thông báo từ API
    } else {
      throw error;
    }
  }
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Thêm state mới để lưu trữ thông báo lỗi
  const navigate = useNavigate();
  const [shouldNavigate, setNavigate] = useState(false);

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/');
    }
  }, [shouldNavigate, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = await loginUser({
        username,
        password
      });
      if (token) {
        setToken(token);
        setNavigate(true);
        localStorage.setItem('username', username);
      }
    } catch (error) {
      setError(error.message); // Lưu trữ thông báo lỗi trong state error
    }
  }

  return (
    <div className='row'>
      <div className="col-md-4">
      </div>
      <div className="col-md-4">
        <div className='login_block'>
          <form onSubmit={handleSubmit}>
            <div className='input_block'>
              <label>
                <input className='input' type="text" onChange={e => setUserName(e.target.value)} placeholder='Username' />
              </label><br></br>
              <label>
                <input className='input' type="password" onChange={e => setPassword(e.target.value)} placeholder='Password' />
              </label>
            </div>
            <div className='submitBtn'>
              {error && <div className='error-message'>{error}</div>} {/* Hiển thị thông báo lỗi */}
              <button type="submit">Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-4">
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export { loginUser };
