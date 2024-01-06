import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const onLoginClick = async () => {
    alert('login not implemented yet');
  };

  return (
    <div className='content-container'>
      <h1>Login</h1>

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
      <hr />

      <button onClick={onLoginClick} disabled={!email || !password}>
        LogIn
      </button>
      <button onClick={() => history.push('/forgot-password')}>
        Forgot your password
      </button>
      <button onClick={() => history.push('/signup')}>
        Don't have an account? SignUp
      </button>
    </div>
  );
}

export default LoginPage;
