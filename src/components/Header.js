import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../css/Header.css';
import cookingIcon from '../images/cookingIcon.svg';
import forkKinife from '../images/forkKinife.svg';
import cupDrink from '../images/cupDrink.svg';

function Header({ title, searchIconToggle }) {
  const history = useHistory();
  const redirect = () => history.push('/profile');
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  return (
    <header className="header">
      <div className="header-buttons">
        <div className="title-container">
          <img alt="cooking-icon" src={ cookingIcon } />
          <p>
            RECIPES
            {' '}
            <span>app</span>
          </p>
        </div>
        <div className="buttons-container">
          <button
            onClick={ redirect }
          >
            <img data-testid="profile-top-btn" src={ profileIcon } alt="profile icon" />
          </button>
          { searchIconToggle && (
            <button
              onClick={ () => setToggleSearchBar(!toggleSearchBar) }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="search Icon" />
            </button>
          )}
        </div>
      </div>
      <div className="fork-kinife">
        <div className="icon-recipe">
          { title === 'Meals'
            ? (
              <img
                alt="fork-kinife"
                src={ forkKinife }
              />
            )
            : (
              <img
                alt="cup-drink"
                src={ cupDrink }
              />
            ) }
        </div>
      </div>
      <h1 data-testid="page-title">
        { title }
      </h1>

      {
        toggleSearchBar && (
          <SearchBar />
        )
      }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchIconToggle: PropTypes.bool.isRequired,
};

export default Header;
