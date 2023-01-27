const ADD_BOOK = 'bookstore-app-react/books/InputBook';
const REMOVE_BOOK = 'bookstore-app-react/books/removeBook';

const initialState = {
  books: [],
};

// Add Reducers
export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK:
      return { ...state };
    case REMOVE_BOOK:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    default:
      return state;
  }
}

export const InputBook = () => ({
  type: ADD_BOOK,
});

export const removeBook = () => ({
  type: REMOVE_BOOK,
});
