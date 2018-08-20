import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as action from '../../actions/index';
import Recipe from './Recipe/Recipe.component';
import Spinner from '../UI/Spinner/spinner';

import './Recipes.css';

class Recipes extends Component {
    componentDidMount() {
        const { onFetchRecipes } = this.props;
        onFetchRecipes();
    }

    showRecipeHandler = ( id ) => {
        this.props.history.push('/recipe/' + id);
    };

    editRecipeHandler = ( id ) => {
        this.props.history.push('/recipe/edit/' + id);
    };

    deleteRecipeHandler = ( id ) => {
        const { onDeleteRecipe } = this.props;
        onDeleteRecipe( id );
        window.location.reload();
    };

    render() {
        const { loading, fetchedRecipes } = this.props;

        let recipes = <Spinner />;
        if( !loading ){
            recipes = fetchedRecipes.map((recipe) => {
                return (
                    <Recipe
                        key={recipe.id}
                        id={recipe.id}
                        recipe={recipe}
                        fullRecipe={this.showRecipeHandler}
                        editRecipe={this.editRecipeHandler}
                        deleteRecipe={this.deleteRecipeHandler}/>
                );
            })
        }

        return (
            <div className='main'>
                {recipes}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        fetchedRecipes: state.recipes.recipe,
        loading: state.recipes.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchRecipes: () => dispatch( action.fetchRecipes() ),
        onDeleteRecipe: ( id ) => dispatch( action.deleteRecipe( id ) )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);