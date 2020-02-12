import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ProtectedRoute } from './lib/router/routes';

import LoginPage from './modules/login';
import GraphQLEditor from './modules/graphiqlEditor';

const App = () => (
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
);

export default App;
