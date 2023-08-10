import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import { editBook, removeBook } from '../../redux/books/books';
import 'react-circular-progressbar/dist/styles.css';
import book from '../../assets/book.jpeg';

const Book = ({ title, author, id }) => {
  const dispatch = useDispatch();

  const [completionPercentage, setCompletionPercentage] = useState(10);
  const [currentChapter, setCurrentChapter] = useState(1);

  // Load progress from local storage when the component loads
  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem(`book_${id}_progress`));
    if (storedProgress) {
      setCompletionPercentage(storedProgress.completionPercentage);
      setCurrentChapter(storedProgress.currentChapter);
    }
  }, [id]);

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

  const updateProgress = () => {
    if (currentChapter < 60) {
      setCurrentChapter((prevChapter) => prevChapter + 2);
    }
    if (completionPercentage + 5 <= 100) {
      setCompletionPercentage((prevPercentage) => prevPercentage + 2);
    }
  };

  // Save progress to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(`book_${id}_progress`, JSON.stringify({ completionPercentage, currentChapter }));
  }, [id, completionPercentage, currentChapter]);

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

      <div style={{ marginLeft: 150 }} className="progress__container">
        <div style={{ width: 100}}>
          <CircularProgressbar value={completionPercentage} text={`${completionPercentage}%`} />
        </div>
        <p>Completed</p>
      </div>

      <div className="update__container">
        <p className="current__chapter">CURRENT CHAPTER</p>
        <p>
          Chapter
          {' '}
          {currentChapter}
        </p>
        <button type="button" className="progress__btn" onClick={updateProgress}>
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
