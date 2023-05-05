import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <section>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id-da-receita" component={ RecipeDetails } />
        <Route exact path="/drinks/:id-da-receita" component={ RecipeDetails } />
        <Route
          exact
          path="/meals/:id-da-receita/in-progress"
          component={ RecipeInProgress.js }
        />
        <Route
          exact
          path="/drinks/:id-da-receita/in-progress"
          component={ RecipeInProgress.js }
        />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/profile" component={ Profile } />
      </Switch>
    </section>
  );
}

export default App;
// primeiro commit
