import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { waitForElementToBeRemoved } from '@testing-library/dom';
import renderWithRouter from './helpers/renderWithRouter';
// import { fetch } from '../../cypress/mocks/fetch';
import { responseRecipes, responseCategories } from './helpers/mocksApis';

// faz o mock das 4 fetchs que a tela Recipes faz
beforeEach(() => {
  // jest.spyOn(global, 'fetch').mockImplementation(fetch);
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(responseRecipes),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(responseRecipes),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(responseCategories),
  })
    .mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseCategories),
    });
});

describe('Teste da tela principal de receitas (Recipes), na rota /meals', () => {
  test('Verifica se a mensagem carregando é renderizada ao iniciar a página ', async () => {
    renderWithRouter('/meals');

    const loading = screen.getByText(/loading.../i);
    expect(loading).toBeInTheDocument();
  });

  test('Verifica se os botões de filtro p/ receitas de comidas são renderizados com as 5 primeiras categorias', async () => {
    renderWithRouter('/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
    // screen.debug();
    const allBtn = screen.getByRole('button', { name: /all/i });
    const beefBtn = screen.getByRole('button', { name: /beef/i });
    const numbersBtn = screen.getAllByRole('button');
    expect(numbersBtn.length).toBe(6);
    expect(allBtn).toBeInTheDocument();
    expect(beefBtn).toBeInTheDocument();

    // verifica se as 5 primeiras categorias de receitas de comida são renderizadas como botões
    responseCategories.meals.slice(0, 5).forEach((recipe) => {
      const categoryBtn = screen.getByRole('button', { name: recipe.strCategory });
      expect(categoryBtn).toBeInTheDocument();
    });
  });

  test('Verifica se as 12 primeiras receitas de comidas são renderizadas na tela', async () => {
    renderWithRouter('/meals');

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
    // verifica se as 12 primeiras receitas de comida são renderizadas na tela
    responseRecipes.meals.slice(0, 12).forEach((recipe, index) => {
      const recipeName = screen.getByTestId(`${index}-card-name`);
      const recipeImg = screen.getByTestId(`${index}-card-img`);
      expect(recipeName).toBeInTheDocument();
      expect(recipeName).toHaveTextContent(recipe.strMeal);
      expect(recipeImg).toBeInTheDocument();
      expect(recipeImg).toHaveAttribute('src', recipe.strMealThumb);
    });
  });
});

describe('Teste da tela principal de receitas (Recipes), na rota /drinks', () => {
  test('Verifica se a mensagem carregando é renderizada ao iniciar a página ', async () => {
    renderWithRouter('/drinks');

    const loading = screen.getByText(/loading.../i);
    expect(loading).toBeInTheDocument();
  });

  test('Verifica se os botões de filtro p/ receitas de bebidas são renderizados com as 5 primeiras categorias', async () => {
    renderWithRouter('/drinks');

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
    // screen.debug();
    const allBtn = screen.getByRole('button', { name: /all/i });
    const shakeBtn = screen.getByRole('button', { name: /shake/i });
    const numbersBtn = screen.getAllByRole('button');
    expect(numbersBtn.length).toBe(6);
    expect(allBtn).toBeInTheDocument();
    expect(shakeBtn).toBeInTheDocument();

    // verifica se as 5 primeiras categorias de bebidas são renderizadas como botões
    responseCategories.drinks.slice(0, 5).forEach((recipe) => {
      const categoryBtn = screen.getByRole('button', { name: recipe.strCategory });
      expect(categoryBtn).toBeInTheDocument();
    });
  });

  test('Verifica se as 12 primeiras receitas de bebidas são renderizadas na tela', async () => {
    renderWithRouter('/drinks');

    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
    responseRecipes.drinks.slice(0, 12).forEach((recipe, index) => {
      const recipeName = screen.getByTestId(`${index}-card-name`);
      const recipeImg = screen.getByTestId(`${index}-card-img`);
      expect(recipeName).toBeInTheDocument();
      expect(recipeName).toHaveTextContent(recipe.strDrink);
      expect(recipeImg).toBeInTheDocument();
      expect(recipeImg).toHaveAttribute('src', recipe.strDrinkThumb);
    });
  });
});
