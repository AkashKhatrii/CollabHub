import React, { useState, useEffect } from 'react';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../recoil/authState';
export default function Header(){

    const [menuActive, setMenuActive] = useState(false);
    const [auth, setAuth] = useRecoilState(authState);

    
      const toggleMenu = () => {
        setMenuActive(!menuActive);
      };
    
      const handleLogout = () => {
        setAuth({ isAuthenticated: false, token: null});
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page
      };

  return (
    <header>
        <div className='header-logo'>
            <h2>CollabMate</h2>
            <FontAwesomeIcon icon={menuActive ? faTimes : faBars} className='menu-toggle' onClick={toggleMenu}/>
        </div>

        <div className={`header-nav ${menuActive ? 'active' : ''}`}>
            <nav>
            <ul className='header-links'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/discover">Discover</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            {!auth.isAuthenticated && (
              <>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
              </>
            )}
            {auth.isAuthenticated && (
                <>
                <li><Link to="/dashboard">My Dashboard</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
              </>
            )}
          </ul>
            </nav>
        </div>
    </header>
  );
}
