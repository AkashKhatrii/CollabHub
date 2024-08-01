import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserEdit, faSearch, faHandshake, faUsers, faTasks } from '@fortawesome/free-solid-svg-icons';
import './HowItWorks.css';

export default function HowItWorks() {
  const steps = [
    {
      icon: faUserPlus,
      title: 'Create an Account',
      description: 'Register for a free account to get started with CollabMate.'
    },
    {
      icon: faUserEdit,
      title: 'Complete Your Profile',
      description: 'Fill out your profile with your skills, interests, and a profile picture.'
    },
    {
      icon: faSearch,
      title: 'Discover Projects',
      description: 'Browse and find projects that match your interests.'
    },
    {
      icon: faHandshake,
      title: 'Connect with Collaborators',
      description: 'Find and connect with other students based on their skills and interests.'
    },
    {
      icon: faUsers,
      title: 'Start Collaborating',
      description: 'Join a project and start collaborating using built-in tools.'
    },
    {
      icon: faTasks,
      title: 'Manage Your Projects',
      description: 'Organize tasks, set deadlines, and track progress to ensure success.'
    }
  ];

  return (
    <section className="how-it-works-section">
      <h2>How It Works</h2>
      <p>Follow these simple steps to start collaborating and achieve your goals with CollabMate.</p>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <FontAwesomeIcon icon={step.icon} size="2x" className='fa-icon'/>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
      <div className="cta">
        <button>Get Started Now</button>
      </div>
    </section>
  );
}
