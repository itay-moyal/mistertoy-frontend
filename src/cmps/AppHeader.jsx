import { NavLink, Link, useNavigate } from "react-router-dom"

import { useSelector } from "react-redux"
import { logout } from "../store/actions/user.actions.js"
import { LoginSignup } from "../pages/LoginSignup.jsx"

export function AppHeader() {
  const loggedinUser = useSelector((state) => state.userModule.loggedinUser)
  const navigate = useNavigate()
  async function onLogout() {
    try {
      logout()
      navigate("/auth")
    } catch (err) {
      console.log(err)
      showErrorMsg(`Couldn't Logout,Try again!`)
    }
  }
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>Mister Toy Project</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>|
          <NavLink to="/about">About</NavLink>|
          <NavLink to="/toy">Toys</NavLink>|
          <NavLink to="/review">Reviews</NavLink> |
          {!loggedinUser ? (
            <NavLink to="/auth">Login</NavLink>
          ) : (
            <div className="user">
              <Link to={`/user/${loggedinUser._id}`}>
                {loggedinUser.fullname}
              </Link>
              <button onClick={onLogout}>Logout</button>
            </div>
          )}
        </nav>
      </section>
    </header>
  )
}
