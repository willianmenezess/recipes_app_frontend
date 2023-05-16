import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
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

  const navigateToDetails = (recipeType, recipeId) => {
    window.location
      .pathname = `${recipeType === 'meal' ? 'meals' : 'drinks'}/${recipeId}`;
  };

  return (
    <>
      <Header title="Done Recipes" iconProfile iconSearch={ false } />

      <div>
        <div>
          <button
            data-testid="filter-by-all-btn"
            onClick={ () => filterRecipes('all') }
          >
            All
          </button>

          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => filterRecipes('meal') }
          >
            Meals
          </button>

          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => filterRecipes('drink') }
          >
            Drinks
          </button>
        </div>

        {filteredRecipes.map((recipe, index) => (
          <div key={ index }>
            <button
              type="button"
              onClick={ () => navigateToDetails(recipe.type, recipe.id) }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                width="150px"
                data-testid={ `${index}-horizontal-image` }
              />
            </button>

            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </p>

            <button
              type="button"
              onClick={ () => navigateToDetails(recipe.type, recipe.id) }
            >
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </button>

            <p data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </p>

            <button
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => shareRecipe(recipe.id, recipe.type) }
            >
              <img src={ shareIcon } alt="share-button" />
            </button>

            {copied && <span>Link copied!</span>}

            {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
              <span
                key={ `${index}-${tagIndex}` }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default DoneRecipes;
