import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import imageShare from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ShareFavRecipeBtn({ recipeDetails, route }) {
  const [messageShare, setMessageShare] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  //   const [isFavorite, setIsFavorite] = useState((JSON.parse(localStorage
  //     .getItem('favoriteRecipes')) || [])
  //     .some((recipe) => recipe.id === recipeDetails.idMeal || recipe.id
  // === recipeDetails.idDrink));
  const { pathname } = useLocation();

  // const copyClipboardApi = async (text) => {
  //   if (!navigator.clipboard) {
  //     throw makeError();
  //   }
  //   return navigator.clipboard.writeText(text);
  // };

  const handleShareClick = () => {
    const URL = `http://localhost:3000${pathname}`;
    setMessageShare('Link copied!');
    copy(URL);
  };

  const initialFavorite = useCallback(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const initialFavoriteRecipe = favoriteRecipes
      .some((recipe) => recipe.id === recipeDetails.idMeal || recipe.id
    === recipeDetails.idDrink);
    setIsFavorite(initialFavoriteRecipe);
  }, [recipeDetails.idDrink, recipeDetails.idMeal]);

  useEffect(() => {
    initialFavorite();
  }, [initialFavorite]);

  const handleFavoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavoriteRecipe = favoriteRecipes
      .some((recipe) => recipe.id === recipeDetails.idMeal || recipe.id
    === recipeDetails.idDrink);
    if (route === 'meal' && !isFavoriteRecipe) {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipeDetails;
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
      setIsFavorite(true);
    }
    if (route === 'drink' && !isFavoriteRecipe) {
      const { idDrink, strAlcoholic, strCategory, strDrink,
        strDrinkThumb } = recipeDetails;
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
      setIsFavorite(true);
    }
    if (isFavoriteRecipe) {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipe) => recipe.id !== recipeDetails.idMeal
      && recipe.id !== recipeDetails.idDrink);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(newFavoriteRecipes));
      setIsFavorite(false);
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
        // data-testid="favorite-btn"
        onClick={ handleFavoriteClick }
      >
        {isFavorite && <img
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          alt="favorite"
        />}
        {!isFavorite && <img
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          alt="favorite"
        />}
      </button>
    </div>
  );
}

ShareFavRecipeBtn.propTypes = {
  recipeDetails: PropTypes.shape.isRequired,
  route: PropTypes.string.isRequired,
};

export default ShareFavRecipeBtn;
