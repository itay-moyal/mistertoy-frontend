import { toyService } from '../../services/toy.service.local.js'

import {
  ADD_TOY,
  REMOVE_TOY,
  SET_TOYS,
  UPDATE_TOY,
  SET_FILTER_BY,
} from '../reducers/toy.reducer.js'

import { SET_IS_LOADING } from '../reducers/load.reducer.js'
import { store } from '../store.js'

export function loadToys(){
    const filterBy = state.toyModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
}