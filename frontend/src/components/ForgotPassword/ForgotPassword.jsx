import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleGetQuestion = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/security-question`, { email });
            setSecurityQuestion(response.data.securityQuestion);
        } catch (error) {
            setMessage('Error retrieving security question.');
        }
    };

    const handleResetPassword = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password-via-security-question`, {
                email,
                securityAnswer,
                newPassword
            });
            setMessage('Password reset successful. You can now log in with your new password.');
        } catch (error) {
            setMessage('Incorrect answer or other error.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            {!securityQuestion ? (
                <>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your username"
                    />
                    <button onClick={handleGetQuestion}>Get Security Question</button>
                </>
            ) : (
                <>
                    <p>{securityQuestion}</p>
                    <input
                        type="text"
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                        placeholder="Enter your answer"
                    />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
