import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import imageShare from '../images/shareIcon.svg';

function ShareFavRecipeBtn({ recipeDetails, route }) {
  console.log(recipeDetails);
  console.log(route);
  const [messageShare, setMessageShare] = useState('');
  const { pathname } = useLocation();

  const handleShareClick = async () => {
    const URL = `http://localhost:3000${pathname}`;
    setMessageShare('Link Copied!');
    await copy(URL);
  };

  const handleFavoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (route === 'meal') {
      const {
        idMeal,
        strArea,
        strCategory,
        strMeal,
        strMealThumb,
      } = recipeDetails;
      const newFavoriteRecipe = {
        id: idMeal,
        type: route,
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...favoriteRecipes, newFavoriteRecipe]));
    }
    if (route === 'drink') {
      const {
        idDrink,
        strAlcoholic,
        strCategory,
        strDrink,
        strDrinkThumb,
      } = recipeDetails;
      const newFavoriteRecipe = {
        id: idDrink,
        type: route,
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...favoriteRecipes, newFavoriteRecipe]));
    }
  };

  return (
    <div>
      <span>{ messageShare }</span>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareClick }
      >
        <img src={ imageShare } alt="share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavoriteClick }
      >
        Favorite
      </button>
    </div>
  );
}

ShareFavRecipeBtn.propTypes = {
  recipeDetails: PropTypes.shape.isRequired,
  route: PropTypes.string.isRequired,
};

export default ShareFavRecipeBtn;
