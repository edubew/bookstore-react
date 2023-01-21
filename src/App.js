import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Categories from './components/Categories/Categories';
import BookList from './components/Books/BookList';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/categories" element={<Categories />} />
    </Routes>
  </Router>
);

export default App;
