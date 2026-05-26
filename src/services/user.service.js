import { httpService } from "./http.service.js"
const AUTH_URL = "auth/"
const USER_URL = "user/"
const STORAGE_KEY_LOGGEDIN = "loggedinUser"

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getEmptyCredentials,
}

async function login({ username, password }) {
  try {
    const user = await httpService.post(AUTH_URL + "login", {
      username,
      password,
    })
    if (user) return _setLoggedinUser(user)
  } catch (err) {
    throw new Error(err)
  }
}
async function logout() {
  try {
    await httpService.post(AUTH_URL + "logout")
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  } catch (err) {
    throw new Error(err)
  }
}
async function signup({ username, password, fullname }) {
  const userToSave = { username, password, fullname, balance: 10000 }
  try {
    const user = await httpService.post(AUTH_URL + "signup", userToSave)
    if (user) return _setLoggedinUser(user)
  } catch (err) {
    throw new Error("Invalid signup.")
  }
}
function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}
function getEmptyCredentials() {
  return {
    username: "",
    password: "",
    fullname: "",
  }
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    balance: user.balance,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}
