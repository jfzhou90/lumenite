import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import LoginPage from './modules/login';
import GraphQLEditor from './modules/graphql';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <>
      <ToastContainer autoClose={5000} hideProgressBar />
      {isAuthenticated ? <GraphQLEditor /> : <LoginPage />}
    </>
  );
};

export default App;
