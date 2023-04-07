import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loggedIn: false,
  email: null,
  status: "idle",
  error: null,
};

export const bookSlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state?.users?.push(action.payload);
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setEmaill: (state, action) => {
      state.email = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { addUser, setUsers, setEmaill, setIsLoggedIn } =
  bookSlice.actions;

export default bookSlice.reducer;
