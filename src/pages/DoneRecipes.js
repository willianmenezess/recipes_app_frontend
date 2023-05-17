import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Header from '../components/Header';
import '../css/DoneRecipes.css';
import drinkIconSvg from '../images/drinkIcon.svg';
import mealIconSvg from '../images/mealIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [completedRecipes, setCompletedRecipes] = useState([]);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (savedRecipes) {
      setCompletedRecipes(savedRecipes);
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

  const filteredRecipes = completedRecipes.filter((recipe) => {
    if (filter === 'all') {
      return true;
    }
    return recipe.type === filter;
  });

  return (
    <>
      <Header title="Done Recipes" iconProfile iconSearch={ false } />

      <div
        className="done-recipes-buttons-container"
      >
        <div>
          <img src={ mealIconSvg } alt="" />
          <br />
          <button
            data-testid="filter-by-all-btn"
            onClick={ () => filterRecipes('all') }
          >
            All
          </button>
        </div>
        <div>
          <img src={ mealIconSvg } alt="" />
          <br />
          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => filterRecipes('meal') }
          >
            Meals
          </button>
        </div>
        <div>
          <img src={ drinkIconSvg } alt="" />
          <br />
          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => filterRecipes('drink') }
          >
            Drinks
          </button>
        </div>
        <div />
      </div>
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
                    : `${recipe.nationality} - ${recipe.category} 
                    - ${recipe.alcoholicOrNot}`}
                </p>
                <p
                  className="done-recipes-date"
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipe.doneDate}
                </p>
                {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    className="done-recipes-tag"
                    key={ `${index}-${tagIndex}` }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DoneRecipes;
