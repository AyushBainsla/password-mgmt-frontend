import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse: any) => {
        try {
            const { credential } = credentialResponse;
            const res = await axios.post('/api/auth/google-signin', { tokenId: credential });
            localStorage.setItem('token', res.data.token);
            navigate('/passwords');
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };

    const handleFailure = () => {
        console.error('Google Sign-In Failure');
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
            <div>
                <h2>Login</h2>
                <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
