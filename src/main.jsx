import { store } from "./store/store.js"

import { Provider } from "react-redux"
import { createRoot } from "react-dom/client"

import "./assets/style/main.css"
import App from "./App.jsx"

const elRoot = document.getElementById("root")
createRoot(elRoot).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
