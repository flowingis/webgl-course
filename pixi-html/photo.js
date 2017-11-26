import { Sprite } from 'pixi.js'

export default ({picture, width}) => {
  const photo = Sprite.fromImage(picture)
  photo.width = width
  photo.height = width
  return photo
}
