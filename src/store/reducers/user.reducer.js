import { userService } from "../../services/user.service.js"

const initialState = {
  loggedinUser: userService.getLoggedinUser(),
}

export const SET_USER = "SET_USER"
export const SET_USERS = "SET_USERS"
export const SET_WATCHED_USER = "SET_WATCHED_USER"

export function userReducer(state = initialState, cmd) {
  switch (cmd.type) {
    case SET_USER:
      return { ...state, loggedinUser: cmd.loggedinUser }

    case SET_USERS:
      return { ...state, users: cmd.users }
      break

    case SET_WATCHED_USER:
      return { ...state, watchedUser: cmd.user }
      break
    default:
      return state
  }
}
