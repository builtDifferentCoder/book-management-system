import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "movies",
  initialState: {
    booksFilter: {
      searchTerm: "",
      selectedGenre: "",
      selectedYear: "",
      selectedSort: [],
    },
    filteredBooks: [],
    bookYears: [],
    uniqueYears: [],
  },
  reducers: {
    setBooksFilter: (state, action) => {
      state.booksFilter = {
        ...state.booksFilter,
        ...action.payload,
      };
    },
    setFilteredBooks: (state, action) => {
      state.filteredBooks = action.payload;
    },
    setBooksYear: (state, action) => {
      state.bookYears = action.payload;
    },
    setUniqueYears: (state, action) => {
      state.uniqueYears = action.payload;
    },
  },
});

export const {
  setBooksFilter,
  setFilteredBooks,
  setBooksYear,
  setUniqueYears,
} = bookSlice.actions;
export default bookSlice.reducer;
