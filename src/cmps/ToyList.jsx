import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, loggedInUser }) {
  return (
    <ul className="toy-list">
      {toys.map((toy) => (
        <li key={toy._id}>
          <ToyPreview toy={toy} loggedInUser={loggedInUser} />
          {loggedInUser && loggedInUser.isAdmin && (
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
