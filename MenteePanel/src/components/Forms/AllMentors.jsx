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
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setMentors(data.mentors);
                } else {
                    const error = await response.json();
                    setError(error.message);
                }
            } catch (err) {
                console.error('Error fetching mentors:', err);
                setError('An error occurred while fetching mentors.');
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    const renderMentorCard = (mentor) => {
        // Accessing fields from the mentor object, accounting for potential nested structures
        const { _id, name, email, profile = {}, location, skills = [], expertise = [] } = mentor;
        const mentorSkills = profile.skills?.length ? profile.skills : skills;
        const mentorExpertise = profile.expertise?.length ? profile.expertise : expertise;
        const mentorLocation = profile.location || location || 'Location not available';

        return (
            <div key={_id} className="mentor-card">
                <h4>{name}</h4>
                <p>Email: {email}</p>
                <p>Skills: {mentorSkills.length ? mentorSkills.join(', ') : 'No skills listed'}</p>
                <p>Expertise: {mentorExpertise.length ? mentorExpertise.join(', ') : 'No expertise listed'}</p>
                <p>Location: {mentorLocation}</p>
            </div>
        );
    };

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
                        {!loading && !error && mentors.length === 0 && <p>No mentors found.</p>}
                        {mentors.length > 0 && (
                            <div className="mentors-container">
                                {mentors.map(renderMentorCard)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllMentors;
