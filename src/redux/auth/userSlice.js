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
    isAuthenticated: false,
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

    clearInitialRole: (state) => {
      state.initialRole = null
    },

    createUserStepOne: (state, action) => {
      state.stepOne = action.payload;
    },

    clearStepOne(state) {
      state.stepOne = null;
    },

    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
    },

    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user-token');
    },
  },
});


export const { initiateRole,clearInitialRole, createUserStepOne, clearStepOne, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
