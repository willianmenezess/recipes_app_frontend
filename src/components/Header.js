import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
// import SearchBar from './SearchBar';

function Header({ title, searchIconToggle }) {
  const history = useHistory();
  const redirect = () => history.push('/profile');
  return (
    <header>
      {/* <section>
        <SearchBar />
      </section> */}
      <h1 data-testid="page-title">
        { title }
      </h1>
      <button
        src={ profileIcon }
        data-testid="profile-top-btn"
        onClick={ redirect }
      >
        <img src={ profileIcon } alt="profile icon" />
      </button>
      { searchIconToggle && (
        <button src={ searchIcon } data-testid="search-top-btn">
          <img src={ searchIcon } alt="search Icon" />
        </button>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchIconToggle: PropTypes.bool.isRequired,
};

export default Header;
