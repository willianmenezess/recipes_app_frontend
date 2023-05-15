// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { drinks } from '../../cypress/mocks/drinks';
// import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';

const meals = '/meals';
const drinksUrl = '/drinks';
const profileButtonId = 'profile-top-btn';
const inputMeals = 'search-input';
const inputRadio1 = 'ingredient-search-radio';
const inputRadio2 = 'name-search-radio';
const inputRadio3 = 'first-letter-search-radio';
const meals0 = '0-card-name';
const meals9 = '9-card-name';
const searchBtnId = 'exec-search-btn';

describe('Testando a cobertura do Header', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  it('Testando se muda para a rota profile', async () => {
    const { history } = renderWithRouter(meals);
    await waitFor(() => {
      expect(screen.getByTestId(meals0)).toHaveTextContent('Corba');
    });

    const profileButton = screen.getByTestId(profileButtonId);
    userEvent.click(profileButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/profile');
    });
  });
});
