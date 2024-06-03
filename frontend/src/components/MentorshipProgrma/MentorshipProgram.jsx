import React, { useState } from 'react';
import './MentorshipProgram.css';

const mentors = [
  { title: 'Experienced Mentors', description: 'Connect with mentors who have extensive experience in various fields.' },
  { title: 'Student Mentors', description: 'Learn from advanced students who have successfully completed similar projects.' },
  { title: 'Peer Mentorship', description: 'Get guidance from peers and grow together through mutual learning.' }
];

export default function MentorshipProgram() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleDescription = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="mentorship-program-section">
      <div className="mentorship-program-section-wrapper">
      <div className='content'>
        <div className='heading'>
          <h2>Mentorship Program</h2>
          <p>At CollabMate, we empower students with mentorship to fast-track their learning and professional growth. Our program provides diverse mentoring opportunities, ensuring students achieve their goals and navigate their academic and career paths confidently.</p>
        </div>

        <div className="mentorship-titles">

          {mentors.map((mentor, index) => (
            <div key={index} className="mentorship-item" onClick={() => toggleDescription(index)}>
                <div className="mentorship-title-container">
                <span className="mentorship-icon">
                <i className={activeIndex === index ? 'fas fa-chevron-down' : 'fas fa-chevron-right'}></i>
                </span>
                <h3 className="mentorship-title">{mentor.title}</h3>
              </div>
              <div className={`mentorship-description ${activeIndex === index ? 'show' : ''}`}>
                {mentor.description}
              </div>
              
            </div>
          ))}
        </div>
      </div>
        <div className="mentorship-image">
          <img src="./images/collaboration.jpg" alt="Mentorship" />
        </div>

      </div>
    </section>
  );
}
