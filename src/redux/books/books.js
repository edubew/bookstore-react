import { v4 as uuidv4 } from 'uuid';

const ADD_BOOK = 'bookstore-app-react/books/inputBook';
const REMOVE_BOOK = 'bookstore-app-react/books/removeBook';

const initialState = {
  books: [
    {
      id: uuidv4(),
      genre: 'Action',
      title: 'The Hunger Games',
      author: 'Suzanne Collins',
    },
    {
      id: uuidv4(),
      genre: 'Science Fiction',
      title: 'Dune',
      author: 'Frank Herbert',
    },
    {
      id: uuidv4(),
      genre: 'Economy',
      title: 'Capital in the Twenty-First Century',
      author: 'Suzanne Collins',
    },
  ],
};

// Add Reducers
export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK: {
      const newBook = [...state.books, action.payload];
      return { ...state.books, books: newBook };
    }
    case REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload.id),
      };
    default:
      return state;
  }
}

export const inputBook = (title, author) => ({
  type: ADD_BOOK,
  payload: {
    title,
    author,
    id: uuidv4(),
  },
});

export const removeBook = (id) => ({
  type: REMOVE_BOOK,
  payload: {
    id,
  },
});
