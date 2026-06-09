import { httpService } from "./http.service.js"

export const reviewService = {
  add,
  query,
  remove,
}

async function add({ txt, aboutToyId }) {
  return await httpService.post("review/", { txt, aboutToyId })
}
async function query(filterBy = {}) {
  return httpService.get("review/", filterBy)
}
async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
}
