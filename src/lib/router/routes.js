/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, path, exact }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) => {
        return isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  exact: false,
};
