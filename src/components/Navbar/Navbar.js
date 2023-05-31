import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Style.css';


function Navbar() {
  const uToken = sessionStorage.getItem('utoken');
  const token = sessionStorage.getItem('token');
  const savedUsername = localStorage.getItem('username');
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear('token');
    sessionStorage.clear('utoken');
  }
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredOutside, setIsHoveredOutside] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsHoveredOutside(false);
  };

  const handleMouseEnterOutside = () => {
    setIsHoveredOutside(true);
  };

  const handleMouseLeaveOutside = () => {
    setIsHoveredOutside(false);
  };

  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const toggleBrandDropdown = () => {
    setIsBrandDropdownOpen(!isBrandDropdownOpen);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  return (
    <div className='menu-bar'>
      <div className='row operations'>
        <div className='col-md-8'></div>
        <div className='col-md-2'>
          <a>Thông báo | </a>
          <a>Hỗ trợ | </a>
          <a>Ngôn ngữ </a>
        </div>
        <div className='col-md-2 log-blk'>
          {uToken ? (
            <div style={{ position: 'relative' }}>
              <a
                href="/profile"
                className="login-text"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {savedUsername}
              </a>
              {(isHovered || isHoveredOutside) && (
                <div className='hover-logout'
                  onMouseEnter={handleMouseEnterOutside}
                  onMouseLeave={handleMouseLeaveOutside}
                  onClick={logout}
                >
                  <a href="/login" >Logout</a>
                </div>
              )}
            </div>
          ) : (
            <div className='log-blk'>
              <div>
                <a href="/login" className="login-text">Đăng nhập | </a>
                <a href="/register" className="login-text"> Đăng ký</a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-2'>
          <div className="">
            <Link to="/">
              <div className='shopName'>VaAnh</div>
            </Link>
          </div>
        </div>
        <div className='col-md-4'>
          <form className="form-inline">
            <input
              type="text"
              className="search-box"
              placeholder="Search"
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
        </div>
        <div className='col-md-6 '>
          <ul className="nav">
            <li
              className={`dropdown-wrapper ${isProductDropdownOpen ? 'open' : ''}`}
              onMouseEnter={toggleProductDropdown}
              onMouseLeave={toggleProductDropdown}
            >
              <Link to="products" className="nav-link">Sản phẩm</Link>
              {isProductDropdownOpen && (
                <ul className="dropdown">
                  <Link to="/products" className="nav-link nav-link-children">Danh sách</Link>
                  <Link to="/add-product" className="nav-link nav-link-children">Thêm mới</Link>
                </ul>
              )}
            </li>
            <Link to="orders" className="nav-link">Đơn hàng</Link>
            <li
              className={`dropdown-wrapper ${isBrandDropdownOpen ? 'open' : ''}`}
              onMouseEnter={toggleBrandDropdown}
              onMouseLeave={toggleBrandDropdown}
            >
              <Link to="products" className="nav-link">Thương hiệu</Link>
              {isBrandDropdownOpen && (
                <ul className="dropdown">
                  <Link to="/products" className="nav-link nav-link-children">Danh sách</Link>
                  <Link to="/orders" className="nav-link nav-link-children">Thêm mới</Link>
                </ul>
              )}
            </li>
            <li
              className={`dropdown-wrapper ${isCategoryDropdownOpen ? 'open' : ''}`}
              onMouseEnter={toggleCategoryDropdown}
              onMouseLeave={toggleCategoryDropdown}
            >
              <Link to="products" className="nav-link ">Danh mục</Link>
              {isCategoryDropdownOpen && (
                <ul className="dropdown">
                  <Link to="/products" className="nav-link nav-link-children">Danh mục</Link>
                  <Link to="/xxxx" className="nav-link nav-link-children">Nguyên liệu</Link>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar;