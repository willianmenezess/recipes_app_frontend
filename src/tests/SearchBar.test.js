// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';

const meals = '/meals';
// const drink = '/drinks';
const searchButtonId = 'search-top-btn';
const inputMeals = 'search-input';
const mealsFirst = '0-card-name';

describe('Testando a cobertura do searchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  it('Testando se clicando no botão aparece o input de texto', async () => {
    renderWithRouter('/meals');
    const searchButton = await screen.findByTestId(searchButtonId);
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    const input = await screen.findByTestId(inputMeals);
    expect(input).toBeInTheDocument();
  });

  it('Testando se quando adciona ingrediente, a receita é renderizada', async () => {
    renderWithRouter(meals);
    await waitFor(() => {
      expect(screen.getByTestId(mealsFirst)).toHaveTextContent('Corba');
    });
  });
});
