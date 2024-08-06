import React from "react";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import ProfileSummary from "../../components/ProfileSummary/ProfileSummary";
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import ProjectsForm from "../../components/ProjectsForm/ProjectsForm";
import TechnologiesUsed from "../../components/TechnologiesUsed/TechnologiesUsed";

export default function Profile(){
    const [userName, setUserName] = useState(null);
    const [email, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Function to fetch user data
        const fetchUserData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (token) {
            // Decode token to get user ID
            const decoded = jwtDecode(token);
            const userId = decoded.user.id;

            // Fetch user data from the backend
            const response = await axios.get(`http://localhost:3000/api/auth/${userId}`, {
                headers: {
                'Authorization': `Bearer ${token}`,
                },
            });

            setUserName(response.data.name);
            setUserEmail(response.data.email)
            console.log(userId)
            console.log('hiii')
            }
        } catch (err) {
            setError('Failed to fetch user data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchUserData();
    }, []);
    return (
        <>
            <ProfileForm userName = {userName} userEmail = {email}/>
            {/* <ProfileSummary/> */}
            <ProjectsForm/>
            <TechnologiesUsed/>
        </>
    )
}