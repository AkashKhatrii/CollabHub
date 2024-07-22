import React, { useState } from 'react';
import './ProfileSummary.css';

export default function ProfileSummary() {
  const [bio, setBio] = useState('');
  const [education, setEducation] = useState([{ school: '', degree: '', years: '' }]);
  const [workExperience, setWorkExperience] = useState([{ company: '', title: '', years: '' }]);

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index][field] = value;
    setWorkExperience(newWorkExperience);
  };

  const addEducationField = () => {
    setEducation([...education, { school: '', degree: '', years: '' }]);
  };

  const addWorkExperienceField = () => {
    setWorkExperience([...workExperience, { company: '', title: '', years: '' }]);
  };

  return (
    <section className="profile-summary-section">
      <h2>Profile Summary</h2>
      <form className="profile-summary-form">
        <div className="form-group" id="form-bio">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a brief summary about yourself"
          />
        </div>
        <h3>Education</h3>
        {education.map((edu, index) => (
          <div key={index} className="form-row">
            <div className="form-group">
              <label htmlFor={`school-${index}`}>School</label>
              <input
                type="text"
                id={`school-${index}`}
                value={edu.school}
                onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`degree-${index}`}>Degree</label>
              <input
                type="text"
                id={`degree-${index}`}
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`years-${index}`}>Years</label>
              <input
                type="text"
                id={`years-${index}`}
                value={edu.years}
                onChange={(e) => handleEducationChange(index, 'years', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addEducationField}>Add Education</button>

        <h3>Work Experience</h3>
        {workExperience.map((work, index) => (
          <div key={index} className="form-row">
            <div className="form-group">
              <label htmlFor={`company-${index}`}>Company</label>
              <input
                type="text"
                id={`company-${index}`}
                value={work.company}
                onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`title-${index}`}>Job Title</label>
              <input
                type="text"
                id={`title-${index}`}
                value={work.title}
                onChange={(e) => handleWorkExperienceChange(index, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`years-${index}`}>Years</label>
              <input
                type="text"
                id={`years-${index}`}
                value={work.years}
                onChange={(e) => handleWorkExperienceChange(index, 'years', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addWorkExperienceField}>Add Work Experience</button>

        <button type="submit">Save Profile</button>
      </form>
    </section>
  );
}
