import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../contexts/AppProvider';
import { searchBarDrinks, searchBarMeals } from '../services/fetchApi';

function SearchBar() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const history = useHistory();
  const { location } = history;
  const { setDataMeals, setDataDrinks } = useContext(AppContext);
  // setDataMeals, setDataDrinks colocar no usememo do AppProvider

  const handleArray = (data, id) => {
    if (data === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (data.length === 1) {
      history.push(`${location.pathname}/${data[0][id]}`);
    } else if (location.pathname === '/meals') {
      setDataMeals(data);
    } else {
      setDataDrinks(data);
    }
  };

  const fetchApi = async () => {
    let data = {};
    if (location.pathname === '/meals') {
      data = await searchBarMeals(text, search);
      handleArray(data.meals, 'idMeal');
    } else {
      data = await searchBarDrinks(text, search);
      handleArray(data.drinks, 'idDrink');
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (search === 'firstLetter' && text.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    fetchApi();
  };

  return (
    <div>
      <form onSubmit={ handleSearch }>
        <input
          data-testid="search-input"
          type="text"
          value={ text }
          onChange={ ({ target }) => setText(target.value) }
        />
        <label htmlFor="ingredient">
          <input
            // defaultChecked
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            name="selectFilter"
            value="ingredient"
            onChange={ ({ target }) => setSearch(target.value) }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
            name="selectFilter"
            value="name"
            onChange={ ({ target }) => setSearch(target.value) }
          />
          Name
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            name="selectFilter"
            value="firstLetter"
            onChange={ ({ target }) => setSearch(target.value) }
          />
          First Letter
        </label>
        <button
          data-testid="exec-search-btn"
          type="submit"
          disabled={ search === '' }
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
