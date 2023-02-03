import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import InputBook from './InputBook';
import Books from './Books';
import { fetchBooks } from '../../redux/books/books';

const BookList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const addedBooks = useSelector((state) => state.books);
  return (
    <div className="booklist__container">
      {addedBooks.map((book) => (
        <Books
          key={book.item_id}
          title={book.title}
          author={book.author}
          id={book.item_id}
        />
      ))}
      <InputBook />
    </div>
  );
};

export default BookList;
