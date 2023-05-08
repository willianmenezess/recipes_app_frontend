import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Recipes() {
  const { pathname } = useLocation();
  const title = pathname === '/meals' ? 'Meals' : 'Drinks';
  return (
    <>
      <div>Recipes</div>
      <Header title={ title } searchIconToggle />
      <Footer />
    </>

  );
}

export default Recipes;
