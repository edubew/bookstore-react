import React, { useSelector } from 'react-redux';
import InputBook from './InputBook';
import Book from './Books';

const BookList = () => {
  const addedBooks = useSelector((state) => state.books);
  return (
    <div>
      <ul>
        <li>
          {addedBooks.books.map((book) => (
            <Book
              key={book.id}
              title={book.title}
              author={book.author}
              id={book.id}
              book={book}
            />
          ))}
        </li>
      </ul>
      <InputBook />
    </div>
  );
};

export default BookList;
