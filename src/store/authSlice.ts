import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../types';

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');
const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) as User : null,
  token: storedToken,
  isAuthenticated: Boolean(storedToken),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
