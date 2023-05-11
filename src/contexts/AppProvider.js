import React, { useState, useMemo, createContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const AppContext = createContext();

function AppProvider({ children }) {
  const [initialDataMeals, setInitialDataMeals] = useState([]);
  const [initialDataDrinks, setInitialDataDrinks] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [categoriesMeals, setCategoriesMeals] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [wasClicked, setWasClicked] = useState(false);

  const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const CATEGORIES_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const CATEGORIES_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const { fetchData, error, isLoading } = useFetch();

  const allFetchsRecipes = useCallback(async () => {
    const fetchDataMeals = await fetchData(URL_MEALS);
    const fetchDataDrinks = await fetchData(URL_DRINKS);
    setDataMeals(fetchDataMeals.meals);
    setInitialDataMeals(fetchDataMeals.meals);
    setDataDrinks(fetchDataDrinks.drinks);
    setInitialDataDrinks(fetchDataDrinks.drinks);
    const categMeals = await fetchData(CATEGORIES_MEALS);
    setCategoriesMeals(categMeals.meals);
    const categDrinks = await fetchData(CATEGORIES_DRINKS);
    setCategoriesDrinks(categDrinks.drinks);
  }, [fetchData]);

  const filterAllCategories = useCallback(async () => {
    setDataMeals(initialDataMeals);
    setDataDrinks(initialDataDrinks);
  }, [initialDataMeals, initialDataDrinks]);

  const filterByCategory = useCallback(async (category, pathname) => {
    const URL_MEALS_CATEGORY = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const URL_DRINKS_CATEGORY = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    if (pathname === '/meals') {
      const fetchFilterCategoryMeal = await fetchData(URL_MEALS_CATEGORY);
      setDataMeals(fetchFilterCategoryMeal.meals);
    } else if (pathname === '/drinks') {
      const fetchFilterCategoryDrink = await fetchData(URL_DRINKS_CATEGORY);
      setDataDrinks(fetchFilterCategoryDrink.drinks);
    }
  }, [fetchData]);

  const values = useMemo(() => ({
    dataMeals,
    dataDrinks,
    error,
    isLoading,
    categoriesMeals,
    categoriesDrinks,
    allFetchsRecipes,
    filterByCategory,
    initialDataMeals,
    initialDataDrinks,
    filterAllCategories,
    fetchData,
    wasClicked,
    setWasClicked,
  }), [dataMeals, dataDrinks, error, isLoading,
    categoriesMeals, categoriesDrinks, allFetchsRecipes, filterByCategory,
    initialDataMeals, initialDataDrinks, filterAllCategories, fetchData, wasClicked]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
