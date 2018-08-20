import * as actionTypes from './actionTypes';

export const fetchRecipeInfoSuccess = ( payload ) => {
    return {
        type: actionTypes.FETCH_RECIPE_INFO_SUCCESS,
        payload
    };
};

export const fetchRecipeInfoStart = () => {
    return {
        type: actionTypes.FETCH_RECIPE_INFO_START
    };
};

export const fetchRecipeInfo = ( id ) => {
    return dispatch => {
        dispatch(fetchRecipeInfoStart());
        fetch('/recipes/' + id)
            .then(data => data.json())
            .then(response => {
                dispatch(fetchRecipeInfoSuccess(response));
            })
    };
};

export const deleteRecipeStart = () => {
    return {
        type: actionTypes.DELETE_RECIPE
    };
};

export const deleteRecipe = ( id ) => {
    return dispatch => {
        dispatch(deleteRecipeStart());
        fetch('/recipes/' + id, { method: 'delete' })
            .then(data => data.json())
            .then(response => {
                console.log('deleted');
            });
    }
};