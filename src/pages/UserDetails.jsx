import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { store } from "../store/store.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

import { loadUser } from "../store/actions/user.actions.js"

export function UserDetails() {
  const params = useParams()
  const user = useSelector((storeState) => storeState.userModule.watchedUser)

  useEffect(() => {
    loadUser(params.id)
  }, [params.id])

  function onUserUpdate(user) {
    store.dispatch({ type: "SET_WATCHED_USER", user })
  }

  return (
    <section className="user-details">
      <h1>User Details</h1>
      {user && (
        <div>
          <h3>{user.fullname}</h3>
          <img src={user.imgUrl} style={{ width: "100px" }} />
          <pre> {JSON.stringify(user, null, 2)} </pre>
        </div>
      )}
    </section>
  )
}
