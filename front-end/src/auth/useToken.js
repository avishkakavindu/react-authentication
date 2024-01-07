import { useState } from 'react';

export const useToken = () => {
  // set initial value
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem('token');
  });

  const setToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setTokenInternal(newToken);
  };

  return [token, setToken];
};
