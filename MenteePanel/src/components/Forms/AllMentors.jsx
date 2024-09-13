import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AllMentors.scss'; // Ensure this file contains necessary styles
import Navbar from './../Navbar/Navbar';

const AllMentors = () => {
    const [mentors, setMentors] = useState([]);
    const [filteredMentors, setFilteredMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

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
                    setMentors(data.mentors);
                    setFilteredMentors(data.mentors);
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

    useEffect(() => {
        const filterMentors = () => {
            const query = searchQuery.toLowerCase();
            const filtered = mentors.filter(mentor => {
                const skills = mentor.profile.skills?.join(' ').toLowerCase() || '';
                const expertise = mentor.profile.expertise?.join(' ').toLowerCase() || '';
                return skills.includes(query) || expertise.includes(query);
            });
            setFilteredMentors(filtered);
        };

        filterMentors();
    }, [searchQuery, mentors]);

    const handleClick = (email) => {
        navigate(`/mentor/${email}`); // Navigate to mentor detail page
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const renderMentorCard = (mentor) => {
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
                <button className="visit-button" onClick={() => handleClick(email)}>
                    Visit Mentor Page
                </button>
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
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search by skills/expertise..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="all-mentors-inner-body">
                        {loading && <p>Loading mentors...</p>}
                        {error && <p className="error">{error}</p>}
                        {!loading && !error && filteredMentors.length === 0 && <p>No mentors found.</p>}
                        {filteredMentors.length > 0 && (
                            <div className="mentors-container">
                                {filteredMentors.map(renderMentorCard)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllMentors;
