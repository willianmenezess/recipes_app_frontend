import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { waitForElementToBeRemoved } from '@testing-library/dom';
import renderWithRouter from './helpers/renderWithRouter';
import { dataDetailsRecipe, responseRecipes } from './helpers/mocksApis';

// faz o mock das 4 fetchs que a tela Recipes faz
beforeEach(() => {
  // jest.spyOn(global, 'fetch').mockImplementation(fetch);
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(dataDetailsRecipe),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(dataDetailsRecipe),
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(responseRecipes),
  })
    .mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseRecipes),
    });
});

describe('Realize uma request para a API passando o `id` da receita que deve estar disponível nos parâmetros da URL', () => {
  test('Verifica se a requisição para a API de bebidas foi realizada', async () => {
    renderWithRouter('/drinks/17222/in-progress');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222');
  });
  test('Verifica se a requisição para a API de comidas foi realizada', async () => {
    renderWithRouter('/meals/53060/in-progress');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53060');
  });
});

describe('Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes com suas respectivas quantidades e instruções', () => {
  test('Verifica se os elementos existem na tela de detalhes da bebida mockada "A1"', async () => {
    renderWithRouter('/drinks/17222/in-progress');
    const recipeA1Img = await screen.findByRole('img', { name: /a1/i });
    const recipeA1Name = screen.getByRole('heading', { name: /a1/i });
    const recipeA1IngredientsTitle = screen.getByRole('heading', { name: /ingredients/i });
    const recipeA1Ingredients = screen.getAllByTestId(/ingredient/i);
    const instructionsTitle = screen.getByRole('heading', { name: /instructions/i });
    const instructions = screen.getByText(/pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass\./i);
    const recomendationsTitle = screen.getByRole('heading', { name: /recomendations/i });
    const recomendations = screen.getAllByTestId(/recommendation-card/i);
    const startRecipeBtn = screen.getByRole('button', { name: /start recipe/i });
    const shareBtn = screen.getByRole('button', { name: /share/i });
    const favoriteBtn = screen.getByRole('button', { name: /favorite/i });
    expect(recipeA1Img).toBeInTheDocument();
    expect(recipeA1Name).toBeInTheDocument();
    expect(recipeA1IngredientsTitle).toBeInTheDocument();
    expect(recipeA1Ingredients.length).toBe(4);
    expect(instructionsTitle).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(recomendationsTitle).toBeInTheDocument();
    expect(recomendations.length).toBe(1);
    expect(startRecipeBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
  });
});
