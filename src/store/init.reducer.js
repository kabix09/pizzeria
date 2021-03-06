import { combineReducers } from 'redux';

import labelReducer from './data/label/label.reducers';
import pizzaReducer from './data/pizza/pizza.reducers';
import ingredientReducer from './data/ingredient/ingredient.reducers';
import errorReducer from './data/error/error.reducers.js';
import basketReducer from './data/basket/basket.reducer';
import priceReducer from './data/price/price.reducer';

export default combineReducers({
  label: labelReducer,
  pizzas: pizzaReducer,
  ingredients: ingredientReducer,
  //errors: errorReducer,
  basket: basketReducer,
  price: priceReducer
});
