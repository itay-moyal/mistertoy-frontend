import { utilService } from "./util.service.js"
import { httpService } from "./http.service.js"

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getLabels,
}
const labels = [
  "On wheels",
  "Box game",
  "Art",
  "Baby",
  "Doll",
  "Puzzle",
  "Outdoor",
  "Battery Powered",
]

function query(queryOptions = {}) {
  return httpService.get("toy", queryOptions)
}

function getById(toyId) {
  return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
  return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(`toy/${toy._id}`, toy)
  } else {
    return httpService.post("toy", toy)
  }
}

function getEmptyToy() {
  return {
    name: "",
    price: "",
    labels: [],
    inStock: "",
    imgUrl: "",
  }
}

function getDefaultFilter() {
  return {
    txt: "",
    maxPrice: Infinity,
    labels: [],
    inStock: "",
  }
}

function getDefaultSort() {
  return {
    by: "name",
    asc: true,
  }
}

function getLabels() {
  return [...labels]
}
