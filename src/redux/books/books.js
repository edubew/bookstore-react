/* eslint-disable camelcase */
import axios from 'axios';

const BOOKS_URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/R9iogCYmIf2eEINhPNCJ/books';

const ADD_BOOK = 'bookstore-react/books/addBook';
const REMOVE_BOOK = 'bookstore-react/books/removeBook';
const FETCH_BOOKS = 'bookstore-react/books/fetchBooks';

const initialState = [];

// Add Reducers
export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK:
      return action.payload;
    case FETCH_BOOKS:
      return action.payload;
    case REMOVE_BOOK:
      return action.payload;
    default:
      return state;
  }
}

export const fetchBooks = () => async (dispatch) => {
  try {
    const response = await axios.get(BOOKS_URL);
    dispatch({
      type: FETCH_BOOKS,
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const addBook = ({
  title, author, item_id, category,
}) => async (dispatch) => {
  try {
    await axios.post(BOOKS_URL, {
      title,
      author,
      item_id,
      category,
    });
    return dispatch(fetchBooks());
  } catch (err) {
    return Promise.reject(err);
  }
};

export const removeBook = (id) => async (dispatch) => {
  await axios.delete(`${BOOKS_URL}/${id}`);
  dispatch(fetchBooks());
};