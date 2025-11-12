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
    stepOne: null,
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

    createUserStepOne: (state, action) => {
      state.stepOne = action.payload;
    },

    clearStepOne(state) {
      state.stepOne = null;
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


export const { initiateRole,createUserStepOne, clearStepOne, setCredentials, logoutUser } = userSlice.actions;
export default userSlice.reducer;
