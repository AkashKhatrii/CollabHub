import React, { useState, useEffect } from 'react';
import './Header2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../recoil/authState';
import { discoverState } from '../../recoil/discoverState';
export default function Header(){

    const [menuActive, setMenuActive] = useState(false);
    const [auth, setAuth] = useRecoilState(authState);
    const [discover, setDiscover] = useRecoilState(discoverState);
    const [loggedInUserName, setLoggedInUserName] = useState('');

    useEffect(() => {
      if (auth.loggedInUser) {
        setLoggedInUserName(auth.loggedInUserName || ''); 
      } else {
        setLoggedInUserName('');
      }
    }, [auth]);

    const navigate = useNavigate();
      const toggleMenu = () => {
        setMenuActive(!menuActive);
      };
    
      const handleLogout = () => {
        setAuth({ isAuthenticated: false, token: null, loggedInUserName: ''});
        localStorage.removeItem('token');
        setDiscover({searchTech: '', filteredProfiles: []})
        navigate('/login'); 
      };

      const getInitials = (fullName) =>{
        console.log(fullName)
        if (!fullName || typeof fullName !== 'string') {
          return '';
        }
        
        const words = fullName.trim().split(' ');
        if (words.length === 0) return '';
    
        const firstWord = words[0];
        const lastWord = words[words.length - 1];
        const initials = (firstWord[0] || '').toUpperCase() + (lastWord[0] || '').toUpperCase();
    
        return initials;
    }

  return (
    // <header>
    //     <div className='header-logo'>
    //         <h2>CollabHub</h2>
    //         <FontAwesomeIcon icon={menuActive ? faTimes : faBars} className='menu-toggle' onClick={toggleMenu}/>
    //     </div>

    //     <div className={`header-nav ${menuActive ? 'active' : ''}`}>
    //         <nav>
    //         <ul className='header-links'>
    //         <li onClick={toggleMenu}><Link to="/">Home</Link></li>
    //         <li onClick={toggleMenu}><Link to="/discover">Discover</Link></li>
    //         {!auth.isAuthenticated && (
    //           <>
    //             <li onClick={toggleMenu}><Link to="/profile">Profile</Link></li>
    //             <li><Link to='/register'>Register</Link></li>
    //             <li><Link to='/login'>Login</Link></li>
    //           </>
    //         )}
    //         {auth.isAuthenticated && (
    //             <>
    //             <li onClick={toggleMenu}><Link to="/dashboard">My Dashboard</Link></li>
    //             <li className='profile-wrapper'>
    //                         <div className='profile-initials'>
    //                             <Link to="/profile">{getInitials(loggedInUserName) || ''}</Link>
    //                         </div>
    //                         <button onClick={handleLogout} className="logout-button">Logout</button>
    //               </li>
                
    //               <li onClick={toggleMenu}><button onClick={handleLogout} className="logout-button small-screen">Logout</button></li>
    //           </>
    //         )}
    //       </ul>
    //         </nav>
    //     </div>
    // </header>

    <header>
        <div className='header-logo'>
            <h2>CollabHub</h2>
            <FontAwesomeIcon icon={menuActive ? faTimes : faBars} className='menu-toggle' onClick={toggleMenu}/>
        </div>

        <div className={`header-nav ${menuActive ? 'active' : ''}`}>
            <nav>
            <ul className='header-links'>
            <li onClick={toggleMenu}><Link to="/">Home</Link></li>
            <li onClick={toggleMenu}><Link to="/discover">Discover</Link></li>
            <li onClick={toggleMenu}><Link to="/profile">Profile</Link></li>
            {!auth.isAuthenticated && (
              <>
                <li onClick={toggleMenu}><Link to='/register'>Register</Link></li>
                <li onClick={toggleMenu}><Link to='/login'>Login</Link></li>
              </>
            )}
            {auth.isAuthenticated && (
                <>
                <li onClick={toggleMenu}><Link to="/dashboard">My Dashboard</Link></li>
                {/* <li onClick={toggleMenu}><Link to="/chats">Chats</Link></li> */}
              <li onClick={toggleMenu}><button onClick={handleLogout} className="logout-button">Logout</button></li>
              </>
            )}
          </ul>
            </nav>
        </div>
    </header>
  );
}
