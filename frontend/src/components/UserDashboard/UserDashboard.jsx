import React from 'react';
import './UserDashboard.css';

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
  return (
    <section className="dashboard-section">
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
      </header>
      <section className="projects-section">
        <h2>Past and Ongoing Projects</h2>
        <div className="projects-container">
          {projects.map(project => (
            <div key={project.id} className={`project-card ${project.status.toLowerCase()}`}>
              <h3>{project.name}</h3>
              <p><strong>Organization:</strong> {project.org}</p>
              <p><strong>Tech Stack:</strong> {project.techStack.join(', ')}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <p><strong>Team Members:</strong> {project.teamMembers}</p>
              <p><strong>GitHub:</strong> <a href={project.github} target="_blank" rel="noopener noreferrer">{project.github}</a></p>
            </div>
          ))}
        </div>
      </section>
      <section className="tech-stack-section">
        <h2>Tech Stack / Technologies Used</h2>
        <div className="tech-stack-container">
          {techStack.map((tech, index) => (
            <span key={index} className="tech-item">{tech}</span>
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
