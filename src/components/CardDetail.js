import React from 'react';
import PropTypes from 'prop-types';

function CardDetail({ dataDetails, route }) {
  const NUMBER = 13;
  const styleImage = {
    width: '250px',
    height: '250px',
    border: '1px solid black',
  };

  return (
    <div>
      { route === 'meal' && (
        <>
          <img
            src={ dataDetails.strMealThumb }
            alt={ dataDetails.strMeal }
            data-testid="recipe-photo"
            style={ styleImage }
          />
          <h1 data-testid="recipe-title">{ dataDetails.strMeal }</h1>
          <h2 data-testid="recipe-category">{ dataDetails.strCategory }</h2>
        </>
      )}
      { route === 'drink' && (
        <>
          <img
            data-testid="recipe-photo"
            src={ dataDetails.strDrinkThumb }
            alt={ dataDetails.strDrink }
            style={ styleImage }
          />
          <h1 data-testid="recipe-title">{ dataDetails.strDrink }</h1>
          <h2 data-testid="recipe-category">{ dataDetails.strAlcoholic }</h2>
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
      <p data-testid="instructions">{ dataDetails.strInstructions }</p>
      { dataDetails.strYoutube && (<iframe
        data-testid="video"
        title="video"
        width="300"
        height="200"
        src={ dataDetails.strYoutube.replace('watch?v=', 'embed/') }
      />)}
    </div>
  );
}

CardDetail.propTypes = {
  dataDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  route: PropTypes.string.isRequired,
};

export default CardDetail;
