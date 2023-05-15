import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom/cjs/react-router-dom';
import React from 'react';
import { createMemoryHistory } from 'history';
import Profile from '../pages/Profile';

import renderWithRouter from './helpers/renderWithRouter';

const dataEmail = 'profile-email';
const dataDone = 'profile-done-btn';
const dataFavorite = 'profile-favorite-btn';
const dataLogout = 'profile-logout-btn';
describe('Teste da tela de Profile', () => {
  test('Verifica se a tela de profile tem elementos com data-testids', async () => {
    renderWithRouter('/profile');

    const emailProfile = await screen.findByTestId(dataEmail);
    const buttonDone = screen.getByTestId(dataDone);
    const buttonFavorite = screen.getByTestId(dataFavorite);
    const buttonLogout = screen.getByTestId(dataLogout);

    expect(emailProfile).toBeInTheDocument();
    expect(buttonDone).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();
    expect(buttonLogout).toBeInTheDocument();
  });

  test('Verifica se ao clicar nos botões é feito o redirecionamento correto', async () => {
    const { history } = renderWithRouter('/profile');

    const buttonDone = await screen.findByTestId(dataDone);

    expect(buttonDone).toBeInTheDocument();

    userEvent.click(buttonDone);
    expect(history.location.pathname).toBe('/done-recipes');

    const profileButton1 = screen.getByRole('img', { name: /profile icon/i });
    userEvent.click(profileButton1);

    userEvent.click(screen.getByTestId(dataFavorite));
    expect(history.location.pathname).toBe('/favorite-recipes');

    userEvent.click(screen.getByRole('img', { name: /profile icon/i }));
    const buttonLogout = screen.getByTestId(dataLogout);
    userEvent.click(buttonLogout);
    expect(history.location.pathname).toBe('/');
  });
  test('renderiza o email do usuário', () => {
    const { getByTestId } = render(<Profile />);
    expect(getByTestId(dataEmail)).toHaveTextContent('email@mail.com');
  });

  test('redireciona para a página de receitas concluídas', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const buttonDone = getByTestId(dataDone);
    fireEvent.click(buttonDone);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('redireciona para a página de receitas favoritas', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const buttonFavorite = getByTestId(dataFavorite);
    fireEvent.click(buttonFavorite);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('faz logout do usuário', () => {
    const history = createMemoryHistory();
    localStorage.setItem('email', 'email@mail.com');
    const { getByTestId } = render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const buttonLogout = getByTestId(dataLogout);
    fireEvent.click(buttonLogout);
    expect(history.location.pathname).toBe('/');
    expect(localStorage.getItem('email')).toBe(null);
  });
});
