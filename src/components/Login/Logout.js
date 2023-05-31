import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function Logout() {

  const navigate = useNavigate();
  const logout = () => {
    // localStorage.removeItem('token');
    // delete axios.defaults.headers.common['Authorization'];
    // navigate.push('/login');
    // alert('Bạn chắc chắn muốn đăng xuất!');
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/';
  }
  return (
    <a href="/" onClick={logout}>
    Đăng xuất
    </a>
  );
}
