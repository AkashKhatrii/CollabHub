import React, { useState } from 'react';
import './Discover.css';
import axios from 'axios';

const mockProfiles = [
  {
    name: 'John Doe',
    bio: 'Full Stack Developer with a passion for React and Node.js',
    technologies: ['React', 'Node.js', 'MongoDB'],
    profilePicture: 'path/to/profile-pic1.jpg'
  },
  {
    name: 'Jane Smith',
    bio: 'Backend Developer specializing in Python and Django',
    technologies: ['Python', 'Django', 'PostgreSQL'],
    profilePicture: 'path/to/profile-pic2.jpg'
  },
  // Add more mock profiles as needed
];

export default function Discover() {
  const [searchTech, setSearchTech] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    
    try{
      const response= await axios.get("http://localhost:3000/api/auth/discover", {
        params: { techName: searchTech.toLowerCase() }
      })
      const profiles = response.data; 
      setFilteredProfiles(response.data);
      console.log(filteredProfiles)
    }catch(error){
      setError('Error fetching users. Please try again.');
      console.error(error.message);
    }
};

  return (
    <section className="discover-section">
      <h2>Discover People</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter technologies..."
          value={searchTech}
          onChange={(e) => setSearchTech(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="profile-cards-container">
        {filteredProfiles ? filteredProfiles.map((profile, index) => (
          <div key={index} className="profile-card">
            <img src={profile.profilePicture} alt={`${profile.name}'s profile`} />
            <h3>{profile.name}</h3>
            <p>{profile.bio}</p>
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
