import { combineReducers } from 'redux';
import * as pizzaActions from './pizza.constants';

const initState = {
    pizzas: JSON.parse('[]')
}

const reducer = (state = initState.pizzas, action) => {
    switch(action.type)
    {
        case pizzaActions.SET_PIZZAS:
        {
            return Object.assign([], state, action.payload);
        }

        default:
        {
            return state;
        }
    }
}

const loadingReducer = (state = {isLoading: false}, action) => {
    switch (action.type) {
        case pizzaActions.FETCH_PIZZAS:
            return { isLoading: true };

        case pizzaActions.SET_PIZZAS:
            return { isLoading: false };
    
        case pizzaActions.FETCH_DATA_ERROR:
            return { isLoading: false };
    
        default:
            return state;
    }
}

export default combineReducers({
    list: reducer,
    dataState: loadingReducer
});