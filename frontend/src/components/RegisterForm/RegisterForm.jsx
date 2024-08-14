import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, { 
                name, 
                email, 
                password, 
                securityQuestion, 
                securityAnswer 
            });
            localStorage.setItem('token', response.data.token);
            alert('Registration successful. Please log in.');
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Error registering. Please try again.');
        }
    };

    return (
        <section className="register-form-section">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="securityQuestion">Security Question</label>
                    <select
                        id="securityQuestion"
                        value={securityQuestion}
                        onChange={(e) => setSecurityQuestion(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a security question</option>
                        <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                        <option value="What was the name of your first pet?">What was the name of your first pet?</option>
                        <option value="What was your first car?">What was your first car?</option>
                        <option value="What elementary school did you attend?">What elementary school did you attend?</option>
                        <option value="What city were you born in?">What city were you born in?</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="securityAnswer">Answer</label>
                    <input
                        type="text"
                        id="securityAnswer"
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </section>
    );
}
