import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const email = 'email@mail.com';
  const history = useHistory();

  const saveLocal = () => {
    localStorage.setItem('email', email);
  };
  useEffect(() => { saveLocal(); }, []);

  const gotoDone = () => {
    history.push('/done-recipes');
  };

  const gotoFavorites = () => {
    history.push('/favorite-recipes');
  };

  const gotoLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <>
      <div>Profile</div>
      <Header title="Profile" searchIconToggle={ false } />
      <body>
        <p data-testid="profile-email">{ email }</p>
        <button
          data-testid="profile-done-btn"
          onClick={ gotoDone }
        >
          Done Recipes

        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ gotoFavorites }
        >
          Favorite Recipes

        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ gotoLogout }
        >
          Logout

        </button>
      </body>
      <Footer />
    </>
  );
}

export default Profile;
