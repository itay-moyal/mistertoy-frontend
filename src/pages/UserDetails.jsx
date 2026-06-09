import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { store } from "../store/store.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

import { loadUser } from "../store/actions/user.actions.js"
import { loadReviews } from "../store/actions/review.actions.js"

import { ReviewList } from "../cmps/ReviewList.jsx"
import { Loader } from "../cmps/Loader.jsx"

export function UserDetails() {
  const params = useParams()
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.watchedUser)
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)

  useEffect(() => {
    loadUser(params.id)
  }, [params.id])

  useEffect(() => {
    if (!user) return
    loadReviews({ byUserId: user._id })
  }, [user])

  async function onRemoveReview(reviewId) {
    try {
      await removeReview(reviewId)
      showSuccessMsg("Review removed")
    } catch (err) {
      showErrorMsg("Cannot remove")
    }
  }

  function onUserUpdate(user) {
    store.dispatch({ type: "SET_WATCHED_USER", user })
  }
  if (!user) return <Loader />
  return (
    <section className="user-details">
      <h1>Hello {user.fullname}</h1>
      <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
      {!reviews.length && <span>you haven't posted any reviews yet</span>}
    </section>
  )
}
