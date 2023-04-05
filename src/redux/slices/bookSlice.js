import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredBooks: [],
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
    setFilteredBooks: (state, action) => {
      state.filteredBooks = action.payload;
    },
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

export const { setFilteredBooks, addUser, setUsers, setEmaill, setIsLoggedIn } =
  bookSlice.actions;

export default bookSlice.reducer;
