// import { useState } from 'react'
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import { store } from "./store/store.js"

import { AppHeader } from "./cmps/AppHeader.jsx"

import { HomePage } from "./pages/HomePage.jsx"
import { About } from "./pages/About.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { LoginSignup } from "./pages/LoginSignup.jsx"
import { UserDetails } from "./pages/UserDetails.jsx"
import { ReviewExplore } from "./pages/ReviewExplore.jsx"

function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main className="main-layout">
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<About />} path="/about" />
            <Route element={<ToyIndex />} path="/toy" />
            <Route element={<ToyEdit />} path="/toy/edit" />
            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
            <Route element={<ToyDetails />} path="/toy/:toyId" />
            <Route element={<LoginSignup />} path="/auth" />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/review" element={<ReviewExplore />} />
          </Routes>
        </main>
        {/* <AppFooter /> */}
      </section>
    </Router>
  )
}

export default App
