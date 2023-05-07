import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import Footer from '../components/Footer';

describe('Componente Footer', () => {
  test('Testa a renderização do componente Footer', () => {
    const { getByTestId } = render(<Footer />);
    const footerElement = getByTestId('footer');

    expect(footerElement).toBeInTheDocument();
  });

  test('Testa se quando clicar no ícone bebidas é levado para a páginda de bebidas', () => {
    // É criado uma memória de history, simulando uma rota, e renderiza o componente.
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );

    const drinksBtn = getByTestId('drinks-bottom-btn');
    fireEvent.click(drinksBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  test('Testa se quando clicar no ícone de comidas é enviado para a página de comidas', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );

    const mealsBtn = getByTestId('meals-bottom-btn');
    fireEvent.click(mealsBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
