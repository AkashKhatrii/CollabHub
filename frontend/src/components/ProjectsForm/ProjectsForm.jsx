import React, { useEffect, useState } from 'react';
import './ProjectsForm.css';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../../recoil/authState';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function ProjectsForm() {
  const [projects, setProjects] = useState([{
    projectName: '',
    projectDesc: '',
    techStack: '',
    github: '',
    link: '',
  }]);
  const [fetchedProjects, setFetchedProjects] = useState([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { token } = useRecoilValue(authState);

  const fetchProjects = async () => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/projects`, {
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
  useEffect(() => {
    fetchProjects();
  }, [])

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const addProjectField = () => {
    setProjects([...projects, {
      projectName: '',
      projectDesc: '',
      techStack: '',
      github: '',
      link: ''
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/addProjects`, { projects }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response.data);
        setProjects([{
            projectName: '',
            projectDesc: '',
            techStack: '',
            github: '',
            link: ''
          }]);

        setShowSuccessDialog(true);
        setTimeout(() => {
        setShowSuccessDialog(false);
        }, 3000);
    }catch(err){
        console.error('Error saving projects:', err);
    }
  };

  return (
    <section className="projects-form-section">
      <h2>Projects</h2>
      <form className="projects-form" onSubmit={handleSubmit}>
        {projects.map((project, index) => (
          <div key={index} className="form-row">
            <div className="form-group">
              <label htmlFor={`projectName-${index}`}>Project Name</label>
              <input
                type="text"
                id={`projectName-${index}`}
                value={project.projectName}
                onChange={(e) => handleProjectChange(index, 'projectName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`techStack-${index}`}>Tech Stack</label>
              <input
                type="text"
                id={`techStack-${index}`}
                value={project.techStack}
                onChange={(e) => handleProjectChange(index, 'techStack', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`projectDesc-${index}`}>Description</label>
              <input
                type="text"
                id={`projectDesc-${index}`}
                value={project.projectDesc}
                onChange={(e) => handleProjectChange(index, 'projectDesc', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`github-${index}`}>Github</label>
              <input
                type="text"
                id={`github-${index}`}
                value={project.github}
                onChange={(e) => handleProjectChange(index, 'github', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`link-${index}`}>Link</label>
              <input
                type="text"
                id={`link-${index}`}
                value={project.link}
                onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addProjectField}>Add Project</button>
        <button type="submit">Save</button>
      </form>

      {showSuccessDialog && (
        <div className="success-dialog">
          <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
          <p>Projects saved successfully. Visit Dashboard to see.</p>
        </div>
        )}

      {/* <section className="fetched-projects-section">
        <h3>Your Projects</h3>
        {fetchedProjects.length > 0 ? (
          <ul>
            {fetchedProjects.map((project, index) => (
              <li key={index}>
                <h3>{project.projectName}</h3>
                <p><strong>Tech Stack:</strong> {project.techStack}</p>
                <p><strong>Status:</strong> {project.status}</p>
                <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub Repository</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects found.</p>
        )}
      </section> */}
    </section>
  );
}
