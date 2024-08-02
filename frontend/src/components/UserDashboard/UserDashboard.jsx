import React from 'react';
import './UserDashboard.css';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/authState';
import { useState, useEffect } from 'react';
import axios from 'axios';

const projects = [
  {
    id: 1,
    name: 'Project A',
    org: 'Org A',
    techStack: ['React', 'Node.js'],
    status: 'Ongoing',
    github: 'https://github.com/user/project-a',
    teamMembers: 5
  },
  {
    id: 2,
    name: 'Project B',
    org: 'Org B',
    techStack: ['Python', 'Django'],
    status: 'Past',
    github: 'https://github.com/user/project-b',
    teamMembers: 3
  },
  {
    id: 3,
    name: 'Project A',
    org: 'Org A',
    techStack: ['React', 'Node.js'],
    status: 'Ongoing',
    github: 'https://github.com/user/project-a',
    teamMembers: 5
  },
];

const techStack = [
  'JavaScript', 'React', 'Node.js', 'MongoDB', 'Python', 'Django'
];

const connections = [
  { id: 1, name: 'Alice Smith', role: 'Developer' },
  { id: 2, name: 'Bob Johnson', role: 'Designer' },
];

const mentorships = [
  { id: 1, mentor: 'Dr. John Doe', topic: 'AI and Machine Learning' },
  { id: 2, mentor: 'Ms. Jane Roe', topic: 'Web Development' },
];

export default function UserDashboard() {

  const [fetchedProjects, setFetchedProjects] = useState([]);
  const [fetchedTechnologies, setFetchedTechnologies] = useState([]);
  const { token } = useRecoilValue(authState);

  const fetchProjects = async () => {
    try{
        const response = await axios.get("http://localhost:3000/api/auth/projects", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('response', response);
        setFetchedProjects(response.data.projects || []);
    }catch(error){
        console.error("Erro loading projects:", error);
    }
  }

  const fetTechnologies = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/technologies", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      setFetchedTechnologies(response.data.technologies || []);
    }catch(error){
      console.error("Error fetching technologies:", error);
    }
  }
  useEffect(() => {
    fetchProjects();
    fetTechnologies();
  }, [])
  return (
    <section className="dashboard-section">
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
      </header>
      <section className="projects-section">
        <h2>Past and Ongoing Projects</h2>
        <div className="projects-container">
          {fetchedProjects.map(project => (
            <div key={project._id} className={`project-card ${project.projectName.toLowerCase()}`}>
              <h3>{project.projectName}</h3>
              <p><strong>Tech Stack:</strong> {project.techStack}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <p><strong>GitHub:</strong> <a href={project.github} target="_blank" rel="noopener noreferrer">{project.github}</a></p>
            </div>
          ))}
        </div>
      </section>
      <section className="tech-stack-section">
        <h2>Tech Stack / Technologies Used</h2>
        <div className="tech-stack-container">
          {fetchedTechnologies.map(tech => (
            <span key={tech._id} className="tech-item">{tech.name}</span>
          ))}
        </div>
      </section>
      <section className="connections-mentorships-section">
        {/* <h2>Connections and Mentorships</h2> */}
        <div className="connections-container">
          <h3>Connections</h3>
          <ul>
            {connections.map(conn => (
              <li key={conn.id}>{conn.name} - {conn.role}</li>
            ))}
          </ul>
        </div>
        <div className="mentorships-container">
          <h3>Mentorships</h3>
          <ul>
            {mentorships.map(mentor => (
              <li key={mentor.id}>{mentor.mentor} - Topic: {mentor.topic}</li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}
