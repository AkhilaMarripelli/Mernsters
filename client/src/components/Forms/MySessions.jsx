import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Form.scss'; // Ensure this file contains necessary styles

const MySessions = () => {
    const { user } = useContext(AuthContext);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingSession, setEditingSession] = useState(null);
    const [updatedSession, setUpdatedSession] = useState({});

    useEffect(() => {
        if (user) {
            fetchSessions();
        }
    }, [user]);

    const fetchSessions = async () => {
        try {
            const response = await fetch('/api/mysessions?email=' + user.email, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSessions(data.sessions);
                setLoading(false);
            } else {
                const error = await response.json();
                setError(error.message);
                setLoading(false);
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred while fetching sessions.');
            setLoading(false);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedSession({ ...updatedSession, [name]: value });
    };

    const handleUpdate = async (sessionId) => {
        try {
            const response = await fetch(`/updatesession/${sessionId}?email=' + user.email`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(updatedSession)
            });
    
            if (response.ok) {
                fetchSessions(); // Refresh sessions after update
                setEditingSession(null);
            } else {
                const error = await response.json();
                setError(error.message);
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred while updating the session.');
        }
    };
    
    const handleDelete = async (sessionId) => {
        try {
            const response = await fetch(`/deletesession/${sessionId}?email=' + user.email`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
    
            if (response.ok) {
                fetchSessions(); // Refresh sessions after deletion
            } else {
                const error = await response.json();
                setError(error.message);
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred while deleting the session.');
        }
    };
    
    if (loading) return <div className="form-body"><div className="loading">Loading sessions...</div></div>;
    if (error) return <div className="form-body"><div className="error">{error}</div></div>;

    return (
        <div className="form-body">
            <div className="form-box">
                <div className="form-header">
                    <h3>My Sessions</h3>
                </div>
                <div className="form-inner-body">
                    {sessions.length === 0 ? (
                        <p>No sessions found.</p>
                    ) : (
                        <div className="sessions-container">
                            {sessions.map((session) => (
                                <div key={session.sessionId} className="session-card">
                                    <h4>{session.topic}</h4>
                                    <p>Date: {new Date(session.date).toLocaleDateString()}</p>
                                    <p>Start Time: {session.startTime}</p>
                                    <p>End Time: {session.endTime}</p>
                                    <p>Status: {session.status}</p>
                                    <div className="session-actions">
                                        <button onClick={() => handleUpdate(session.sessionId)}>Edit</button>
                                        <button onClick={() => handleDelete(session.sessionId)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {editingSession && (
                <div className="edit-session-modal">
                    <h3>Edit Session</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(editingSession.sessionId);
                    }}>
                        <div className="input-group">
                            <input
                                type="text"
                                name="topic"
                                value={updatedSession.topic || editingSession.topic}
                                onChange={handleUpdateChange}
                                placeholder="Topic"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="date"
                                name="date"
                                value={updatedSession.date || editingSession.date}
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="time"
                                name="startTime"
                                value={updatedSession.startTime || editingSession.startTime}
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="time"
                                name="endTime"
                                value={updatedSession.endTime || editingSession.endTime}
                                onChange={handleUpdateChange}
                            />
                        </div>
                        <div className="input-group">
                            <select
                                name="status"
                                value={updatedSession.status || editingSession.status}
                                onChange={handleUpdateChange}
                            >
                                <option value="active">Active</option>
                                <option value="booked">Booked</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <button type="submit" className="btn">Save Changes</button>
                            <button type="button" onClick={() => setEditingSession(null)} className="btn btn-cancel">Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MySessions;
