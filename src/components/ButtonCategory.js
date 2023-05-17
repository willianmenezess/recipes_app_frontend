import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../contexts/AppProvider';
import '../css/Recipes.css';

function ButtonCategory({ category }) {
  const { filterByCategory, filterAllCategories, wasClicked,
    setWasClicked } = useContext(AppContext);
  const { pathname } = useLocation();

  const handleFilter = () => {
    console.log(wasClicked);
    if (wasClicked) {
      filterAllCategories();
      setWasClicked((prevState) => !prevState);
    } else {
      filterByCategory(category, pathname);
      setWasClicked((prevState) => !prevState);
    }
  };

  return (
    <section>
      <button
        className="btn-category"
        type="button"
        data-testid={ `${category}-category-filter` }
        onClick={ handleFilter }
      >
        { category }
      </button>

    </section>
  );
}

ButtonCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ButtonCategory;
