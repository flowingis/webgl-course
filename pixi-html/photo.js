import { Sprite, loader } from 'pixi.js'
import { setTimeout } from 'timers'

export const PLACEHOLDER_URL = './assets/spinner.png'
export const ERRORED_IMAGE_URL = './assets/user.png'

export default ({picture, width, y = 0, x = 0, app, animationDelay = 0, clockWise}) => {
  const photo = new Sprite(loader.resources[PLACEHOLDER_URL].texture)

  photo.width = width
  photo.height = width
  photo.x = x + width / 2
  photo.y = y + width / 2
  photo.anchor.x = 0.5
  photo.anchor.y = 0.5

  let photoLoaded = false

  const onTick = delta => {
    photo.rotation += 0.1 * delta * (clockWise ? 1 : -1)
  }

  const setPicture = (toLoad) => {
    photoLoaded = true
    app.ticker.remove(onTick)
    photo.rotation = 0
    photo.texture = loader.resources[toLoad].texture
  }

  setTimeout(() => {
    if (!photoLoaded) {
      app.ticker.add(onTick)
    }
  }, animationDelay)

  loader.onLoad.add((status, resource) => {
    if (resource.name === picture) {
      setPicture(picture)
    }
  })

  loader.onError.add((error, status, resource) => {
    console.log('Error', error)
    if (resource.name === picture) {
      setPicture(ERRORED_IMAGE_URL)
    }
  })

  return photo
}
