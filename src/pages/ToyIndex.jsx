import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

import { toyService } from "../services/toy.service.local.js"
import {
  loadToys,
  saveToy,
  removeToy,
  setFilterBy,
} from "../store/actions/toy.actions.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

import { Loader } from "../cmps/Loader.jsx"
import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"

export function ToyIndex() {
  const toys = useSelector((state) => state.toyModule.toys)
  const filterBy = useSelector((state) => state.toyModule.filterBy)
  const isLoading = useSelector((state) => state.loadModule.isLoading)
  // console.log(toys)

  useEffect(() => {
    loadToys().catch((err) => {
      showErrorMsg("Cannot load toys!")
    })
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg("Toy removed")
      })
      .catch((err) => {
        showErrorMsg("Cannot remove toy")
      })
  }

  function onAddToy() {
    const toyToSave = toyService.getRandomCar()
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
      })
      .catch((err) => {
        showErrorMsg("Cannot add toy")
      })
  }

  function onEditToy(toy) {
    const price = +prompt("New price?")
    const toyToSave = { ...toy, price }

    saveCar(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch((err) => {
        showErrorMsg("Cannot update toy")
      })
  }

  if (!toys) return <Loader />
  // console.log(isLoading);

  return (
    <section className="toy-index">
      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <div>
        <Link to="/toy/edit" className="btn-add">
          Add Toy
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      )}
    </section>
  )
}
