import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState);
};

const removedIngredient = (state, action) => {
    const removedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngs = updateObject(state.ingredients, removedIngredient);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        error: false,
        totalPrice: 4,
        building: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
};

const builderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removedIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default builderReducer;