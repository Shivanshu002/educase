import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: any;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  otpToken: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  otpToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    RegistStart(state) {
      state.loading = true;
      state.error = null;
    },
    RegistSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
    RegistFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    forgotStart(state) {
      state.loading = true;
      state.error = null;
    },
    forgotSuccess(state) {
      state.loading = false;
    },
    forgotFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    verifyOtpStart(state) {
      state.loading = true;
      state.error = null;
    },
    verifyOtpSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.otpToken = action.payload;
    },
    verifyOtpFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordStart(state) {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess(state) {
      state.loading = false;
      state.otpToken = null;
    },
    resetPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem('user');
    },
    setUserFromStorage(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUserFromStorage,
  RegistFailure,
  RegistSuccess,
  RegistStart,
  forgotStart,
  forgotSuccess,
  forgotFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
} = authSlice.actions;

export default authSlice.reducer;
