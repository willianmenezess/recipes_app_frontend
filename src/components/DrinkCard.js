import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/Recipes.css';

function DrinkCard({ drink, index }) {
  const { strDrink, strDrinkThumb, idDrink } = drink;

  return (
    <Link to={ `/drinks/${idDrink}` } className="title-recipe">
      <div data-testid={ `${index}-recipe-card` } className="card-recipe">
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid={ `${index}-card-img` }
          className="recipe-img"
        />
        <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
      </div>
    </Link>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
