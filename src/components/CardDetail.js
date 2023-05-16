import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import '../css/CardDetail.css';
import { useHistory, useParams } from 'react-router-dom';
import ShareFavRecipeBtn from './ShareFavRecipeBtn';

function CardDetail({ dataDetails, route, recomendations }) {
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const NUMBER = 13;

  const getDoneRecipe = useCallback(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    if (doneRecipes.some((recipe) => recipe.id === dataDetails.idMeal)) {
      setDoneRecipe(true);
    }
    if (doneRecipes.some((recipe) => recipe.id === dataDetails.idDrink)) {
      setDoneRecipe(true);
    }
  }, [dataDetails.idDrink, dataDetails.idMeal]);

  const getInProgressRecipe = useCallback(() => {
    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes') || '{}');
    if (inProgressRecipes.meals && inProgressRecipes.meals[dataDetails.idMeal]) {
      setInProgressRecipe(true);
    }
    if (inProgressRecipes.drinks && inProgressRecipes.drinks[dataDetails.idDrink]) {
      setInProgressRecipe(true);
    }
  }, [dataDetails.idDrink, dataDetails.idMeal]);

  useEffect(() => {
    getDoneRecipe();
    getInProgressRecipe();
  }, [getDoneRecipe, getInProgressRecipe]);

  const history = useHistory();
  const { id } = useParams();

  const handleStartRecipe = () => {
    if (route === 'meal') {
      history.push(`/meals/${id}/in-progress`);
    }
    if (route === 'drink') {
      history.push(`/drinks/${id}/in-progress`);
    }
  };
  return (
    <>
      <section>
        <div>
          { route === 'meal' && (
            <>
              <img
                src={ dataDetails.strMealThumb }
                alt={ dataDetails.strMeal }
                data-testid="recipe-photo"
                className="img-detail"
              />
              <ShareFavRecipeBtn recipeDetails={ dataDetails } route={ route } />
              <h1
                data-testid="recipe-title"
                className="title-recipe-details"
              >
                { dataDetails.strMeal }

              </h1>
              <h2
                data-testid="recipe-category"
                className="title-category-recipe"
              >
                { dataDetails.strCategory }

              </h2>
            </>
          )}
          { route === 'drink' && (
            <>
              <img
                data-testid="recipe-photo"
                src={ dataDetails.strDrinkThumb }
                alt={ dataDetails.strDrink }
                className="img-detail"
              />
              <ShareFavRecipeBtn recipeDetails={ dataDetails } route={ route } />
              <h1
                data-testid="recipe-title"
                className="title-recipe-details"
              >
                { dataDetails.strDrink }

              </h1>
              <h2
                data-testid="recipe-category"
                className="title-category-recipe"
              >
                { dataDetails.strAlcoholic }

              </h2>
            </>
          )}
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
          <p
            data-testid="instructions"
            className="p-instruction"
          >
            { dataDetails.strInstructions }

          </p>
          { dataDetails.strYoutube && (<iframe
            data-testid="video"
            title="video"
            width="300"
            height="200"
            src={ dataDetails.strYoutube.replace('watch?v=', 'embed/') }
          />)}
        </div>
        <div>

          <h3>Recomendations</h3>

          <div className="carousel">
            { route === 'drink' && (
              recomendations.map((recipe, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                  className="card-recomendation"
                >
                  <img
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                    className="image-recomendation"
                  />
                  <p
                    data-testid={ `${index}-recommendation-title` }
                  >
                    { recipe.strMeal }

                  </p>
                </div>
              ))
            )}
            { route === 'meal' && (
              recomendations.map((recipe, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                  className="card-recomendation"
                >
                  <img
                    src={ recipe.strDrinkThumb }
                    alt={ recipe.strDrink }
                    className="image-recomendation"
                  />
                  <p
                    data-testid={ `${index}-recommendation-title` }
                  >
                    { recipe.strDrink }

                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <footer>
        { !inProgressRecipe ? (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="btn-start"
            disabled={ doneRecipe }
            onClick={ handleStartRecipe }
          >
            Start Recipe
          </button>)
          : (
            <button
              type="button"
              className="btn-start"
              data-testid="start-recipe-btn"
            >
              Continue Recipe
            </button>)}
      </footer>
    </>
  );
}

CardDetail.propTypes = {
  dataDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  route: PropTypes.string.isRequired,
  recomendations: PropTypes.shape.isRequired,

};

export default CardDetail;
