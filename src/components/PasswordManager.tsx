import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PasswordEntry {
    _id: string;
    siteName: string;
    siteUrl: string;
    iconUrl: string;
    username: string;
    password: string;
    createdAt: string;
}

const PasswordManager: React.FC = () => {
    const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
    const [newPassword, setNewPassword] = useState({
        siteName: '',
        siteUrl: '',
        username: '',
        password: '',
    });
    const [page, setPage] = useState(1);

    // Fetch passwords with pagination
    useEffect(() => {
        fetchPasswords();
    }, [page]);

    const fetchPasswords = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/passwords?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPasswords(response.data);
        } catch (error) {
            console.error('Error fetching passwords:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/passwords', newPassword, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchPasswords();
        } catch (error) {
            console.error('Error creating password:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/passwords/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchPasswords();
        } catch (error) {
            console.error('Error deleting password:', error);
        }
    };

    return (
        <div>
            <h2>Password Manager</h2>

            <div>
                <h3>Add New Password</h3>
                <input
                    type="text"
                    name="siteName"
                    placeholder="Site Name"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="siteUrl"
                    placeholder="Site URL"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                />
                <button onClick={handleCreate}>Add Password</button>
            </div>

            <div>
                <h3>Your Stored Passwords</h3>
                {passwords.map((entry) => (
                    <div key={entry._id}>
                        <h4>{entry.siteName}</h4>
                        <p>{entry.siteUrl}</p>
                        <p>{entry.username}</p>
                        <p>Created at: {new Date(entry.createdAt).toLocaleString()}</p>
                        <button onClick={() => handleDelete(entry._id)}>Delete</button>
                    </div>
                ))}
            </div>

            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default PasswordManager;
