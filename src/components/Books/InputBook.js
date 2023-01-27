import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { inputBook } from '../../redux/books/books';
import './books.css';

const InputBook = () => {
  const [state, setState] = useState({
    title: '',
    author: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(inputBook(state.title, state.author));
    state.title = '';
    state.author = '';
  };

  return (
    <div className="input__container">
      <h1>ADD NEW BOOK</h1>
      <form>
        <input type="text" name="name" placeholder="Book title..." value={state.title} required onChange={handleChange} />
        <input type="text" name="name" placeholder="Author..." value={state.author} required onChange={handleChange} />
        <button className="add__btn" type="submit" onClick={handleSubmit}>
          ADD BOOK
        </button>
      </form>
    </div>
  );
};

export default InputBook;
