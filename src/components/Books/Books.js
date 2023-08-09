import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { editBook, removeBook } from '../../redux/books/books';
import book from '../../assets/book.jpeg';

const Book = ({ title, author, id }) => {
  const dispatch = useDispatch();

  const handleDeleteBook = () => {
    dispatch(removeBook(id));
  };

  const handleEditBook = async () => {
    try {
      const editedBook = dispatch(editBook({ id, title, author }));
      console.log('Edited Book:', editedBook);
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  return (
    <article className="book__container drop__shadow inner__shadow">
      <div className="book__content">
        <div className="banner">
          <div className="book__image">
            <img src={book} alt="book" />
          </div>
          <div className="content">
            <small>Fictional</small>
            <h2>{title}</h2>
            <p>{author}</p>
          </div>
        </div>
        <div className="cta__container">
          {/* <button type="button">View Comments</button> */}
          <button type="button" onClick={handleDeleteBook}>
            Remove Book
          </button>
          <button type="button" onClick={handleEditBook}>
            Edit Book
          </button>
        </div>
      </div>
      <div className="progress__container">
        <div className="circle" />
        <div className="percentage">
          <h1>98%</h1>
          <p>Completed</p>
        </div>
      </div>
      <div className="update__container">
        <p className="current__chapter">CURRENT CHAPTER</p>
        <p>Chapter 17</p>
        <button type="button" className="progress__btn">
          Update Progress
        </button>
      </div>
    </article>
  );
};

Book.defaultProps = {
  title: '',
  author: '',
  id: '',
};

Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  id: PropTypes.string,
};

export default Book;
