import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';

const meals = '/meals';
const profileButtonId = 'profile-top-btn';
const meals0 = '0-card-name';

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
