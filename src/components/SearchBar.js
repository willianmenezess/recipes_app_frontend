import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../contexts/AppProvider';
import { searchBarDrinks, searchBarMeals } from '../services/fetchApi';
import '../css/SearchBar.css';

function SearchBar() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const history = useHistory();
  const { location } = history;
  const { setDataMeals, setDataDrinks } = useContext(AppContext);

  const redirectionRoute = (data, id) => {
    history.push(`${location.pathname}/${[id]}`);
  };
  const fetchApi = async () => {
    let data = {};
    if (location.pathname === '/meals') {
      data = await searchBarMeals(text, search);
      if (data.meals === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      if (data.meals.length === 1 && data.meals !== null) {
        redirectionRoute(data.meals, data.meals[0].idMeal);
      }
      setDataMeals(data.meals);
    } if (location.pathname === '/drinks') {
      data = await searchBarDrinks(text, search);
      if (data.drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        // handleArray(data.drinks, 'idDrink');
        return;
      }
      if (data.drinks.length === 1 && data.drinks !== null) {
        redirectionRoute(data.drinks, data.drinks[0].idDrink);
      }
      setDataDrinks(data.drinks);
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
    <form className="search-bar-form" onSubmit={ handleSearch }>
      <input
        placeholder="Search"
        className="input-search"
        data-testid="search-input"
        type="text"
        value={ text }
        onChange={ ({ target }) => setText(target.value) }
      />
      <div className="container-radius-search">
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
      </div>
      <button
        className="search-btn"
        data-testid="exec-search-btn"
        type="submit"
        disabled={ search === '' }
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
