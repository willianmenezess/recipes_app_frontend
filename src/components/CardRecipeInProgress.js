// import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { AppContext } from '../contexts/AppProvider';
import shareIconSvg from '../images/shareIcon.svg';
import favIconSvg from '../images/whiteHeartIcon.svg';

function CardRecipeInProgress() {
  const { fetchData } = useContext(AppContext);
  const [checkedItems, setCheckedItems] = useState(() => {
    const storedItems = localStorage.getItem('inProgressRecipes');
    return storedItems ? JSON.parse(storedItems) : [];
  });
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
  console.log(checkedItems);

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

  useEffect(() => {
    fetchId();
  }, [fetchId]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedItems));
  }, [id, checkedItems]);

  return (
    <section>
      <img
        width="150"
        height="150"
        data-testid="recipe-photo"
        src={ recipeData.strDrinkThumb
          ? recipeData.strDrinkThumb : recipeData.strMealThumb }
        alt="imagem"
      />
      <div data-testid="recipe-title">
        { recipeData.strDrink ? recipeData.strDrink : recipeData.strMeal }
      </div>
      <div data-testid="recipe-category">
        { recipeData.strCategory }
      </div>
      <div data-testid="instructions">
        { recipeData.strInstructions }
      </div>
      <h3>Ingredients</h3>

      <div>
        { ingredientsAndMeasures.map((item, index) => (
          <p key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                name={ item }
                checked={ !!checkedItems[item] }
                onChange={ handleChange }
              />
              { item}
            </label>
          </p>
        )) }
      </div>
      <button data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
      <br />
      <button data-testid="share-btn">
        <img src={ shareIconSvg } alt="share" />
      </button>
      <button data-testid="favorite-btn">
        <img src={ favIconSvg } alt="fav" />
      </button>
    </section>
  );
}
// CardRecipeInProgress.propTypes = {
//   recipe: PropTypes.shape({
//     strDrinkThumb: PropTypes.string,
//     strMealThumb: PropTypes.string,
//     strDrink: PropTypes.string,
//     strMeal: PropTypes.string,
//     strCategory: PropTypes.string,
//   }).isRequired,
// };

export default CardRecipeInProgress;
