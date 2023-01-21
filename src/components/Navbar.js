import React from 'react';
import { Link } from 'react-router-dom';
import './Books/books.css';

const Navbar = () => (
  <header>
    <Link className="logo" to="/">
      Bookstore CMS
    </Link>

    <nav>
      <Link className="nav__item" to="/">
        BOOKS
      </Link>
      <Link className="nav__item" to="/categories">
        CATEGORIES
      </Link>
    </nav>
  </header>
);

export default Navbar;
