import React from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './modules/login';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? null : <LoginPage />;
};

export default App;
