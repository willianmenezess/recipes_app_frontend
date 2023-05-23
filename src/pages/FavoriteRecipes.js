import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Header from '../components/Header';
import bowlIcon from '../images/bowl-food.svg';
import cupDrink from '../images/cupDrink.svg';
import forkKinife from '../images/forkKinife.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [favoritesRecipes, setFavoritesRecipes] = useState([]);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (savedFavRecipes) {
      setFavoritesRecipes(savedFavRecipes);
    }
  }, []);

  const shareRecipe = (recipeId, recipeType) => {
    const url = `http://localhost:3000/${recipeType === 'meal' ? 'meals' : 'drinks'}/${recipeId}`;
    copy(url);
    setCopied(true);
  };

  const filterRecipes = (filterType) => {
    setFilter(filterType);
  };

  const filteredRecipes = favoritesRecipes.filter((recipe) => {
    if (filter === 'all') {
      return true;
    }
    return recipe.type === filter;
  });
  return (
    <>
      <Header title="Favorite Recipes" searchIconToggle={ false } />
      <div className="done-recipes-buttons-container">
        <div>
          <img src={ bowlIcon } alt="" className="imageIcon" />
          <br />
          <button
            data-testid="filter-by-all-btn"
            onClick={ () => filterRecipes('all') }
            className="done-recipes-button"
          >
            All
          </button>
        </div>
        <div>
          <img src={ forkKinife } alt="" className="imageIcon" />
          <br />
          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => filterRecipes('meal') }
            className="done-recipes-button"
          >
            Meals
          </button>
        </div>
        <div>
          <img src={ cupDrink } alt="" className="imageIcon" />
          <br />
          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => filterRecipes('drink') }
            className="done-recipes-button"
          >
            Drinks
          </button>
        </div>
        <div />
      </div>
      <section>
        <div
          className="done-recipes-container"
        >
          {filteredRecipes.map((recipe, index) => (
            <div
              className="done-recipes-card"
              key={ index }
            >
              <a href={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  className="done-recipes-image"
                  data-testid={ `${index}-horizontal-image` }
                />
              </a>
              <div
                className="done-recipes-text-container"
              >
                <div
                  className="done-recipes-title-container"
                >
                  <Link
                    style={ { textDecoration: 'none', color: 'black' } }
                    to={ `/${recipe.type}s/${recipe.id}` }
                  >
                    <h3
                      className="done-recipes-title"
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {recipe.name}
                    </h3>
                  </Link>
                  <button
                    type="button"
                    className="share-btn"
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    onClick={ () => shareRecipe(recipe.id, recipe.type) }
                  >
                    <img src={ shareIcon } alt="share-button" />
                  </button>

                  {copied && <span>Link copied!</span>}
                </div>
                <div
                  className="done-recipes-category-container"
                >
                  <p
                    className="done-recipes-category"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.type === 'meal'
                      ? `${recipe.nationality} - ${recipe.category}`
                      : `${recipe.category} 
                    - ${recipe.alcoholicOrNot} - ${recipe.nationality}`}
                  </p>
                  <p
                    className="done-recipes-date"
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {recipe.doneDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default FavoriteRecipes;
