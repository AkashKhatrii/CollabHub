import React from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/authState';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewProfile.css';

export default function ViewProfile() {
    const { userId } = useParams();
  const [userName, setUserName] = useState('');
  const [userProjects, setUserProjects] = useState([]);
  const [userTech, setUserTech] = useState([]);

  const { token } = useRecoilValue(authState);

  const fetchUserDetails = async () => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        setUserName(response.data.name);
        setUserProjects(response.data.projects);
        setUserTech(response.data.technologies);
      }catch(error){
        console.log('Error fetching clicked user');
        console.error(error.message);
      }
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])
  return (
    <section className="dashboard-section">
      <header className="dashboard-header">
        <h1>{userName}</h1>
      </header>
      <section className="projects-section">
        <h2>Past and Ongoing Projects</h2>
        <div className="projects-container">
          {userProjects? userProjects.map(project => (
            <div key={project._id} className={`project-card ${project.projectName.toLowerCase()}`}>
              <h3>{project.projectName}</h3>
              <p><strong>Tech Stack:</strong> {project.techStack}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <p><strong>GitHub:</strong> <a href={project.github} target="_blank" rel="noopener noreferrer">{project.github}</a></p>
            </div>
          )) : null}
        </div>
      </section>
      <section className="tech-stack-section">
        <h2>Tech Stack / Technologies Used</h2>
        <div className="tech-stack-container">
          {userTech? userTech.map(tech => (
            <span key={tech._id} className="tech-item">{tech.name}</span>
          )) : null}
        </div>
      </section>
      
    </section>
  );
}
