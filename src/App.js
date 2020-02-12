import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ProtectedRoute } from './lib/router/routes';

import LoginPage from './modules/login';
import GraphQLEditor from './modules/graphiqlEditor';

import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
    <ToastContainer autoClose={3000} hideProgressBar />
    <BrowserRouter>
      <Switch>
        <Route exact path='/login'>
          <LoginPage />
        </Route>
        <ProtectedRoute path='/'>
          <GraphQLEditor />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
