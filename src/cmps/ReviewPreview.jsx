import { Link } from "react-router-dom"

export function ReviewPreview({ review }) {
  const { byUser, aboutToy } = review

  return (
    <article className="review-preview">
      <p>
        About: <Link to={`/toy/${aboutToy._id}`}>{aboutToy.name}</Link>
      </p>
      <p className="review-by">
        By: <Link to={`/user/${byUser._id}`}>{byUser.fullname}</Link>
      </p>
      <pre className="review-txt">{review.txt}</pre>
      {review.createdAt && (
        <section className="created-at">
          <h4>Created At:</h4>
          {new Date(review.createdAt).toLocaleString("he")}
        </section>
      )}
    </article>
  )
}
