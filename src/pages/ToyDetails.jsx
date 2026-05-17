import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { Loader } from "../cmps/Loader.jsx"

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchToy() {
      try {
        if (toyId) await loadToy()
      } catch (err) {
        showErrorMsg("Cannot load toy!")
      }
    }
    fetchToy()
  }, [toyId])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch (err) {
      navigate("/toy")
      throw new Error("Had issues in toy details,Try again.")
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
      <div>
        <Link to={`/toy/${toy.nextToyId}`}>Next Toy</Link> |
        <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link>
      </div>
    </section>
  )
}
