import React from 'react';
import { useHistory } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  const handleClickMealDrink = (name) => {
    if (name === 'drinks') {
      history.push('/drinks');
    }
    if (name === 'meals') {
      history.push('/meals');
    }
  };

  return (
    <footer
      data-testid="footer"
    >
      <button
        className="icon"
        data-testid="drinks-bottom-btn"
        type="button"
        src="/static/media/drinkIcon.efc0d3c156e5da73e44a826c8d67b142.svg"
        onClick={ () => handleClickMealDrink('drinks') }
      >
        <img
          src={ drinkIcon }
          alt="Icon drink"
        />
      </button>

      <button
        className="icon"
        data-testid="meals-bottom-btn"
        type="button"
        src="/static/media/mealIcon.efc0d3c156e5da73e44a826c8d67b142.svg"
        onClick={ () => handleClickMealDrink('meals') }
      >
        <img
          src={ mealIcon }
          alt="Icon meal"
        />
      </button>
    </footer>
  );
}

export default Footer;
