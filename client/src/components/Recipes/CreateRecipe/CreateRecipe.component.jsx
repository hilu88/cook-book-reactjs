import React, { Component } from 'react';
import { Button } from '@material-ui/core'

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/spinner';

import './CreateRecipe.css';

class CreateRecipe extends Component {
    state = {
        recipeForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'title',
                    placeholder: 'Recipe title'
                },
                value: ''
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'description',
                    placeholder: 'Description'
                },
                value: ''
            },
            ingredients: {
                elementType: 'input',
                elementConfig: {
                    type: 'ingredients',
                    placeholder: 'Ingredients'
                },
                value: ''
            },
            directions: {
                elementType: 'input',
                elementConfig: {
                    type: 'directions',
                    placeholder: 'Directions'
                },
                value: ''
            },
            cookTime: {
                elementType: 'input',
                elementConfig: {
                    type: 'cookTime',
                    placeholder: 'Cooking time'
                },
                value: ''
            },
            numberOfServings: {
                elementType: 'input',
                elementConfig: {
                    type: 'numberOfServings',
                    placeholder: 'Number of Servings'
                },
                value: ''
            }
        }
    };

    recipeHandler = ( event ) => {
        const { recipeForm, selectedFile } = this.state;
        event.preventDefault();
        const formData = {};
        for ( let formElementIdentifier in recipeForm ) {
            formData[formElementIdentifier] = recipeForm[formElementIdentifier].value;
        }
        formData['image'] = selectedFile;
        fetch('/new-recipe', {
            method: "POST",
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

    render(){
        const { recipeForm } = this.state;

        let action = 'loading...';
        let form = <Spinner />;

        const formElementsArray = [];
        for (let key in recipeForm){
            formElementsArray.push({
                id: key,
                config: recipeForm[key]
            })
        }

        action = (<p>Create new recipe</p>);

        form = (
            <form onSubmit={this.recipeHandler}>
                {formElementsArray.map((formElement) => (
                    <Input
                        key={formElement.id}
                        label={formElement.id}
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
                    type='submit'>Create</Button>
            </form>
        );

        return (
            <div className='Recipe-controls'>
                {action}
                {form}
            </div>
        )
    }
}

export default CreateRecipe;