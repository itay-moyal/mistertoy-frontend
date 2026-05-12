import { useState, useEffect, useRef } from "react"

import { toyService } from "../services/toy.service.local.js"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300))
  const toyLabel = toyService.getLabels()

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
    console.log(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    console.log(field)
    if (type === "checkbox") value = target.checked
    if (type === "select-multiple") {
      value = Array.from(
        target.selectedOptions,
        (option) => option.value,
      ).filter((emptyString) => emptyString !== "")
    }
    if (field === "inStock") {
      if (value !== "") value = value === "true" ? true : false
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section className="toy-filter full main-layout">
      <h2>Filter</h2>

      <form className="filter-form">
        <label className="filter-label" htmlFor="name">
          Name:
        </label>
        <input
          onChange={handleChange}
          type="text"
          className="name"
          id="name"
          name="txt"
          value={filterByToEdit.txt}
        />
        <label className="filter-label">Min price:</label>
        <input
          onChange={handleChange}
          type="number"
          className="min-price"
          name="minPrice"
        />
        <label htmlFor="maxPrice">Max price:</label>
        <input
          onChange={handleChange}
          type="number"
          className="max-price"
          id="maxPrice"
          name="maxPrice"
        />

        <label className="filter-label">Filter By </label>
        <div>
          <select
            onChange={handleChange}
            name="labels"
            multiple
            value={filterByToEdit.labels || []}
          >
            <option value=""> All </option>
            <>
              {toyLabel.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </>
          </select>
        </div>

        <label className="filter-label">In stock </label>
        <div>
          <select
            onChange={handleChange}
            name="inStock"
            value={filterByToEdit.inStock}
          >
            <option value=""> All </option>
            <option value={true}>In stock</option>
            <option value={false}>Out of stock</option>
          </select>
        </div>
      </form>
    </section>
  )
}
