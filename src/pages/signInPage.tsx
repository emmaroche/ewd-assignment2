import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getToken } from '../api/custom-api';
import Header from '../components/headerMovieList';
import { Typography } from '@mui/material';

interface SignInProps {
    onSignIn: () => void;
}

interface LocationState {
    from: string;
}

const formContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    marginBottom: "20px",
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
};

const inputStyle = {
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
};

const buttonStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#1e90ff",
    color: "white",
    cursor: "pointer",
};

const SignInPage: React.FC<SignInProps> = ({onSignIn}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        getToken(username, password).then(token => {
            if (token) {
                onSignIn();
                // Reference for page redirect once signed in: https://stackoverflow.com/questions/72163183/how-can-i-redirect-to-previous-page-after-login-in-react-router
                const state = location.state as LocationState;
                navigate(state?.from || '/'); // Navigate to the last attempted page or home page
            }
        });
    };

    return (
        <>
            <Header title="Sign in" />
            <div style={formContainerStyle}>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <Typography variant="h6" component="h3" mb={2}>
                        Sign in to View More!
                    </Typography>
                    <input style={inputStyle} type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                    <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    <button style={buttonStyle} type="submit">Sign In</button>
                </form>
            </div>
        </>
    );
};

export default SignInPage;