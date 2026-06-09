import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { loadReviews, removeReview } from "../store/actions/review.actions.js"
import { loadUsers } from "../store/actions/user.actions.js"

import { ReviewList } from "../cmps/ReviewList.jsx"
import { ReviewEdit } from "../cmps/ReviewEdit.jsx"
import { ReviewFilter } from "../cmps/ReviewFilter.jsx"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ReviewExplore() {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)

  const [filterBy, setFilterBy] = useState({ txt: "" })
  const [toys, setToys] = useState([])

  useEffect(() => {
    loadToys()
  }, [])

  useEffect(() => {
    loadReviews(filterBy)
  }, [filterBy])

  async function onRemoveReview(reviewId) {
    try {
      await removeReview(reviewId)
      showSuccessMsg("Review removed")
    } catch (err) {
      showErrorMsg("Cannot remove")
    }
  }

  async function loadToys(filterBy) {
    try {
      const toys = await toyService.query(filterBy)
      setToys(toys)
    } catch (err) {
      showErrorMsg(`Cannot load toys.`)
      console.log(err)
    }
  }

  return (
    <div className="review-explore">
      <h2>Reviews</h2>
      <ReviewFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      {user && <ReviewEdit toys={toys} />}
      <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
    </div>
  )
}
