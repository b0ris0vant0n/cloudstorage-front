import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
