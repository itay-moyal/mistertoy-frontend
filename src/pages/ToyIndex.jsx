import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

import { toyService } from "../services/toy.service.js"
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
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  const filterBy = useSelector((state) => state.toyModule.filterBy)
  const isLoading = useSelector((state) => state.loadModule.isLoading)
  // console.log(toys)

  useEffect(() => {
    async function fetchToys() {
      try {
        await loadToys()
      } catch (err) {
        showErrorMsg("Cannot load toys!")
      }
    }
    fetchToys()
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  async function onRemoveToy(toyId) {
    try {
      await removeToy(toyId)
      loadToys()
      showSuccessMsg("Toy removed")
    } catch (err) {
      showErrorMsg("Cannot remove toy")
    }
  }

  async function onAddToy() {
    const toyToSave = toyService.getRandomCar()
    try {
      const savedToy = await saveToy(toyToSave)

      showSuccessMsg(`Toy added (id: ${savedToy._id})`)
    } catch (err) {
      showErrorMsg("Cannot add toy")
    }
  }

  if (!toys) return <Loader />

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
        <ToyList toys={toys} onRemoveToy={onRemoveToy} loggedinUser={user} />
      )}
    </section>
  )
}
