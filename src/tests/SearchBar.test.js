import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';

const meals = '/meals';
const drinksUrl = '/drinks';
const searchButtonId = 'search-top-btn';
const inputMeals = 'search-input';
const inputRadio1 = 'ingredient-search-radio';
const inputRadio2 = 'name-search-radio';
const inputRadio3 = 'first-letter-search-radio';
const meals0 = '0-card-name';
const meals9 = '9-card-name';
const searchBtnId = 'exec-search-btn';

describe('Testes da página meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });
  it('Testando se quando adiciona ingrediente, a receita é renderizada', async () => {
    renderWithRouter(meals);
    await waitFor(() => {
      expect(screen.getByTestId(meals0)).toHaveTextContent('Corba');
    });

    const searchButton = screen.getByTestId(searchButtonId);
    userEvent.click(searchButton);

    const input = await screen.findByTestId(inputMeals);
    const ingredientInput = screen.getByTestId(inputRadio1);

    userEvent.type(input, 'Chicken');
    userEvent.click(ingredientInput);

    const searchBtn = screen.getByTestId(searchBtnId);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByTestId(meals0)).toHaveTextContent('Brown Stew Chicken');
      expect(screen.getByTestId(meals9)).toHaveTextContent('Thai Green Curry');
    });
  });

  it('Testando se quando pesquisa pelo nome, muda de rota', async () => {
    const { history } = renderWithRouter(meals);
    await waitFor(() => {
      expect(screen.getByTestId(meals0)).toHaveTextContent('Corba');
    });

    const searchButton = await screen.findByTestId(searchButtonId);
    userEvent.click(searchButton);

    const input = await screen.findByTestId(inputMeals);
    const ingredientInput = screen.getByTestId(inputRadio2);

    userEvent.type(input, 'Arrabiata');
    userEvent.click(ingredientInput);

    const searchBtn = screen.getByTestId(searchBtnId);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });
});

describe('Testes da página drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });
  it('Testando se quando adiciona ingrediente, a bebida é renderizada', async () => {
    renderWithRouter(drinksUrl);
    await waitFor(() => {
      expect(screen.getByTestId(meals0)).toHaveTextContent('GG');
    });

    const searchButton = await screen.findByTestId(searchButtonId);
    userEvent.click(searchButton);

    const input = await screen.findByTestId(inputMeals);
    const ingredientInput = screen.getByTestId(inputRadio1);

    userEvent.type(input, 'Light rum');
    userEvent.click(ingredientInput);

    const searchBtn = screen.getByTestId(searchBtnId);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByTestId(meals0)).toHaveTextContent('151 Florida Bushwacker');
      expect(screen.getByTestId(meals9)).toHaveTextContent('Between The Sheets');
    });
  });

  it('Testando se quando pesquisa pelo nome, muda de rota', async () => {
    const { history } = renderWithRouter(drinksUrl);
    await waitFor(() => {
      expect(screen.getByTestId(meals0)).toHaveTextContent('GG');
    });

    const searchButton = await screen.findByTestId(searchButtonId);
    userEvent.click(searchButton);

    const input = await screen.findByTestId(inputMeals);
    const ingredientInput = screen.getByTestId(inputRadio2);

    userEvent.type(input, 'Aquamarine');
    userEvent.click(ingredientInput);

    const searchBtn = screen.getByTestId(searchBtnId);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });
});

describe('Testes para mensagens de alert', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });
  it('Testando firstLetter', async () => {
    const alert = jest.spyOn(window, 'alert');
    renderWithRouter(drinksUrl);
    await waitFor(() => {
      expect(screen.getByTestId(meals0)).toHaveTextContent('GG');
    });

    const searchButton = await screen.findByTestId(searchButtonId);
    userEvent.click(searchButton);

    const input = await screen.findByTestId(inputMeals);
    const firstletterInput = screen.getByTestId(inputRadio3);

    userEvent.type(input, 'ar');
    userEvent.click(firstletterInput);

    const searchBtn = await screen.findByTestId(searchBtnId);
    userEvent.click(searchBtn);

    expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  it('Testando array inválido ', async () => {
    const alert = jest.spyOn(window, 'alert');
    renderWithRouter(meals);
    await waitFor(() => {
      expect(screen.getByTestId(meals0)).toHaveTextContent('Corba');
    });

    const searchButton = await screen.findByTestId(searchButtonId);
    userEvent.click(searchButton);

    const input = await screen.findByTestId(inputMeals);
    const nameInput = screen.getByTestId(inputRadio2);

    userEvent.type(input, 'xablau');
    userEvent.click(nameInput);

    const searchBtn = await screen.findByTestId(searchBtnId);
    userEvent.click(searchBtn);

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });
});