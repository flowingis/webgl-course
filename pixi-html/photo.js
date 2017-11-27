import { Sprite, loader } from 'pixi.js'

export const PLACEHOLDER_URL = './assets/spinner.png'

export default ({picture, width, y = 0, x = 0}) => {
  const photo = new Sprite(loader.resources[PLACEHOLDER_URL].texture)
  photo.width = width
  photo.height = width
  photo.y = y
  photo.x = x

  loader.onComplete.add(() => {
    photo.texture = loader.resources[picture].texture
  })

  return photo
}
