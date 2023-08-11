/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BOOKS_URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/CsWRehq3meHVyWZHy63J/books';

// Actions
const ADD_BOOK = 'bookstore-react/books/addBook';
const REMOVE_BOOK = 'bookstore-react/books/removeBook';
const EDIT_BOOK = 'bookstore-react/books/editBook';
const ADD_COMMENT = 'bookstore-react/books/addComment';
const FETCH_BOOKS = 'bookstore-react/books/fetchBooks';

const initialState = [];

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

// Async Thunk for editing a book and adding comments
export const editBook = createAsyncThunk(EDIT_BOOK, async ({
  id, title, author, category,
}) => {
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

// Redux slice for books
const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => Object.keys(action.payload).map((key) => {
        const { title, author, category } = action.payload[key][0];
        return {
          item_id: key,
          title,
          author,
          category,
        };
      }))
      .addCase(addBook.fulfilled, (state, action) => {
        // Book added successfully, update state by appending the new book
        const addedBook = action.payload;
        state.push(addedBook);
      })
      .addCase(removeBook.fulfilled, (state, action) =>
        // Book removed successfully, update state by filtering out the removed book
        state.filter((book) => book.item_id !== action.payload))
      .addCase(editBook.fulfilled, (state, action) => {
        // Book edited successfully, update state with the edited book
        const {
          id, title, author, category,
        } = action.payload;
        const bookToUpdate = state.find((book) => book.item_id === id);
        if (bookToUpdate) {
          bookToUpdate.title = title;
          bookToUpdate.author = author;
          bookToUpdate.category = category;
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        // Comment added successfully, update state with the added comment
        const { bookId, comment } = action.payload;
        const bookToUpdate = state.find((book) => book.item_id === bookId);
        if (bookToUpdate) {
          if (!bookToUpdate.comments) {
            bookToUpdate.comments = [];
          }
          bookToUpdate.comments.push(comment);
        }
      });
  },
});

export default booksSlice.reducer;
