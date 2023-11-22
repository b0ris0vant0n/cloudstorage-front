import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    users: [],
    error: null,
    isAdmin: false,
    },
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
    },
    fetchUsersSuccess: (state, action) => {
      console.log('Data received in reducer:', action.payload);
      state.users = action.payload;
      state.error = null;
    },
    fetchUsersFailure: (state, action) => {
      console.log('Error received in reducer:', action.payload); 
      state.error = { message: action.payload.message, stack: action.payload.stack };
    },
  },
});

export const { loginSuccess, logoutSuccess, fetchUsersFailure, fetchUsersSuccess } = userSlice.actions;
export default userSlice.reducer;
