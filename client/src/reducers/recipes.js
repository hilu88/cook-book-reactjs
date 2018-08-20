import * as actionTypes from '../actions/actionTypes';

const initialState = {
    recipe: [],
    loading: false
};

const fetchRecipesStart = ( state ) => {
    return {
        ...state,
        loading: true
    };
};

const fetchRecipesSuccess = ( state, action ) => {
    return {
        ...state,
        recipe: action.payload,
        loading: false
    };
};

const reducer = ( state = initialState , action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_RECIPES_START: return fetchRecipesStart( state, action );
        case actionTypes.FETCH_RECIPES_SUCCESS: return fetchRecipesSuccess( state, action );
        default: return state;
    }
};

export default reducer;