import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { Loader } from "../cmps/Loader.jsx"

import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {
  const navigate = useNavigate()
  const { toyId } = useParams()

  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const toyLabels = toyService.getLabels()

  useEffect(() => {
    async function fetchToy() {
      try {
        if (toyId) await loadToy()
      } catch (err) {
        showErrorMsg("Cannot load toy!")
      }
    }
    fetchToy()
  }, [])

  async function loadToy() {
    try {
      if (!toyId) return
      const toy = await toyService.getById(toyId)
      setToyToEdit(toy)
    } catch (err) {
      showErrorMsg("Had issues in toy edit,Try again.")
      navigate("/toy")
      throw new Error("Had issues in toy edit,Try again.")
    }
  }

  function handleChange({ target }) {
    const { type, name } = target
    let value = target.value

    if (type === "select-multiple") {
      value = Array.from(target.selectedOptions, (option) => option.value)
    }
    if (type === "number") value = +target.value

    setToyToEdit((prevToy) => ({ ...prevToy, [name]: value }))
  }

  async function onSaveToy(ev) {
    ev.preventDefault()
    try {
      const inStock = toyToEdit.inStock === "true" ? true : false
      const newToy = { ...toyToEdit, inStock }
      await saveToy(newToy)
      showSuccessMsg("Toy saved successfully.")
      navigate("/toy")
    } catch (err) {
      showErrorMsg("Had issues saving toy, Try again.")
    }
  }

  function onSetLabels(labels) {
    setToyToEdit((prevToy) => ({ ...prevToy, labels }))
  }

  function getYesNo() {
    return toyToEdit.inStock
  }
  if (!toyToEdit) return <Loader />

  return (
    <form onSubmit={onSaveToy} className="container edit-form" action="">
      <div>
        <label>
          <span>Name</span>
        </label>
        <input
          className="edit-input name-input"
          value={toyToEdit.name}
          onChange={handleChange}
          type="text"
          name="name"
        />
      </div>
      <div>
        <label>
          <span>Price</span>
        </label>
        <input
          className="edit-input price-input"
          value={toyToEdit.price}
          onChange={handleChange}
          type="number"
          name="price"
        />
      </div>
      <div>
        <label>
          <span>Labels</span>
        </label>
        <select
          multiple
          onChange={handleChange}
          name="labels"
          value={toyToEdit.labels}
          className="edit-input"
        >
          {toyLabels.map((label) => (
            <option key={label}>{label}</option>
          ))}
        </select>
      </div>
      <div>
        <label>
          <span>Stock</span>
        </label>
        <select
          value={getYesNo() || "1"}
          onChange={handleChange}
          name="inStock"
          className="edit-input"
        >
          <option value={"1"} disabled>
            In Stock
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <button className="save-toy-btn">Save</button>
    </form>
  )
}
