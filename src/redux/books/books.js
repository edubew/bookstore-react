/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit';

const BOOKS_URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/CsWRehq3meHVyWZHy63J/books';

// Actions
const ADD_BOOK = 'bookstore-react/books/addBook';
const REMOVE_BOOK = 'bookstore-react/books/removeBook';
const FETCH_BOOKS = 'bookstore-react/books/fetchBooks';

const initialState = [];

// Add Reducers
export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case `${ADD_BOOK}/fulfilled`:
      return action.payload;

    case `${FETCH_BOOKS}/fulfilled`:
      return Object.keys(action.payload).map((key) => {
        const { title, author, category } = action.payload[key][0];
        return {
          item_id: key,
          title,
          author,
          category,
        };
      });

    case `${REMOVE_BOOK}/fulfilled`:
      return state.filter((book) => book.id !== action.payload);
    default:
      return state;
  }
}

export const fetchBooks = createAsyncThunk(FETCH_BOOKS, async () => {
  const response = await fetch(BOOKS_URL);
  const data = await response.json();
  return data;
});

export const addBook = createAsyncThunk(ADD_BOOK, async (book) => {
  await fetch(BOOKS_URL, {
    method: 'POST',
    body: JSON.stringify(book),
    headers: {
      'Content-type': 'application/json',
    },
  });
});

export const removeBook = createAsyncThunk(REMOVE_BOOK, async (id) => {
  await fetch(`${BOOKS_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });
});
