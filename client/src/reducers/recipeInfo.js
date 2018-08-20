import * as actionTypes from '../actions/actionTypes';

const initialState = {
    recipe: [],
    loading: false
};


const fetchRecipeInfoStart = ( state ) => {
    return {
        ...state,
        loading: true
    };
};

const fetchRecipeInfoSuccess = ( state, action ) => {
    return {
        ...state,
        recipe: action.payload,
        loading: false
    };
};

const deleteRecipeStart = ( state ) => {
    return {
        ...state
    };
};


const reducer = ( state = initialState , action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_RECIPE_INFO_START: return fetchRecipeInfoStart( state, action );
        case actionTypes.FETCH_RECIPE_INFO_SUCCESS: return fetchRecipeInfoSuccess( state, action );
        case actionTypes.DELETE_RECIPE: return deleteRecipeStart( state, action );
        default: return state;
    }
};

export default reducer;