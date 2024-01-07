import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';

function SignUpPage() {
  const [token, setToken] = useToken();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const onSignUpClick = async () => {
    const reaponse = await axios.post('/api/signup', {
      email,
      password,
    });

    const { token } = reaponse.data;

    setToken(token);
    history.push('/');
  };

  return (
    <div className='content-container'>
      <h1>SignUp</h1>

      {error && <div className='fail'>{error}</div>}

      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='example@gmail.com'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password'
      />
      <input
        type='password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder='confirm password'
      />

      <hr />
      <button
        onClick={onSignUpClick}
        disabled={!email || !password || password !== confirmPassword}
      >
        SignUp
      </button>

      <button onClick={() => history.push('/login')}>
        Already have an account? LogIn
      </button>
    </div>
  );
}

export default SignUpPage;
