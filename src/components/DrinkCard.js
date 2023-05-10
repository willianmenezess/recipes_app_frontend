import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkCard({ drink, index }) {
  const { strDrink, strDrinkThumb, idDrink } = drink;
  const styleImage = {
    width: '150px',
    height: '150px',
    border: '1px solid black',
  };

  return (
    <Link to={ `/drinks/${idDrink}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid={ `${index}-card-img` }
          style={ styleImage }
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
