import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import checkProfile from '../images/checkProfile.svg';
import favProfile from '../images/favProfile.svg';
import Footer from '../components/Footer';
import Header from '../components/Header';
import userProfile2 from '../images/userProfile2.svg';
import '../css/Profile.css';
import signOutProfile from '../images/signOutProfile.svg';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user')) || '';
  console.log(email);
  const history = useHistory();

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
      <Header title="Profile" searchIconToggle={ false } />
      <div className="container-icon-email">
        <img src={ userProfile2 } alt="user profile" className="icon-profile" />
        <p data-testid="profile-email">{ email.email }</p>
      </div>
      <body className="body-profile">
        <section className="container-btns-profile">
          <div className="container-done-profile">
            <img src={ checkProfile } alt="check profile" />
            <button
              data-testid="profile-done-btn"
              onClick={ gotoDone }
              className="btn-profile"
            >
              Done Recipes
            </button>
          </div>
          <div className="container-fav-profile">
            <img src={ favProfile } alt="favorite profile" />
            <button
              data-testid="profile-favorite-btn"
              onClick={ gotoFavorites }
              className="btn-profile"
            >
              Favorite Recipes
            </button>
          </div>
          <div className="container-signOut-profile">
            <img src={ signOutProfile } alt="sign out profile" />
            <button
              data-testid="profile-logout-btn"
              onClick={ gotoLogout }
              className="btn-profile"
            >
              Logout
            </button>
          </div>
        </section>
      </body>
      <Footer />
    </>
  );
}

export default Profile;
