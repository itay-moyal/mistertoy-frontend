import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {
  return (
    <article className="toy-preview">
      <h4>{toy.name}</h4>
      <div className="toy-preview-img-container">
        <img src={toy.imgUrl} alt="" />
      </div>
      <p>
        Price: <span>${toy.price.toLocaleString()}</span>
      </p>
      <p>
        <span>{toy.inStock ? "In stock" : "Out of stock"}</span>
      </p>

      <section>
        <button>
          <Link to={`/toy/${toy._id}`}>Details</Link>
        </button>
        <button>
          <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
        </button>
      </section>
    </article>
  )
}
