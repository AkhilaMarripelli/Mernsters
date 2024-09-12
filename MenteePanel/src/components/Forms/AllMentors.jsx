import React, { useState, useEffect } from 'react';
import './AllMentors.scss'; // Ensure this file contains necessary styles
import Navbar from './../Navbar/Navbar';

const AllMentors = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await fetch('/api/allmentors', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setMentors(data.mentors);
                    setLoading(false);
                } else {
                    const error = await response.json();
                    setError(error.message);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error fetching mentors:', err);
                setError('An error occurred while fetching mentors.');
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    return (
        <>
            <Navbar isLogin="true" />
            <div className="all-mentors-body">
                <div className="all-mentors-box">
                    <div className="all-mentors-header">
                        <h3>All Mentors</h3>
                    </div>
                    <div className="all-mentors-inner-body">
                        {loading && <p>Loading mentors...</p>}
                        {error && <p className="error">{error}</p>}
                        {mentors.length === 0 && !loading && !error && <p>No mentors found.</p>}
                        {mentors.length > 0 && (
                            <div className="mentors-container">
                                {mentors.map((mentor) => (
                                    <div key={mentor._id} className="mentor-card">
                                        <h4>{mentor.name}</h4>
                                        <p>Email: {mentor.email}</p>
                                        <p>Skills: {mentor.skills.join(', ')}</p>
                                        <p>Expertise: {mentor.expertise.join(', ')}</p>
                                        <p>Location: {mentor.location}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllMentors;
