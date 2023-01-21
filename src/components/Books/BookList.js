import React, { useState } from 'react';
import InputBook from './InputBook';
import Book from './Books';

const BookList = () => {
  const [books] = useState([
    {
      id: 1,
      genre: 'Action',
      title: 'The Hunger Games',
      author: 'Suzanne Collins',
    },
    {
      id: 2,
      genre: 'Science Fiction',
      title: 'Dune',
      author: 'Frank Herbert',
    },
    {
      id: 3,
      genre: 'Economy',
      title: 'Capital in the Twenty-First Century',
      author: 'Suzanne Collins',
    },
  ]);

  return (
    <div>
      <ul>
        {books.map((book) => (
          <Book key={book.id} id={book.id} book={book} />
        ))}
      </ul>
      <InputBook />
    </div>
  );
};

export default BookList;
