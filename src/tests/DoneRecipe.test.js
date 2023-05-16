import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import AppProvider from '../contexts/AppProvider';

const magicNumberDate = '15/05/2023';
const magicNumberZeroHorizontal = '0-horizontal-name';
const magicNumberOneHorizontal = '1-horizontal-name';
const linkCopied = 'URL Copied!';

const doneRecipesMock = [
  {
    id: '12345',
    type: 'meal',
    nationality: 'Mexican',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Taco Salad',
    image: 'https://www.example.com/images/taco-salad.jpg',
    doneDate: magicNumberDate,
    tags: ['Salad', 'Mexican'],
  },
  {
    id: '67890',
    type: 'drink',
    nationality: '',
    category: 'Mocktail',
    alcoholicOrNot: 'Non-Alcoholic',
    name: 'Berry Mocktail',
    image: 'https://www.example.com/images/berry-mocktail.jpg',
    doneDate: magicNumberDate,
    tags: [],
  },
];

describe('DoneRecipes page', () => {
  let history;

  beforeEach(async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));

    history = createMemoryHistory();
    const initialRoute = '/done-recipes';
    history.push(initialRoute);

    await act(async () => {
      render(
        <AppProvider>
          <Router history={ history }>
            <App />
          </Router>
        </AppProvider>,
      );
    });
  });

  it('renders the Meals attributes', () => {
    const image = screen.getByTestId('0-horizontal-image');
    const topText = screen.getByTestId('0-horizontal-top-text');
    const name = screen.getByTestId(magicNumberZeroHorizontal);
    const doneDate = screen.getByTestId('0-horizontal-done-date');
    const firstTag = screen.getByTestId('0-Salad-horizontal-tag');
    const secondTag = screen.getByTestId('0-Mexican-horizontal-tag');

    expect(image).toHaveAttribute('src', 'https://www.example.com/images/taco-salad.jpg');
    expect(topText).toHaveTextContent('Mexican - Vegetarian');
    expect(name).toHaveTextContent('Taco Salad');
    expect(doneDate).toHaveTextContent(magicNumberDate);
    expect(firstTag).toHaveTextContent('Salad');
    expect(secondTag).toHaveTextContent('Mexican');
  });

  it('renders the Drinks attributes', async () => {
    expect(screen.getByTestId('1-horizontal-image'))
      .toHaveAttribute('src', doneRecipesMock[1].image);
    expect(screen.getByTestId('1-horizontal-top-text'))
      .toHaveTextContent(doneRecipesMock[1].alcoholicOrNot);
    expect(screen.getByTestId(magicNumberOneHorizontal))
      .toHaveTextContent(doneRecipesMock[1].name);
    expect(screen.getByTestId('1-horizontal-share-btn'))
      .toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-done-date'))
      .toHaveTextContent(magicNumberDate);
  });

  it('copies the recipe URL to clipboard when share button is clicked', async () => {
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    userEvent.click(shareButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://localhost:3000/meals/12345',
      );
    });

    const linkCopiedElements = screen.getAllByText(linkCopied);
    expect(linkCopiedElements).toHaveLength(2);
  });

  it('filters recipes by "Meal" when the button is clicked', async () => {
    const filterByMealButton = screen.getByTestId('filter-by-meal-btn');

    userEvent.click(filterByMealButton);

    expect(screen.getByTestId(magicNumberZeroHorizontal))
      .toHaveTextContent(doneRecipesMock[0].name);
    expect(screen.queryByTestId(magicNumberOneHorizontal)).toBeNull();
  });

  it('filters recipes by "Drinks" when the button is clicked', async () => {
    const filterByDrinkButton = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(filterByDrinkButton);

    expect(screen.getByTestId(magicNumberZeroHorizontal))
      .toHaveTextContent(doneRecipesMock[1].name);
    expect(screen.queryByTestId(magicNumberOneHorizontal)).toBeNull();
  });

  it('removes the filter when the "All" button is clicked', async () => {
    const filterByMealButton = screen.getByTestId('filter-by-meal-btn');
    const filterByAllButton = screen.getByTestId('filter-by-all-btn');

    userEvent.click(filterByMealButton);
    userEvent.click(filterByAllButton);

    expect(screen.getByTestId(magicNumberZeroHorizontal))
      .toHaveTextContent(doneRecipesMock[0].name);
    expect(screen.getByTestId(magicNumberOneHorizontal))
      .toHaveTextContent(doneRecipesMock[1].name);
  });

  it('navigates to the recipe details page when the recipe image is clicked', () => {
    const image = screen.getByTestId('0-horizontal-image');
    userEvent.click(image);

    expect(history.location.pathname).toBe('/meals/12345');
  });

  it('navigates to the recipe details page when the recipe name is clicked', () => {
    const name = screen.getByTestId(magicNumberOneHorizontal);
    userEvent.click(name);

    expect(history.location.pathname).toBe('/drinks/67890');
  });

  it('copies the correct URL when the share button of a meal is clicked', async () => {
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    userEvent.click(shareButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://localhost:3000/meals/12345',
      );
    });

    const linkCopiedElements = screen.getAllByText(linkCopied);
    expect(linkCopiedElements).toHaveLength(2);
  });

  it('copies the correct URL when the share button of a drink is clicked', async () => {
    const shareButton = screen.getByTestId('1-horizontal-share-btn');
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    userEvent.click(shareButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://localhost:3000/drinks/67890',
      );
    });

    const linkCopiedElements = screen.getAllByText(linkCopied);
    expect(linkCopiedElements).toHaveLength(2);
  });
});
