import React from 'react';

function SearchBar() {
  const handleClick = (event) => {
    event.preventDefault();
    console.log('oi');
  };
  return (
    <div>
      Search Bar
      <form>
        <input
          data-testid="search-input"
          type="text"
        />
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            name="selectFilter"
            value="ingredient"
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
            name="selectFilter"
            value="name"
          />
        </label>
        <label htmlFor="firstLetter">
          First Letter
          <input
            type="radio"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            name="selectFilter"
            value="firstLetter"
          />
        </label>
        <button
          data-testid="exec-search-btn"
          type="submit"
          onClick={ () => handleClick }
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
