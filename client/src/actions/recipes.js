import * as actionTypes from './actionTypes';

export const fetchRecipesSuccess = ( payload ) => {
    return {
        type: actionTypes.FETCH_RECIPES_SUCCESS,
        payload
    };
};

export const fetchRecipesStart = () => {
    return {
        type: actionTypes.FETCH_RECIPES_START
    };
};

export const fetchRecipes = () => {
    return dispatch => {
        dispatch(fetchRecipesStart());
        fetch('/recipes')
            .then(data => data.json())
            .then(response => {
                const fetchedOrders = [];
                for (let key in response){
                    fetchedOrders.push({
                        ...response[key],
                        id: response[key]._id
                    })
                }
                dispatch(fetchRecipesSuccess(fetchedOrders));
            })
    };
};