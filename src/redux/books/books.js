import axios from "axios";

const BOOKS_URL =
  "https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/R9iogCYmIf2eEINhPNCJ/books";

const ADD_BOOK = "bookstore-react/books/InputBook";
const REMOVE_BOOK = "bookstore-react/books/removeBook";
const FETCH_BOOKS = "bookstore-react/books/fetchBooks";

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

export const InputBook = () => ({
  type: ADD_BOOK,
});

export const removeBook = () => ({
  type: REMOVE_BOOK,
});
