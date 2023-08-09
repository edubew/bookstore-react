/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BOOKS_URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/CsWRehq3meHVyWZHy63J/books';

// Actions
const ADD_BOOK = 'bookstore-react/books/addBook';
const REMOVE_BOOK = 'bookstore-react/books/removeBook';
const EDIT_BOOK = 'bookstore-react/books/editBook';
const ADD_COMMENT = 'bookstore-react/books/addComment';
const FETCH_BOOKS = 'bookstore-react/books/fetchBooks';

// Async Thunks
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

// Async Thunk for editing a book
export const editBook = createAsyncThunk(EDIT_BOOK, async ({ id, title, author, category }) => {
  const bookData = {
    title,
    author,
    category,
  };

  const response = await fetch(`${BOOKS_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(bookData),
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  // Return the updated book data
  const updatedBook = {
    id,
    ...bookData,
  };

  return updatedBook;
});

export const addComment = createAsyncThunk(ADD_COMMENT, async ({ bookId, comment }) => {
  const commentData = {
    comment,
  };

  const response = await fetch(`${BOOKS_URL}/${bookId}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentData),
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  // Return the added comment data
  const addedComment = {
    id: Math.random().toString(),
    ...commentData,
  };

  return addedComment;
});
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
