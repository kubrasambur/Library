import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  filteredBooks: [],
  users: [],
  loggedIn: false,
  email: null,
  status: "idle",
  error: null,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state?.books?.push(action.payload);
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
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

export const {
  addBook,
  setBooks,
  setFilteredBooks,
  addUser,
  setUsers,
  setEmaill,
  setIsLoggedIn,
} = bookSlice.actions;

export default bookSlice.reducer;
