import React, { useState } from 'react';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export default function Header(){

    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    }
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
                    {/* <li><a href="#about">About</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#contact">Contact</a></li> */}
                    <li><Link to="/discover">Discover</Link></li>
                    <li><Link to="/dashboard">My Dashboard</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            </nav>
        </div>
    </header>
  );
}
