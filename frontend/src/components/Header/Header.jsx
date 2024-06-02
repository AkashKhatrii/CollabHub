import React, { useState } from 'react';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#testimonials">Testimonials</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#signup">Sign Up</a></li>
                </ul>
            </nav>
        </div>
    </header>
  );
}
