import React, { useState } from 'react';
import apiClient from '../api/apiClient';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            await apiClient.post('/auth/signup', { name, email, password });
            alert('Sign-Up successful, check your email for verification!');
        } catch (error) {
            console.error(error);
            alert('Sign-Up failed');
        }
    };

    return (
        <div>
            <h2>Sign-Up</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign-Up</button>
        </div>
    );
};

export default SignUp;
