import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isConnecting: false,
  currentEnv: null,
  userpoolId: null,
  userpoolClientId: null,
  graphqlEndpoint: null,
  authType: null,
  apiKey: null,
  user: null,
  users: [],
};

/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    CONNECTING(state) {
      state.isConnecting = true;
    },
    CONNECT_ERROR(state, action) {
      toast.error(`Error: ${action.payload.message}`);
      state.isConnecting = false;
    },
    CONNECTED_TO_COGNITO(state, action) {
      const { user, cognitoConnection } = action.payload;
      toast.success('You have been successfully authenticated!');
      state.isConnecting = false;
      state.isAuthenticated = true;
      Object.assign(state, { ...cognitoConnection, user });
    },
    CONNECTED_VIA_APIKEY(state, action) {
      const { apiConnection } = action.payload;
      toast.success('You have been successfully authenticated!');
      Object.assign(state, { isConnecting: false, isAuthenticated: true, ...apiConnection });
    },
    LOGOUT(state) {
      Object.assign(state, initialState);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
