import React, { useEffect, useContext, useCallback, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { AppContext } from '../contexts/AppProvider';

function RecipeDetails() {
  const [dataDetails, setDataDetails] = useState([{}]);
  const { id } = useParams();
  const { pathname } = useLocation();

  const { fetchData } = useContext(AppContext);

  const fetchDetails = useCallback(async () => {
    const URL_DETAILS_MEAL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const URL_DETAILS_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    if (pathname === `/meals/${id}`) {
      const dataDetailss = await fetchData(URL_DETAILS_MEAL);
      setDataDetails(dataDetailss.meals[0]);
    } else if (pathname === `/drinks/${id}`) {
      const dataDetailss = await fetchData(URL_DETAILS_DRINK);
      setDataDetails(dataDetailss.drinks[0]);
    }
  }, [fetchData, id, setDataDetails, pathname]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const NUMBER = 13;

  const styleImage = {
    width: '250px',
    height: '250px',
    border: '1px solid black',
  };

  return (
    <section>
      { pathname === `/meals/${id}` && (
        <div>
          <img
            src={ dataDetails.strMealThumb }
            alt={ dataDetails.strMeal }
            data-testid="recipe-photo"
            style={ styleImage }
          />
          <h1 data-testid="recipe-title">{ dataDetails.strMeal }</h1>
          <h2 data-testid="recipe-category">{ dataDetails.strCategory }</h2>
          <h3>Ingredients</h3>
          <ul>
            { Object.entries(dataDetails)
              .filter((key) => key[0].includes('strIngredient'))
              .map(([key, value], index) => {
                if (value !== '' && value !== null) {
                  return (
                    <li
                      key={ value }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      { `${value} - ${dataDetails[`strMeasure${key.slice(NUMBER)}`]}` }
                    </li>
                  );
                }
                return null;
              })}
          </ul>
          <h3>Instructions</h3>
          <p data-testid="instructions">{ dataDetails.strInstructions }</p>
          { dataDetails.strYoutube && (<iframe
            data-testid="video"
            title="video"
            width="300"
            height="200"
            src={ dataDetails.strYoutube.replace('watch?v=', 'embed/') }
          />)}
        </div>
      )}
      { pathname === `/drinks/${id}` && (
        <div>
          <img
            data-testid="recipe-photo"
            src={ dataDetails.strDrinkThumb }
            alt={ dataDetails.strDrink }
            style={ styleImage }
          />
          <h1 data-testid="recipe-title">{ dataDetails.strDrink }</h1>
          <h2 data-testid="recipe-category">{ dataDetails.strAlcoholic }</h2>
          <h3>Ingredients</h3>
          <ul>
            { Object.entries(dataDetails)
              .filter((key) => key[0].includes('strIngredient'))
              .map(([key, value], index) => {
                if (value !== '' && value !== null) {
                  return (
                    <li
                      key={ value }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      { `${value} - ${dataDetails[`strMeasure${key.slice(NUMBER)}`]}` }
                    </li>
                  );
                }
                return null;
              })}
          </ul>
          <h3>Instructions</h3>
          <p data-testid="instructions">{ dataDetails.strInstructions }</p>
        </div>
      )}

    </section>
  );
}

export default RecipeDetails;
