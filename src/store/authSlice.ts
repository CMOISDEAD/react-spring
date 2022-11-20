// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { Song } from "../components/index";

// Type for our state
export interface AuthState {
  isAdmin: boolean;
  authState: boolean;
  username: string;
  playlist: Song[];
}

// Initial state
const initialState: AuthState = {
  isAdmin: false,
  authState: false,
  username: "",
  playlist: [],
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload.authState;
      state.username = action.payload.username;
      state.isAdmin = action.payload.isAdmin;
      state.playlist = action.payload.playlist;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectState = (state: AppState) => state.auth;

export default authSlice.reducer;
