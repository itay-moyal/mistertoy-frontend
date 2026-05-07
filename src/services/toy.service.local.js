import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const STORAGE_KEY = "toyDB"

_createToys()
export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getRandomToy,
  getDefaultFilter,
}

// FIX filterBy max Price Infinity error.
function query(filterBy = {}) {
  return storageService.query(STORAGE_KEY).then((toys) => {
    if (!filterBy.txt) filterBy.txt = ""
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    const regExp = new RegExp(filterBy.txt, "i")
    return toys.filter((toy) => {
      return regExp.test(toy.name) && toy.price <= filterBy.maxPrice
    })
  })
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId).then((toy) => {
    toy = _setNextPrevToyId(toy)
    return toy
  })
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    return storageService.post(STORAGE_KEY, toy)
  }
}

function getEmptyToy() {
  return {
    name: "",
    price: "",
    labels: [],
    inStock: true,
  }
}

function getDefaultFilter() {
  return { txt: "", maxPrice: "", labels: [], inStock: null }
}

function getRandomToy() {
  return {
    name: "Toy-" + utilService.getRandomIntInclusive(1, 100),
    price: utilService.getRandomIntInclusive(1000, 9000),
    labels: ["On wheels", "Box game", "Art", "Baby"],
    inStock: utilService.getRandomIntInclusive(0, 1),
    // createdAt : TODO later
  }
}

function _createToys() {
  var toys = utilService.loadFromStorage(STORAGE_KEY)
  if (toys && toys.length > 0) return
  toys = []
  for (var i = 0; i < 12; i++) {
    const toy = getRandomToy()
    toy._id = utilService.makeId()
    ;((toy.imgUrl = `https://robohash.org/${toy.name}?set=set2`),
      toys.push(toy))
  }
  console.log(toys)

  utilService.saveToStorage(STORAGE_KEY, toys)
}

function _setNextPrevToyId(toy) {
  return storageService.query(STORAGE_KEY).then((toys) => {
    const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
    const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
    const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
    toy.nextToyId = nextToy._id
    toy.prevToyId = prevToy._id
    return toy
  })
}
