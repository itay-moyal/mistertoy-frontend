import { toyService } from "../../services/toy.service.local.js";

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

// TODO - SET UP WHOLE STORE.
const initialState = {
    toys: [],
    
}