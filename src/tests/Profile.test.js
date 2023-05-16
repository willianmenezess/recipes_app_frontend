import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Profile from '../pages/Profile';

describe('Profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'email@mail.com' }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('displays user email', () => {
    render(<Profile />);
    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement.textContent).toBe('email@mail.com');
  });

  test('redirects to Done Recipes page when Done Recipes button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const doneBtn = screen.getByTestId('profile-done-btn');
    fireEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('redirects to Favorite Recipes page when Favorite Recipes button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const favBtn = screen.getByTestId('profile-favorite-btn');
    fireEvent.click(favBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('clears local storage and redirects to Home page when Logout button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    fireEvent.click(logoutBtn);
    expect(localStorage.getItem('user')).toBeNull();
    expect(history.location.pathname).toBe('/');
  });
});
