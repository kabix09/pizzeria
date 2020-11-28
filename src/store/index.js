import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import { rootSaga } from './sagas';
import { rootEpic } from './episc';
import rootReducer from './init.reducer';

/* useless */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saga = createSagaMiddleware();
const epic = createEpicMiddleware();

const enhancers = composeEnhancers(
  applyMiddleware(...[
    saga,
    epic
  ])
);

export const store = createStore(
  rootReducer,
  {},
  enhancers
);

saga.run(rootSaga);
epic.run(rootEpic);