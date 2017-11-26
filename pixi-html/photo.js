import { Sprite } from 'pixi.js'

export default ({picture, width, y = 0, x = 0}) => {
  const photo = Sprite.fromImage(picture)
  photo.width = width
  photo.height = width
  photo.y = y
  photo.x = x
  return photo
}
