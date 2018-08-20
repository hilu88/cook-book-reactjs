import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import FullRecipe from './components/Recipes/FullRecipe/FullRecipe.component';
import Recipes from './components/Recipes/Recipes.component';
import RecipeControls from './components/Recipes/EditRecipe/EditRecipe.component';
import CreateRecipe from './components/Recipes/CreateRecipe/CreateRecipe.component';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/create-recipe" exact component={CreateRecipe}/>
                        <Route path="/recipe/:id" exact component={FullRecipe}/>
                        <Route path="/recipe/edit/:id" exact component={RecipeControls}/>
                        <Route path="/" exact component={Recipes}/>
                    </Switch>
                </Layout>
            </div>
        )
    }


}


export default withRouter( App );