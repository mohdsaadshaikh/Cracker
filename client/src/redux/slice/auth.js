import { createSlice } from "@reduxjs/toolkit";

export const Authentication = createSlice({
  name: "Authentication",
  initialState: {
    isAuthenticated: false,
    userData: null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      console.log(state.userData);
      console.log(action.payload);
      console.log(state.isAuthenticated);
    },
    setUnAuthenticated: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export const { setAuthenticated, setUnAuthenticated } = Authentication.actions;
export default Authentication.reducer;
