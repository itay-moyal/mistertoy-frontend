import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, loggedinUser }) {
  return (
    <ul className="toy-list">
      {toys.map((toy) => (
        <li key={toy._id}>
          <ToyPreview toy={toy} loggedinUser={loggedinUser} />
          {loggedinUser && loggedinUser.isAdmin && (
            <section>
              <button
                className="btn-remove"
                onClick={() => onRemoveToy(toy._id)}
              >
                Remove
              </button>
            </section>
          )}
        </li>
      ))}
    </ul>
  )
}
