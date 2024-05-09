import React, { useState, FunctionComponent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getToken } from '../api/custom-api';

interface SignInProps {
    onSignIn: () => void;
}

interface LocationState {
  from: string;
}

const SignIn: FunctionComponent<SignInProps> = ({ onSignIn }) => {
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
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;