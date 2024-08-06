import React, { useEffect, useState } from 'react';
import './Discover.css';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../../recoil/authState';
import { useNavigate } from 'react-router-dom';
import { discoverState } from '../../recoil/discoverState';
export default function Discover() {
  const [searchTech, setSearchTech] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [error, setError] = useState('');
  const { token } = useRecoilValue(authState);
  const [discover, setDiscover] = useRecoilState(discoverState);
  const navigate = useNavigate();

  const handleSearch = async () => {
    
    try{
      const response= await axios.get("http://localhost:3000/api/auth/discover", {
        params: { techName: searchTech.toLowerCase() }
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
        {filteredProfiles ? filteredProfiles.map((profile, index) => (
          <div key={index} className="profile-card">
            <img src='/images/user.png' alt={`${profile.name}'s profile`} />
            <h3 onClick={() => viewProfile(profile._id)}>{profile.name}</h3>
            <p>Full Stack Developer with a passion for React and Node.js</p>
            <div className="technologies">
              {profile.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        )) : null}
      </div>
    </section>
  );
}
