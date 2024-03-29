import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBook } from '../../redux/books/books';
import './books.css';

const InputBook = () => {
  const [state, setState] = useState({
    title: '',
    author: '',
    category: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, author, category } = state;
    if (title.length > 0 && author.length > 0) {
      dispatch(
        addBook({
          title,
          author,
          item_id: uuidv4(),
          category,
        }),
      );
    }
    state.title = '';
    state.author = '';
    state.category = '';
  };

  const categoryOptions = [
    'Fictional', 'Non-Fictional', 'Mystery', 'Thriller', 'Fantansy', 'Romance', 'Science Fiction', 'Short Story', 'Self-help',
  ];

  return (
    <div className="input__container">
      <h1>ADD NEW BOOK</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book title..."
          value={state.title}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author..."
          value={state.author}
          required
          onChange={handleChange}
        />
        <select
          name="category"
          value={state.category}
          onChange={handleChange}
        >
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button className="add__btn" type="submit">
          ADD BOOK
        </button>
      </form>
    </div>
  );
};

export default InputBook;
