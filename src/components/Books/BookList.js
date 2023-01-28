import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import InputBook from "./InputBook";
import Book from "./Book";
import { fetchBooks } from "../../redux/books/books";

const BookList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const addedBooks = useSelector((state) => state.books);
  return (
    <div>
      {Object.keys(addedBooks).map((book) => (
        <Book
          key={book}
          title={addedBooks[book][0].title}
          author={addedBooks[book][0].author}
          id={book}
        />
      ))}
      <InputBook />
    </div>
  );
};

export default BookList;
