import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core'

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/spinner';

import * as action  from '../../../actions/index';

import './EditRecipe.css';

class EditRecipe extends Component {
    state = {
        recipeForm: {
            title: {
                elementType: 'input',
                value: ''
            },
            description: {
                elementType: 'input',
                value: ''
            },
            ingredients: {
                elementType: 'input',
                value: ''
            },
            directions: {
                elementType: 'input',
                value: ''
            },
            cookTime: {
                elementType: 'input',
                value: ''
            },
            numberOfServings: {
                elementType: 'input',
                value: ''
            }
        }
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.onFetchRecipeInfo(id);
    }

    componentWillReceiveProps (props) {
        let {recipeForm} = this.state;
        const {fetchedRecipeInfo} = props;
        if(this.props.match.path === '/recipe/edit/:id') {
            for (let key in fetchedRecipeInfo) {
                if (recipeForm.hasOwnProperty(key)) {
                    recipeForm[key].value = fetchedRecipeInfo[key];
                }
            }
            this.setState(recipeForm)
        }
    }

    recipeEditHandler = ( event ) => {
        const id = this.props.match.params.id;
        const { recipeForm } = this.state;
        event.preventDefault();
        const formData = {};
        for ( let formElementIdentifier in recipeForm ) {
            formData[formElementIdentifier] = recipeForm[formElementIdentifier].value;
        }
        fetch('/recipe/edit/' + id, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                this.props.history.push('/');
            });
    };

    inputChangedHandler = (event, inputIdintifier) => {
        const { recipeForm } = this.state;
        const updatedRecipeForm = {
            ...recipeForm
        };
        const updatedFormElement = {
            ...updatedRecipeForm[inputIdintifier]
        };
        updatedFormElement.value = event.target.value;
        updatedRecipeForm[inputIdintifier] = updatedFormElement;
        this.setState({recipeForm: updatedRecipeForm});
    };

    returnTo = () => {
        const id = this.props.match.params.id;
        this.props.history.push('/recipe/' + id);
    };

    render() {
        const { recipeForm } = this.state;

        let action = 'loading...';
        let form = <Spinner />;
        let returnTo = null;

        const formElementsArray = [];
        for (let key in recipeForm){
            formElementsArray.push({
                id: key,
                config: recipeForm[key]
            })
        }

        action = (<p>Update recipe</p>);

        returnTo = (
            <Button
                variant='outlined'
                color="secondary"
                onClick={this.returnTo}>return to recipe</Button>
        );

        form = (
            <form onSubmit={this.recipeEditHandler}>
                {formElementsArray.map((formElement) => (
                    <Input
                        label={formElement.id}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button
                    fullWidth='true'
                    size='large'
                    variant='outlined'
                    color='primary'
                    type='submit'>Update</Button>
            </form>
        );


        return (
            <div className='Recipe-controls'>
                {action}
                {returnTo}
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        fetchedRecipeInfo: state.recipeInfo.recipe,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchRecipeInfo: ( id ) => dispatch( action.fetchRecipeInfo( id ) ),
        onDeleteRecipe: ( id ) => dispatch( action.deleteRecipe( id ) )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);