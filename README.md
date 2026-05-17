# Mister Toy Frontend

A React + Vite frontend for the Mister Toy management application. This repository includes toy listing, filtering, creation, editing, and detail views with Redux state management and client-side routing.

## Features

- Browse a toy catalog
- Filter toys by name, price range, labels, and stock status
- Add new toys using the toy editor
- Edit existing toys
- Delete toys from the toy list
- View toy details with next/previous navigation
- Manage application state with Redux
- Navigate using React Router

## Tech Stack

- Vite
- React 19
- React Router DOM 7
- Redux 5 + React Redux
- Axios
- ESLint

## Project Structure

- `src/App.jsx` — root application component and routing
- `src/cmps/` — reusable UI components such as `AppHeader`, `ToyList`, `ToyPreview`, and `ToyFilter`
- `src/pages/` — pages for home, about, toy index, toy details, and toy edit
- `src/services/` — data and utility services, including `toy.service.js`, `http.service.js`, and `event-bus.service.js`
- `src/store/` — Redux store configuration, actions, and reducers
- `src/assets/` — application styles and shared CSS files

## Routes

- `/` — Home page
- `/about` — About page
- `/toy` — Toy list and filter page
- `/toy/edit` — Create a new toy
- `/toy/edit/:toyId` — Edit toy page
- `/toy/:toyId` — Toy details page

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Notes

- This frontend expects a backend API endpoint exposing toy CRUD operations under the `toy` path.
- If you need to adjust the backend URL or API settings, update `src/services/http.service.js`.
- Utility helpers are available in `toy.service.js`, including `getEmptyToy()` and `getLabels()`.

## License

This project is currently configured as a private application.
