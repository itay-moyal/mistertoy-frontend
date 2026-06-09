import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom"

import { Loader } from "../cmps/Loader.jsx"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import {
  addReview,
  loadReviews,
  removeReview,
} from "../store/actions/review.actions.js"

import { ToyReview } from "../cmps/ToyReview.jsx"

export function ToyDetails() {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)

  const [toy, setToy] = useState(null)
  const [review, setReview] = useState({ txt: "" })

  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
    loadReviews({ aboutToyId: toyId })
  }, [toyId])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch (err) {
      navigate("/toy")
      showErrorMsg("Cannot load toy!")
    }
  }

  function handleReviewChange({ target }) {
    const { name: field, value } = target
    setReview((review) => ({ ...review, [field]: value }))
  }

  async function onSaveReview(ev) {
    ev.preventDefault()
    const savedReview = {
      txt: review.txt,
      aboutToyId: toy._id,
    }
    try {
      await addReview(savedReview)

      showSuccessMsg("Review saved!")
    } catch (err) {
      console.log("error saving the review :", err)
    }
  }
  async function onRemoveReview(reviewId) {
    try {
      removeReview(reviewId)
      showSuccessMsg("Review removed!")
    } catch (err) {
      console.log("error removing review", err)
    }
  }

  if (!toy) return <Loader />
  // console.log(toy)
  return (
    <section className="toy-details">
      <h1>{toy.name}</h1>
      <h5>Price: ${toy.price}</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas
        cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat
        perferendis tempora aspernatur sit, explicabo veritatis corrupti
        perspiciatis repellat, enim quibusdam!
      </p>
      <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
      <Link to={`/toy`}>Back</Link>
      <div className="toy-details-navigation">
        <button>
          <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link>
        </button>
        <button>
          <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link>
        </button>
      </div>
      {user && (
        <ToyReview
          toy={toy}
          review={review}
          reviews={reviews}
          handleChange={handleReviewChange}
          onSaveReview={onSaveReview}
          onRemoveReview={onRemoveReview}
        />
      )}
    </section>
  )
}
