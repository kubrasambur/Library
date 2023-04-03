import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  filteredBooks: [],
  users: [],
  email: null,
  status: "idle",
  error: null,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setFilteredBooks: (state, action) => {
      state.filteredBooks = action.payload;
    },
    addUser: (state, action) => {
      console.log("action.payload1", action.payload)
      state.users.push(action.payload);
    },
    setUsers: (state, action) => {
      console.log("action.payload", action.payload)
      state.users = action.payload;
    },
    setEmaill: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { addBook, setBooks, setFilteredBooks,addUser,setUsers,setEmaill } = bookSlice.actions;

export default bookSlice.reducer;
