import { userService } from "../../services/user.service.js"
import { store } from "../store.js"
//prettier-ignore
import { SET_USER,SET_USERS,SET_WATCHED_USER } from "../reducers/user.reducer.js"

import { showErrorMsg } from "../../services/event-bus.service.js"
export async function login(credentials) {
  try {
    const loggedinUser = await userService.login(credentials)
    store.dispatch({ type: SET_USER, loggedinUser })
  } catch (error) {
    console.log("user actions Cannot login", error)
    throw error
  }
}

export async function signup(credentials) {
  try {
    const loggedinUser = await userService.signup(credentials)
    store.dispatch({ type: SET_USER, loggedinUser })
  } catch (error) {
    console.log("user actions Cannot signup", error)
    throw error
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({ type: SET_USER, loggedinUser: null })
  } catch (error) {
    console.log("user actions Cannot logout", error)
    throw error
  }
}

export async function loadUsers() {
  try {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const users = await userService.getUsers()
    store.dispatch({ type: SET_USERS, users })
  } catch (err) {
    console.error("UserActions: err in loadUsers", err)
  } finally {
    setTimeout(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }, 350)
  }
}

export async function loadUser(userId) {
  try {
    const user = await userService.getById(userId)
    store.dispatch({ type: SET_WATCHED_USER, user })
  } catch (err) {
    showErrorMsg("Cannot load user")
    console.log("Cannot load user", err)
  }
}
