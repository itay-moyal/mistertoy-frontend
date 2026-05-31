import { toyService } from "../../services/toy.service.js"

import {
  ADD_TOY,
  REMOVE_TOY,
  SET_TOYS,
  UPDATE_TOY,
  SET_FILTER_BY,
} from "../reducers/toy.reducer.js"

import { SET_IS_LOADING } from "../reducers/load.reducer.js"
import { store } from "../store.js"

export async function loadToys() {
  const { filterBy } = store.getState().toyModule

  try {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const toys = await toyService.query(filterBy)
    store.dispatch({ type: SET_TOYS, toys })
  } catch (err) {
    console.error("toy action Cannot load toys")
    throw err
  } finally {
    setTimeout(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }, 350)
  }
}

export async function removeToy(toyId) {
  try {
    await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
  } catch (err) {
    console.error("toy action Cannot remove toy", error)
    throw error
  }
}

export async function saveToy(toy) {
  try {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    const toyToSave = await toyService.save(toy)
    store.dispatch({ type, toy: toyToSave })
    return toyToSave
  } catch (err) {
    console.error("toy action Cannot save toy", error)
    throw error
  }
}

export function setFilterBy(filterBy = toyService.getDefaultFilter()) {
  store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}
