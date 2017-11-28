import { Sprite, loader } from 'pixi.js'

export const PLACEHOLDER_URL = './assets/spinner.png'

export default ({picture, width, y = 0, x = 0, app}) => {
  const photo = new Sprite(loader.resources[PLACEHOLDER_URL].texture)
  photo.width = width
  photo.height = width
  photo.x = x + width / 2
  photo.y = y + width / 2
  photo.anchor.x = 0.5
  photo.anchor.y = 0.5

  const onTick = delta => {
    photo.rotation += 0.1 * delta
  }

  app.ticker.add(onTick)

  loader.onLoad.add((status, resource) => {
    if (resource.name === picture) {
      app.ticker.remove(onTick)
      photo.rotation = 0
      photo.texture = loader.resources[picture].texture
    }
  })

  return photo
}
