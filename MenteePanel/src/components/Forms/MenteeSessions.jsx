import React, { useContext, useEffect, useState } from 'react';
import './MenteeSessions.scss'; // Import SCSS for styling
import { AuthContext } from '../../context/AuthContext';

const MenteeSessions = () => {
  const { user } = useContext(AuthContext); // Get user context for mentee's info
  const [bookedSessions, setBookedSessions] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenteeSessions = async () => {
      try {
        // Use the endpoint structure you mentioned
        const response = await fetch(`/api/mentee/${user.email}/sessions`);
        if (!response.ok) {
          throw new Error('Failed to fetch mentee sessions');
        }
        const data = await response.json();
        setBookedSessions(data.bookedSessions);
        setCompletedSessions(data.completedSessions);
      } catch (err) {
        console.error('Error fetching mentee sessions:', err);
        setError('An error occurred while fetching mentee sessions.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenteeSessions();
  }, [user.email]);

  // Function to determine if the "Join" button should be enabled
  const isJoinButtonEnabled = (sessionDate) => {
    const sessionStartTime = new Date(sessionDate);
    const currentTime = new Date();
    const fiveMinutesBefore = new Date(sessionStartTime - 5 * 60 * 1000);
    return currentTime >= fiveMinutesBefore && currentTime < sessionStartTime;
  };

  const handleJoinSession = async (sessionId) => {
    try {
      const response = await fetch(`/api/join-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId, email: user.email }),
      });

      if (!response.ok) {
        throw new Error('Failed to join session');
      }

      const result = await response.json();
      console.log(result);
      alert('Joined session successfully!');
    } catch (error) {
      console.error('Error joining session:', error);
    }
  };

  return (
    <div className="mentee-sessions-container">
      {loading && <p>Loading sessions...</p>}
      {error && <p className="error">{error}</p>}

      <div className="sessions-section">
        <h2>Booked Sessions</h2>
        {bookedSessions.length === 0 ? (
          <p>No booked sessions available.</p>
        ) : (
          <ul>
            {bookedSessions.map((session) => (
              <li key={session.sessionId}>
                <p><strong>Topic:</strong> {session.topic}</p>
                <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {`${session.startTime} - ${session.endTime}`}</p>
                <button 
                  className="join-button"
                  onClick={() => handleJoinSession(session.sessionId)}
                  disabled={!isJoinButtonEnabled(session.date)}
                >
                  {isJoinButtonEnabled(session.date) ? 'Join' : 'Join (Available 5 mins before)'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="sessions-section">
        <h2>Completed Sessions</h2>
        {completedSessions.length === 0 ? (
          <p>No completed sessions available.</p>
        ) : (
          <ul>
            {completedSessions.map((session) => (
              <li key={session.sessionId}>
                <p><strong>Topic:</strong> {session.topic}</p>
                <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {`${session.startTime} - ${session.endTime}`}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MenteeSessions;
