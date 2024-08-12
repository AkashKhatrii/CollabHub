import React, { useEffect, useState } from 'react';
import './Discover.css';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../recoil/authState';
import { useNavigate } from 'react-router-dom';
import { discoverState } from '../../recoil/discoverState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

export default function Discover() {
  const [searchTech, setSearchTech] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [error, setError] = useState('');
  const { token } = useRecoilValue(authState);
  const [discover, setDiscover] = useRecoilState(discoverState);
  const navigate = useNavigate();

  const handleSearch = async () => {
    
    try{
      const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/discover`, {
        params: { techName: searchTech.toLowerCase() },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setFilteredProfiles(response.data);
      setDiscover({ searchTech: searchTech, filteredProfiles: response.data });
    }catch(error){
      setError('Error fetching users. Please try again.');
      console.error(error.message);
    }
};

const handleKeyDown = (e) => {
  if (e.key == 'Enter'){
    handleSearch();
  }
}

const viewProfile = async(userId) => {
  navigate(`/profile/${userId}`)
}

const handleStartChat = async(recipientId) => {
  console.log('Inside handleStartChat')
  try{
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/start-chat`, 
      { recipientId },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    console.log('response', response);

    const chatRoomId = response.data.chatRoomId;
    navigate(`/chat/${chatRoomId}`)
  }catch(error){
    console.error('Failed to start chat', error);
  }
}


useEffect(() => {
  setSearchTech(discover.searchTech);
  setFilteredProfiles(discover.filteredProfiles);
}, [])

  return (
    <section className="discover-section">
      <h2>Discover People</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter technologies, eg: Reactjs"
          value={searchTech}
          onChange={(e) => setSearchTech(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="profile-cards-container">
        {filteredProfiles && filteredProfiles.map((profile, index) => (
          <div key={index} className="profile-card">
            <img src='/images/user.png' alt={`${profile.name}'s profile`} />
            <h3 onClick={() => viewProfile(profile._id)}>{profile.name}</h3>
            <p>Full Stack Developer with a passion for React and Node.js</p>
            <div className="technologies">
              {profile.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="tech-tag">{tech}</span>
              ))}
            </div>
            <span onClick={() => handleStartChat(profile._id)}><FontAwesomeIcon icon={faComment} style={{ color: '#25D366', fontSize: '1.5rem', marginTop: '1rem', cursor: 'pointer' }}/></span>
            </div>
        ))}
      </div>
    </section>
  );
}
