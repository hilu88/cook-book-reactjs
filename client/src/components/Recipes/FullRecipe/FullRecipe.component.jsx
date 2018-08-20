import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as action from '../../../actions/index';

import FullRecipeInfo from './FullRecipeInfo/FullRecipeInfo.component';
import Spinner from '../../UI/Spinner/spinner';

class FullRecipe extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.onFetchRecipeInfo( id );
    }

    editRecipeHandler = () => {
        const id = this.props.match.params.id;
        this.props.history.push('/recipe/edit/' + id);
    };

    deleteRecipeHandler = ( id ) => {
        this.props.onDeleteRecipe( id );
        this.props.history.push('/');
    };

    render () {
        let recipe = <Spinner />;

        if( !this.props.loading ){
            recipe = (
                <FullRecipeInfo
                    info={this.props.fetchedRecipeInfo}
                    editRecipe={this.editRecipeHandler}
                    deleteRecipe={this.deleteRecipeHandler}/>
            );
        }

        return (
            <div>
                {recipe}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetchedRecipeInfo: state.recipeInfo.recipe,
        loading: state.recipeInfo.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchRecipeInfo: ( id ) => dispatch( action.fetchRecipeInfo( id ) ),
        onDeleteRecipe: ( id ) => dispatch( action.deleteRecipe( id ) )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FullRecipe);