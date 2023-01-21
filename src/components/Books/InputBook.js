import React from 'react';
import './books.css';

const InputBook = () => (
  <div className="input__container">
    <h1>ADD NEW BOOK</h1>
    <form>
      <input type="text" name="name" placeholder="Book title..." required />
      <input type="text" name="name" placeholder="Author..." required />
      <button className="add__btn" type="submit">
        ADD BOOK
      </button>
    </form>
  </div>
);

export default InputBook;
