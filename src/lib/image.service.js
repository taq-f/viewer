
import { get } from 'axios'

const URL = 'http://localhost:3000'

export function getImages() {
  return get(`${URL}/images`).then(r => r.data)
}

export function getThumbnail(id) {
  return get(`${URL}/images/thumbnails/${id}`).then(r => r.data)
}
