import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileForm.css';

export default function ProfileForm({ userName, userEmail }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    console.log('fetching user profile');
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(response);
        setGithub(response.data.github || '');
        setSkills(response.data.skills || []);
        setInterests(response.data.interests || []);
    } catch (err) {
        setError(err.message); // Handle error
    } finally {
        setLoading(false); // Stop loading indicator
    }
};

  useEffect(() => {
      fetchUserProfile();
  }, [])

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault(); // Prevent form submission
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleInterestKeyDown = (e) => {
    if (e.key === 'Enter' && interestInput.trim()) {
      e.preventDefault(); // Prevent form submission
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const removeInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Inside form', github)
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
          'http://localhost:3000/api/auth/completeProfile',
          { github, skills, interests },
          {headers: {'Authorization': `Bearer ${token}`}}
    
      );
      console.log(response.data); // Handle success response
  } catch (error) {
      console.error(error); // Handle error response
  }
  }

  return (
    <section className="profile-form-section">
      <h2>Complete Your Profile</h2>
      <form className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={userName} onChange={(e) => setName(e.target.value)} disabled/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={userEmail} onChange={(e) => setEmail(e.target.value)} disabled/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="profile-picture">Profile Picture</label>
            <input type="file" id="profile-picture" />
          </div>
          <div className="form-group">
            <label htmlFor="skills">Skills</label>
            <input
              type="text"
              id="skills"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Press Enter to add skill"
            />
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-item">
                  {skill}
                  <button type="button" className="remove-button" onClick={() => removeSkill(index)}>x</button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="interests">Interests</label>
            <input
              type="text"
              id="interests"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={handleInterestKeyDown}
              placeholder="Press Enter to add interest"
            />
            <div className="interests-list">
              {interests.map((interest, index) => (
                <span key={index} className="interest-item">
                  {interest}
                  <button type="button" className="remove-button" onClick={() => removeInterest(index)}>x</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="github">Github</label>
            <input type="text" id="github" value={github} onChange={(e) => setGithub(e.target.value)} />
          </div>
        </div>
        <button type="submit" id='submit-button' onClick={handleSubmit}>Submit</button>
      </form>
    </section>
  );
}
