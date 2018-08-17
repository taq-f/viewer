
import { get } from 'axios'

const URL = 'http://localhost:3000'

export function getImages(query) {
  if (process.env.NODE_ENV !== 'production') {
    const images = query ? DUMMY_IMAGES.filter(f => f.name.indexOf(query) > -1) : DUMMY_IMAGES
    return new Promise(r => r(images))
  }
  return get(`${URL}/images`).then(r => r.data)
}

export function getThumbnail(id) {
  if (process.env.NODE_ENV !== 'production') {
    return new Promise(r => r(DUMMY_THUMBNAIL))
  }
  return get(`${URL}/images/thumbnails/${id}`).then(r => r.data)
}

export function getImageURL(image, format) {
  if (process.env.NODE_ENV !== 'production') {
    return 'https://images.unsplash.com/photo-1534406923815-a1d576c99d80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ab80bad49d865d6ccdaed7491a1fff99&auto=format&fit=crop&w=934&q=80'
  }
  return `${URL}/images/${image.id}?format=${format}`
}

const DUMMY_IMAGES = [
  {
    id: '0000001',
    name: 'image01',
    path: {
      png: '/path/png/image01.png',
      jpg: '/path/jpg/image01.jpg',
    },
    formats: ['png', 'jpg'],
  },
  {
    id: '0000002',
    name: 'image02',
    path: {
      png: '/path/png/image02.png',
      jpg: '/path/jpg/image02.jpg',
    },
    formats: ['png'],
  },
  {
    id: '0000003',
    name: 'image03',
    path: {
      png: '/path/png/image03.png',
      jpg: '/path/jpg/image03.jpg',
    },
    formats: ['jpg'],
  },
]

const DUMMY_THUMBNAIL = {
  id: 'dummy',
  thumbnail: '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'
}
