import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AppContext } from '../contexts/AppProvider';
import blackFavIcon from '../images/blackHeartIcon.svg';
import shareIconSvg from '../images/shareIcon.svg';
import whiteFavIcon from '../images/whiteHeartIcon.svg';
import '../css/CardRecipeInProgress.css';

function CardRecipeInProgress() {
  const { fetchData } = useContext(AppContext);
  const [checkedItems, setCheckedItems] = useState(() => {
    const storedItems = localStorage.getItem('inProgressRecipes');
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const history = useHistory();
  const [copied, setCopied] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const [isFinishDisabled, setIsFinishDisabled] = useState(false);
  const [recipeData, setRecipeData] = useState([]);
  const { id } = useParams();
  const { pathname } = useLocation();
  const title = pathname === `/meals/${id}/in-progress` ? 'meals' : 'drinks';
  const mealsUrlId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drinksUrlId = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const handleChange = ({ target }) => {
    if (target.checked) {
      target.parentNode.style.textDecoration = 'line-through';
    } else {
      target.parentNode.style.textDecoration = 'none';
    }
    const { name } = target;
    setCheckedItems({ ...checkedItems, [name]: target.checked });
  };

  const handleShare = () => {
    const { protocol, host } = window.location;
    const type = title === 'meals' ? 'meals' : 'drinks';
    const url = `${protocol}//${host}/${type}/${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
  };
  const handleFavorite = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipeLS = {
      id,
      type: title === 'meals' ? 'meal' : 'drink',
      nationality: recipeData.strArea ? recipeData.strArea : '',
      category: recipeData.strCategory,
      alcoholicOrNot: recipeData.strAlcoholic ? recipeData.strAlcoholic : '',
      name: recipeData.strMeal ? recipeData.strMeal : recipeData.strDrink,
      image: recipeData.strMealThumb ? recipeData.strMealThumb : recipeData.strDrinkThumb,
    };
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...getLocalStorage, recipeLS]),
    );
    setIsFavorite(true);
  };

  const handleUnfavorite = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredRecipes = getLocalStorage.findIndex((item) => item.id === id);
    getLocalStorage.splice(filteredRecipes, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(getLocalStorage));
    setIsFavorite(false);
  };

  const checkIsFavorite = useCallback(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavoriteRecipe = getLocalStorage.some((item) => item.id === id);
    setIsFavorite(isFavoriteRecipe);
  }, [id]);

  const ingredients = Object.keys(recipeData).filter((item) => {
    if (item.includes('strIngredient')) {
      return recipeData[item];
    }
    return null;
  }).map((item) => recipeData[item]);

  const measures = Object.keys(recipeData).filter((item) => {
    if (item.includes('strMeasure')) {
      return recipeData[item];
    }
    return null;
  }).map((item) => recipeData[item]);

  const filteredMeasures = measures.filter((item) => {
    if (item !== null && item !== '' && item !== ' ' && item !== '0') {
      return item;
    }
    return null;
  });

  const ingredientsAndMeasures = ingredients.map((item, index) => {
    if (filteredMeasures[index] !== undefined) {
      return `${item} - ${filteredMeasures[index]}`;
    }
    return item;
  });

  const fetchId = useCallback(async () => {
    if (title === 'meals') {
      const dataMeals = await fetchData(mealsUrlId);
      setRecipeData(dataMeals.meals[0]);
    }
    if (title === 'drinks') {
      const dataDrinks = await fetchData(drinksUrlId);
      setRecipeData(dataDrinks.drinks[0]);
    }
  }, [title, mealsUrlId, drinksUrlId, fetchData]);

  const handleFinishButton = useCallback(() => {
    const verifyCheckedItems = Object.values(checkedItems)
      .every((checked) => checked);
    const nCheckedItems = Object.values(checkedItems).length;
    const nIngredients = ingredientsAndMeasures.filter((item) => item !== null).length;
    setIsFinishDisabled(!(verifyCheckedItems && nIngredients === nCheckedItems));
  }, [checkedItems, ingredientsAndMeasures]);

  const handleFinishRecipe = () => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const recipeLS = {
      id,
      nationality: recipeData.strArea ? recipeData.strArea : '',
      name: recipeData.strMeal ? recipeData.strMeal : recipeData.strDrink,
      category: recipeData.strCategory ? recipeData.strCategory : '',
      image: recipeData.strMealThumb ? recipeData.strMealThumb : recipeData.strDrinkThumb,
      tags: recipeData.strTags ? recipeData.strTags.split(',') : [],
      alcoholicOrNot: recipeData.strAlcoholic ? recipeData.strAlcoholic : '',
      type: title === 'meals' ? 'meal' : 'drink',
      doneDate: recipeData.dateModified ? recipeData.dateModified : new Date(),
    };
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...getDoneRecipes, recipeLS]),
    );
    history.push('/done-recipes');
  };

  useEffect(() => {
    fetchId();
  }, [fetchId]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedItems));
    const getLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!getLocalStorage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!getDoneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    checkIsFavorite();
    handleFinishButton();
  }, [checkedItems, checkIsFavorite, handleFinishButton]);

  return (
    <section>
      <div className="category-start">
        <div data-testid="recipe-category">
          { recipeData.strCategory }
        </div>
      </div>
      <div className="container-share-favorite">
        <button
          className="iconBtn-inprogress"
          data-testid="share-btn"
          onClick={ handleShare }
        >
          <img src={ shareIconSvg } alt="share" />
        </button>
        <button
          className="iconBtn-inprogress"
          data-testid="favorite-btn"
          onClick={ isFavorite ? handleUnfavorite : handleFavorite }
          src={ isFavorite ? blackFavIcon : whiteFavIcon }
        >
          { isFavorite
            ? <img src={ blackFavIcon } alt="favorite" />
            : <img src={ whiteFavIcon } alt="favorite" />}
        </button>
      </div>
      <img
        className="imag"
        data-testid="recipe-photo"
        src={ recipeData.strDrinkThumb
          ? recipeData.strDrinkThumb : recipeData.strMealThumb }
        alt="imagem"
      />
      { copied && <p className="copied-msg">Link copied!</p> }
      <h3>Ingredients</h3>
      <div
        className="border"
      >
        { ingredientsAndMeasures.map((item, index) => (
          <p
            key={ index }
          >
            <label
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                className="checkbox"
                name={ item }
                checked={ !!checkedItems[item] }
                onChange={ handleChange }
              />
              { item}
            </label>
          </p>
        )) }
      </div>
      <div
        className="title"
        data-testid="recipe-title"
      >
        { recipeData.strDrink ? recipeData.strDrink : recipeData.strMeal }
      </div>
      <br />
      <h3>instructions</h3>
      <div className="instruction">
        <div className="paragraph">
          <div data-testid="instructions">
            { recipeData.strInstructions }
          </div>
        </div>
      </div>
      <button
        className="finalizarBtn"
        data-testid="finish-recipe-btn"
        disabled={ isFinishDisabled }
        onClick={ handleFinishRecipe }
      >
        Finalizar Receita
      </button>
      <br />
    </section>
  );
}

export default CardRecipeInProgress;
