import { reviewService } from "../../services/review.service.js"

import { store } from "../store.js"
//prettier-ignore
import { ADD_REVIEW,REMOVE_REVIEW,SET_REVIEWS } from "../reducers/review.reducer.js"

export async function loadReviews(filterBy = {}) {
  try {
    const reviews = await reviewService.query(filterBy)
    store.dispatch({ type: SET_REVIEWS, reviews })
  } catch (err) {
    console.log("ReviewActions: err in loadReviews", err)
    throw err
  }
}

export async function removeReview(reviewId) {
  try {
    await reviewService.remove(reviewId)
    store.dispatch({ type: REMOVE_REVIEW, reviewId })
  } catch (err) {
    console.log("ReviewActions: err in removeReview", err)
    throw err
  }
}

export async function addReview(review) {
  try {
    const addedReview = await reviewService.add(review)
    store.dispatch({ type: ADD_REVIEW, addedReview })
  } catch (err) {
    console.log("ReviewActions: err in addReview", err)
    throw err
  }
}
