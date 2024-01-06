import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const onSignUpClick = async () => {
    alert('signup not implemented yet');
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
