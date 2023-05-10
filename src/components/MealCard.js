import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MealCard({ meal, index }) {
  const { strMeal, strMealThumb, idMeal } = meal;
  const styleImage = {
    width: '150px',
    height: '150px',
    border: '1px solid black',
  };
  return (
    <Link to={ `/meals/${idMeal}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid={ `${index}-card-img` }
          style={ styleImage }
        />
        <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
      </div>
    </Link>
  );
}

MealCard.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    idMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
export default MealCard;
