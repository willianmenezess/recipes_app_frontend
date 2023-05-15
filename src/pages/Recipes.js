import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MealCard from '../components/MealCard';
import DrinkCard from '../components/DrinkCard';
import { AppContext } from '../contexts/AppProvider';
import ButtonCategory from '../components/ButtonCategory';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Recipes() {
  const { pathname } = useLocation();
  const { dataMeals, dataDrinks, isLoading, categoriesMeals,
    categoriesDrinks, allFetchsRecipes, filterAllCategories } = useContext(AppContext);
  const title = pathname === '/meals' ? 'Meals' : 'Drinks';

  useEffect(() => {
    allFetchsRecipes(pathname);
  }, [allFetchsRecipes]);

  const NUMBER_MAX = 12;
  const NUMBER_MAX_CATEGORIES = 5;
  const dataMeals12 = dataMeals.slice(0, NUMBER_MAX);
  const dataDrinks12 = dataDrinks.slice(0, NUMBER_MAX);
  const categoriesMeals5 = categoriesMeals.slice(0, NUMBER_MAX_CATEGORIES);
  const categoriesDrinks5 = categoriesDrinks.slice(0, NUMBER_MAX_CATEGORIES);

  const styleContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
  };

  return (
    <section>
      <Header title={ title } searchIconToggle />
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ filterAllCategories }
        >
          All
        </button>
        {!isLoading && (
          pathname === '/meals' && categoriesMeals5.map((categoryM) => (
            <ButtonCategory
              key={ categoryM.strCategory }
              category={ categoryM.strCategory }
            />
          ))
        )}

        {!isLoading && (
          pathname === '/drinks' && categoriesDrinks5.map((categoryD) => (
            <ButtonCategory
              key={ categoryD.strCategory }
              category={ categoryD.strCategory }
            />
          ))
        )}
      </section>

      <section style={ styleContainer }>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          pathname === '/meals' && dataMeals12.map((meal, index) => (
            <MealCard key={ meal.idMeal } meal={ meal } index={ index } />
          ))
        )}
        {!isLoading && (
          pathname === '/drinks' && dataDrinks12.map((drink, index) => (
            <DrinkCard key={ drink.idDrink } drink={ drink } index={ index } />
          ))
        )}
      </section>
      <Footer />
    </section>
  );
}

export default Recipes;
