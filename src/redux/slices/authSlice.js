import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,

  isAuthenticated: Boolean(savedToken),

  isLoading: false,

  error: null,

  registrationSuccess: false,

  registeredUser: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // =========================
    // REGISTER
    // =========================

    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.registrationSuccess = false;
    },

    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;

      state.registrationSuccess = true;

      state.registeredUser = action.payload;
    },

    registerFailure: (state, action) => {
      state.isLoading = false;

      state.error = action.payload;

      state.registrationSuccess = false;
    },

    // =========================
    // LOGIN
    // =========================

    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;

      state.token = action.payload.token;

      state.user = action.payload;

      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);

      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    loginFailure: (state, action) => {
      state.isLoading = false;

      state.error = action.payload;

      state.isAuthenticated = false;
    },

    // =========================
    // LOGOUT
    // =========================

    logout: (state) => {
      state.user = null;
      state.token = null;

      state.isAuthenticated = false;

      state.error = null;

      state.registeredUser = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    // =========================
    // CLEAR ERROR
    // =========================

    clearAuthError: (state) => {
      state.error = null;
    },

    // =========================
    // CLEAR REGISTRATION
    // =========================

    clearRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
      state.registeredUser = null;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,

  loginStart,
  loginSuccess,
  loginFailure,

  logout,

  clearAuthError,
  clearRegistrationSuccess,
} = authSlice.actions;

export default authSlice.reducer;
