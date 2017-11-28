import { Sprite, loader } from 'pixi.js'

export default ({picture, width, y = 0, x = 0}) => {
  const photo = Sprite.fromImage('./assets/spinner.png')
  photo.width = width
  photo.height = width
  photo.y = y
  photo.x = x

  loader.add(picture).load(() => {
    console.log(loader.resources[picture].texture)
  })

  return photo
}
