import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions';
import '../css/Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="logout-link" onClick={handleLogout}>
        Выйти
      </div>
    </div>
  );
};

export default Navbar;
