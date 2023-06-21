import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
async function loginUser(credentials) {
  try {
    const response = await axios.post('http://localhost:8088/api/auth/signin', credentials);
    console.log(response.status)
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
  const responseFacebook = (response) => {
    console.log(response);
    // Xử lý phản hồi từ đăng nhập với Facebook
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Xử lý phản hồi từ đăng nhập với Google
  };
  return (
    <div className='row'>
      <div className="col-md-4">
        <img src='https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/197576694_2976330212688422_5574281264879702120_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=tBzL5yjA8YwAX_Ef1zK&_nc_ht=scontent.fhan14-1.fna&oh=00_AfCoOPQeASbGM7auWOTVDS08XGaLscb3c6mmXzW8zYCydQ&oe=648E61F8' className='left-img' />
      </div>
      <div className="col-md-4">
        <div className='login_block'>
          <h4>
            Đăng nhập
          </h4>
          <form onSubmit={handleSubmit}>
            <div className='input_block'>
              <label>
                <input className='input' type="text" onChange={e => setUserName(e.target.value)} placeholder='Tên tài khoản' />
              </label><br></br>
              <label>
                <input className='input' type="password" onChange={e => setPassword(e.target.value)} placeholder='Mật khẩu' />
              </label>
            </div>
            <div className='submitBtn'>
              {error && <div className='error-message'>{error}</div>} {/* Hiển thị thông báo lỗi */}
              <button type="submit">Đăng nhập</button>
            </div>
          </form>
          <div className='inline-block'>
            <p className='first-p'>Quên mật khẩu</p>
            <p className='last-p' >Đăng nhập với SMS</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <img src='https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/315593324_676689953811942_6378600367626994891_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=GpHmNw2nWywAX9K4Y0X&_nc_ht=scontent.fhan14-4.fna&oh=00_AfBF5j0Tj7wqvFc0waOC-rCQWTq8hgyQTVe-u9hA3pUhdw&oe=646CE94D' className='right-img' />
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export { loginUser };
