import React, { useState } from 'react';
import './TechnologiesUsed.css';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/authState';
import axios from 'axios';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TechnologiesUsed() {
  const [technologies, setTechnologies] = useState([{ name: '', proficiency: '' }]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
const { token } = useRecoilValue(authState);


  const handleTechnologyChange = (index, field, value) => {
    const newTechnologies = [...technologies];
    newTechnologies[index][field] = value;
    setTechnologies(newTechnologies);
  };

  const addTechnologyField = () => {
    setTechnologies([...technologies, { name: '', proficiency: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/addTechnologies`, 
        { technologies },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    setShowSuccessDialog(true);
    setTimeout(() => {
    setShowSuccessDialog(false);
    }, 3000);
    } catch (error) {
      console.error('Error saving technologies:', error);
    }
  };


  return (
    <section className="technologies-used-section">
      <h2>Technologies Used</h2>
      <form className="technologies-used-form" onSubmit={handleSubmit}>
        {technologies.map((technology, index) => (
          <div key={index} className="form-row">
            <div className="form-group">
              <label htmlFor={`tech-name-${index}`}>Technology</label>
              <input
                type="text"
                id={`tech-name-${index}`}
                value={technology.name}
                onChange={(e) => handleTechnologyChange(index, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              {/* <label htmlFor={`tech-proficiency-${index}`}>Proficiency</label>
              <input
                type="text"
                id={`tech-proficiency-${index}`}
                value={technology.proficiency}
                onChange={(e) => handleTechnologyChange(index, 'proficiency', e.target.value)}
              /> */}
            </div>
          </div>
        ))}
        <button type="button" onClick={addTechnologyField}>Add Technology</button>
        <button type="submit" onClick={handleSubmit}>Save</button>
      </form>

      {showSuccessDialog && (
        <div className="success-dialog">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <p>Technologies saved successfully. Visit Dashboard to see.</p>
        </div>
        )}
    </section>
  );
}
