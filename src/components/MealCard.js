import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/Recipes.css';

function MealCard({ meal, index }) {
  const { strMeal, strMealThumb, idMeal } = meal;

  return (
    <Link to={ `/meals/${idMeal}` } className="title-recipe">
      <div data-testid={ `${index}-recipe-card` } className="card-recipe">
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid={ `${index}-card-img` }
          className="recipe-img"
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
