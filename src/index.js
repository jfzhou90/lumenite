import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import configureStore from './store';
import * as serviceWorker from './serviceWorker';

import App from './App';
import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

const { store, persistor } = configureStore();

render(
  <>
    <ToastContainer autoClose={3000} hideProgressBar />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
