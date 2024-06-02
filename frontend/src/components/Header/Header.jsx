import React from 'react';
import './Header.css'
export default function Header(){
  return (
    <header>
        <div className='header-logo'>
            <h2>CollabMate</h2>
        </div>

        <div className='header-nav'>
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
