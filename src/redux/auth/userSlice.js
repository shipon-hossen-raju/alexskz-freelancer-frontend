'use client'
import { createSlice } from '@reduxjs/toolkit'

const loadInitialState = () => {
  const token = localStorage.getItem('user-token');
  // console.log('token form user slice: ', token)

  return {
    initialRole: null,
    user: null,
    role: null,
    token,
    isAuthenticated: !!token,
  }
}

const initialState = loadInitialState();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    initiateRole: (state, action) => {
      state.initialRole = action.payload;
    },

    createUser: (state, action) => {
      state.role = action.payload;
      // state.role = null;
    },

    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear token from localStorage
      localStorage.removeItem('user-token');
    }
  },
});


export const { initiateRole,createUser, setCredentials, logoutUser } = userSlice.actions;
export default userSlice.reducer;
