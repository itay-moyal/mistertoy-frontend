import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { userService } from "../services/user.service.js"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { login, signup } from "../store/actions/user.actions.js"

export function LoginSignup() {
  const [credentials, setCredentials] = useState(
    userService.getEmptyCredentials(),
  )
  const [isSignup, setIsSignup] = useState(false)

  const navigate = useNavigate()

  function handleChange({ target }) {
    const { name: field, value } = target
    setCredentials((prevCreds) => ({
      ...prevCreds,
      [field]: value,
    }))
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    if (isSignup) {
      try {
        await signup(credentials)
        navigate("/toy")
        showSuccessMsg("Signed up successfully")
      } catch (err) {
        console.log(err)
        showErrorMsg(`Couldn't Signup,Try again!`)
      }
    } else {
      try {
        await login(credentials)
        navigate("/toy")
        showSuccessMsg("Logged in successfully")
      } catch (err) {
        console.log(err)
        showErrorMsg(`Couldn't Login,Try again!`)
      }
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          placeholder="Username"
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          placeholder="Password"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        {isSignup && (
          <input
            type="text"
            name="fullname"
            value={credentials.fullname}
            placeholder="Fullname"
            onChange={handleChange}
            required
          />
        )}
        <button>{isSignup ? "Signup" : "Login"}</button>
        <div className="login-auth">
          <a href="#" onClick={() => setIsSignup(!isSignup)}>
            {isSignup
              ? "Already a member? Login!"
              : "New user? Signup over here!"}
          </a>
        </div>
      </form>
    </div>
  )
}
