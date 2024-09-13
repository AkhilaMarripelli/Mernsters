import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Adjust the path as needed
import './Form.scss'; // Import your SCSS file

const SaveSlotForm = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        date: '',
        startTime: '',
        endTime: '',
        topic: '',
        status: 'active',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please log in to save a slot.');
            return;
        }

        const { date, startTime, endTime, topic, status } = formData;
        const email = user.email;

        try {
            const response = await fetch('/api/saveslot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ date, startTime, endTime, topic, status, email }),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Slot saved successfully!');
                // Handle successful slot saving
            } else {
                const error = await response.json();
                alert(`Error saving slot: ${error.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving the slot.');
        }
    };

    return (
        <div className="form-body">
            <div className="form-box">
                <div className="form-header">
                    <h3>Save Slot</h3>
                </div>
                <div className="form-inner-body">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                value={formData.date}
                                onChange={handleChange}
                                type="date"
                                name="date"
                                id="date"
                                required
                            />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="input-group">
                            <input
                                value={formData.startTime}
                                onChange={handleChange}
                                type="time"
                                name="startTime"
                                id="startTime"
                                required
                            />
                            <label htmlFor="startTime">Start Time</label>
                        </div>
                        <div className="input-group">
                            <input
                                value={formData.endTime}
                                onChange={handleChange}
                                type="time"
                                name="endTime"
                                id="endTime"
                                required
                            />
                            <label htmlFor="endTime">End Time</label>
                        </div>
                        <div className="input-group">
                            <input
                                value={formData.topic}
                                onChange={handleChange}
                                type="text"
                                name="topic"
                                id="topic"
                                placeholder="Topic"
                                required
                            />
                            <label htmlFor="topic">Topic</label>
                        </div>
                        <div className="input-group">
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                id="status"
                                required
                            >
                                <option value="active">Active</option>
                                <option value="booked">Booked</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <button className="btn" type="submit">
                                Save Slot
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SaveSlotForm;
