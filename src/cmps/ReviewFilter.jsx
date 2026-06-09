import { useEffect, useState } from "react"

export function ReviewFilter({ filterBy, setFilterBy }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy)

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        setFilterByToEdit({ txt: target.value })
    }

    return <div className="review-filter">
        <label htmlFor="txt">Filter: </label>
        <input 
            onChange={handleChange}
            value={filterByToEdit.txt}
            id="txt"
            type="text" />
    </div>
}