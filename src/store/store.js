import { loadReducer } from './reducers/load.reducer.js'
import { toyReducer } from './reducers/toy.reducer.js'

import {
  legacy_createStore as createStore,
  compose,
  combineReducers,
} from 'redux'

const rootReducer = combineReducers({
  toyModule: toyReducer,
  loadModule: loadReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
