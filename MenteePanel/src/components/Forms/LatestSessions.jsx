import React, { useContext, useEffect, useState } from 'react';
import './LatestSessions.scss'; // Import SCSS styling
import { AuthContext } from '../../context/AuthContext';

const LatestSessions = () => {
  const [sessions, setSessions] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/allsessions'); // Fetch data from the endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch sessions');
        }
        const data = await response.json(); // Parse JSON response
        console.log(data);
        // Sort sessions by date in descending order
        const sortedSessions = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setSessions(sortedSessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  const handleBookSlot = async (sessionId) => {
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
    <div className='main-container'>
      <div className="latest-sessions">
        {sessions.map((session) => (
          <div key={session.sessionId} className="session-card">
            <div className="mentor-info">
              <h3 className="mentor-name">{session.name || 'Mentor Name'}</h3>
              <p className="mentor-bio">{session.bio || 'Mentor Bio'}</p>
              <p className="mentor-expertise">{session.expertise ? session.expertise.join(', ') : 'Mentor Expertise'}</p>
            </div>
            <div className="session-details">
              <p><strong>Topic:</strong> {session.topic || 'Session Topic'}</p>
              <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString() || 'Session Date'}</p>
              <p><strong>Time:</strong> {`${session.startTime || 'Start Time'} - ${session.endTime || 'End Time'}`}</p>
              <p><strong>Status:</strong> {session.status || 'Status'}</p>
            </div>
            <button 
              className="book-button" 
              onClick={() => handleBookSlot(session.sessionId)} 
              disabled={session.status === 'booked' || session.status === 'completed'}
            >
              {session.status === 'booked' || session.status === 'completed' ? 'Unavailable' : 'Book Slot'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestSessions;
