import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkStatus } from '../../redux/categories/categories';
import './categories.css';

const Categories = () => {
  const dispatch = useDispatch();
  const categoriesStatus = useSelector((state) => state.categories);

  const handleSubmit = () => {
    dispatch(checkStatus());
  };

  return (
    <div>
      <button className="categories__btn" type="button" onClick={handleSubmit}>
        Check Status
      </button>
      <h3>{categoriesStatus}</h3>
    </div>
  );
};

export default Categories;
