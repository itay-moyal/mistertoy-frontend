import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

import { toyService } from "../services/toy.service.local.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { Loader } from "../cmps/Loader.jsx"

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToy(toy))
      .catch((err) => {
        showErrorMsg("Had issues in toy details", err)
        navigate("/toy")
      })
  }
  console.log(toy);
  
  if (!toy) return <Loader />
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
