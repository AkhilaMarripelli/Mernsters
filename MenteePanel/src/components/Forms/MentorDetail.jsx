import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MentorDetail.scss'; // Ensure this file contains necessary styles
import { AuthContext } from '../../context/AuthContext';

const MentorDetail = () => {
    const { user } = useContext(AuthContext);
    const { email } = useParams(); // Get mentorId from URL params
    const [mentor, setMentor] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMentorDetails = async () => {
            try {
                const response = await fetch(`/api/mentor/${email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch mentor details');
                }
                const data = await response.json();
                setMentor(data.mentor);
                setSessions(data.sessions); // Assuming sessions are included in the response
            } catch (err) {
                console.error('Error fetching mentor details:', err);
                setError('An error occurred while fetching mentor details.');
            } finally {
                setLoading(false);
            }
        };

        fetchMentorDetails();
    }, [email]);

    const handleBookSlot = async (sessionId) => {
        console.log(sessionId);
        console.log(user.email);
        try {
            const response = await fetch(`/api/book-slot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId,
                    email: user.email,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to book slot');
            }

            const result = await response.json();
            console.log(result);
            alert('Slot booked successfully!');
        } catch (error) {
            console.error('Error booking slot:', error);
        }
    };

    return (
        <div className='mentor-detail-container'>
            {loading && <p>Loading mentor details...</p>}
            {error && <p className="error">{error}</p>}
            {mentor && (
                <>
                    <div className="mentor-info">
                        <h2>{mentor.name}</h2>
                        <p>Email: {mentor.email}</p>
                        <p>Location: {mentor.location}</p>
                        <p>Skills: {mentor.profile?.skills?.join(', ') || 'No skills listed'}</p>
                        <p>Expertise: {mentor.profile?.expertise?.join(', ') || 'No expertise listed'}</p>
                    </div>
                    <div className="sessions-list">
                        <h3>Sessions</h3>
                        {sessions.length === 0 ? (
                            <p>No sessions available.</p>
                        ) : (
                            <ul>
                                {sessions.map(session => (
                                    <li key={session.sessionId}>
                                        <p><strong>Topic:</strong> {session.topic}</p>
                                        <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
                                        <p><strong>Time:</strong> {`${session.startTime} - ${session.endTime}`}</p>
                                        <p><strong>Status:</strong> {session.status}</p>
                                        <button 
                                            className="book-button" 
                                            onClick={() => handleBookSlot(session.sessionId)} 
                                            disabled={session.status === 'booked' || session.status === 'completed'}
                                        >
                                            {session.status === 'booked' || session.status === 'completed' ? 'Unavailable' : 'Book Slot'}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default MentorDetail;
