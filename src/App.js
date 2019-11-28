import React from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './modules/login';
import GraphQLEditor from './modules/graphql';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? <GraphQLEditor /> : <LoginPage />;
};

export default App;
