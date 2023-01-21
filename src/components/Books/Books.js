import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book }) => (
  <ul>
    <li className="book__container">
      <small>{book.genre}</small>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <div className="cta__container">
        <button type="submit">Comments</button>
        <button type="submit">Remove</button>
        <button type="submit">Edit</button>
      </div>
    </li>
  </ul>
);

Book.defaultProps = {
  book: {},
};

Book.propTypes = {
  book: {
    genre: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
  },
};

export default Book;
