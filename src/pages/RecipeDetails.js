import React, { useEffect, useContext, useCallback, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { AppContext } from '../contexts/AppProvider';
import CardDetail from '../components/CardDetail';

function RecipeDetails() {
  const [dataDetails, setDataDetails] = useState([{}]);
  const [dataRecomendations, setDataRecomendations] = useState([]);
  const { id } = useParams();
  const { pathname } = useLocation();

  const { fetchData } = useContext(AppContext);

  const fetchDetails = useCallback(async () => {
    const URL_DETAILS_MEAL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const URL_DETAILS_DRINK = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const URL_RECOMENDATIONS_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const URL_RECOMENDATIONS_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const NUMBER_RECOMENDATIONS = 6;
    if (pathname === `/meals/${id}`) {
      const dataDetailss = await fetchData(URL_DETAILS_MEAL);
      const dataRecomendationss = await fetchData(URL_RECOMENDATIONS_DRINK);
      setDataDetails(dataDetailss.meals[0]);
      setDataRecomendations(dataRecomendationss.drinks.slice(0, NUMBER_RECOMENDATIONS));
    }
    if (pathname === `/drinks/${id}`) {
      const dataDetailss = await fetchData(URL_DETAILS_DRINK);
      const dataRecomendationss = await fetchData(URL_RECOMENDATIONS_MEAL);
      setDataDetails(dataDetailss.drinks[0]);
      setDataRecomendations(dataRecomendationss.meals.slice(0, NUMBER_RECOMENDATIONS));
    }
  }, [fetchData, id, setDataDetails, pathname]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  console.log(dataDetails);

  return (
    <section>
      { pathname === `/meals/${id}` && (
        <CardDetail
          dataDetails={ dataDetails }
          route="meal"
          recomendations={ dataRecomendations }
        />
      )}
      { pathname === `/drinks/${id}` && (
        <CardDetail
          dataDetails={ dataDetails }
          route="drink"
          recomendations={ dataRecomendations }
        />
      )}
    </section>
  );
}
export default RecipeDetails;
