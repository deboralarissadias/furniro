import React from 'react';
import './header.css';
import logo from '../../assets/images/logo.svg';
import user from '../../assets/icons/user.svg';
import search from '../../assets/icons/search.svg';
import heart from '../../assets/icons/heart.svg';
import cart from '../../assets/icons/cart.svg';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  }

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Furniro Logo" onClick={handleLogoClick} style={{cursor: 'pointer'}} />
      </div>
      <nav className="nav-links">
        <Link to="/" >Home</Link>
        <Link to="/shop">Shop</Link>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
      <div className="icons">
        <img src={user} alt="user logo" />
        <img src={search} alt="search logo" />
        <img src={heart} alt="heart logo" />
        <img src={cart} alt="cart logo" />
      </div>
    </header>
  );
};

export default Header;