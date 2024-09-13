import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Import context to get the mentee's info
import './MentorSuggestions.scss'; // Import SCSS for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
const MentorSuggestions = () => {
    const { user } = useContext(AuthContext); // Get user context for mentee's info
    const [mentors, setMentors] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [randomMentors, setRandomMentors] = useState([]); // State for random mentors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    useEffect(() => {
        const fetchMenteesAndMentors = async () => {
            try {
                // Fetch mentee's data
                const menteeResponse = await fetch(`/api/allmentees/${user.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!menteeResponse.ok) {
                    throw new Error('Failed to fetch mentee data');
                }
                const menteeData = await menteeResponse.json();
                const menteeSkills = menteeData.skills || [];
                const menteeInterests = menteeData.interests || [];

                // Fetch mentors data
                const mentorsResponse = await fetch('/api/allmentors', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!mentorsResponse.ok) {
                    throw new Error('Failed to fetch mentors data');
                }
                const mentorsData = await mentorsResponse.json();
                const allMentors = mentorsData.mentors || [];

                // Find matching mentors
                const filteredMentors = allMentors.filter(mentor => {
                    const mentorSkills = mentor.profile.skills || [];
                    const mentorExpertise = mentor.profile.expertise || [];
                    const skillsMatch = mentorSkills.some(skill => menteeSkills.includes(skill));
                    const interestsMatch = mentorExpertise.some(expertise => menteeInterests.includes(expertise));
                    return skillsMatch || interestsMatch;
                });

                setMentors(allMentors);
                setSuggestions(filteredMentors);

                // If no suggestions, pick a few random mentors
                if (filteredMentors.length === 0) {
                    const getRandomElements = (arr, num) => {
                        let result = [];
                        let len = arr.length;
                        let taken = new Array(len);
                        if (num > len) {
                            num = len;
                        }
                        while (num--) {
                            let x = Math.floor(Math.random() * len);
                            result[num] = arr[x in taken ? taken[x] : x];
                            taken[x] = --len in taken ? taken[len] : len;
                        }
                        return result;
                    };
                    setRandomMentors(getRandomElements(allMentors, 5)); // Display 5 random mentors
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchMenteesAndMentors();
    }, [user.email]);
    const handleClick = (email) => {
        navigate(`/mentor/${email}`); // Navigate to mentor detail page
    };
    return (
        <div className="mentor-suggestions-container">
            <h1>Here are some mentors you might find interesting:</h1>
            {loading && <p>Loading suggestions...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && suggestions.length === 0 && randomMentors.length === 0 && (
                <p>No mentor suggestions available.</p>
            )}
            {suggestions.length > 0 && (
                <div className="suggestions-list">
                    {suggestions.map(mentor => (
                        <div key={mentor._id} className="mentor-card">
                            <h4>{mentor.name}</h4>
                            <p>Email: {mentor.email}</p>
                            <p>Skills: {mentor.profile.skills?.join(', ') || 'No skills listed'}</p>
                            <p>Expertise: {mentor.profile.expertise?.join(', ') || 'No expertise listed'}</p>
                            <p>Location: {mentor.profile.location || 'Location not available'}</p>
                            <button className="visit-button" onClick={() => handleClick(mentor.email)}>
                    Visit Mentor Page
                </button>
                        </div>
                    ))}
                </div>
            )}
            {randomMentors.length > 0 && suggestions.length === 0 && (
                <div className="suggestions-list">
                    {randomMentors.map(mentor => (
                        <div key={mentor._id} className="mentor-card">
                            <h4>{mentor.name}</h4>
                            <p>Email: {mentor.email}</p>
                            <p>Skills: {mentor.profile.skills?.join(', ') || 'No skills listed'}</p>
                            <p>Expertise: {mentor.profile.expertise?.join(', ') || 'No expertise listed'}</p>
                            <p>Location: {mentor.profile.location || 'Location not available'}</p>
                            <button className="visit-button" onClick={() => handleClick(mentor.email)}>
                    Visit Mentor Page
                </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MentorSuggestions;
