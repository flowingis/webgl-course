import { Sprite } from 'pixi.js'

export default (x, y) => {
  const sprite = Sprite.fromImage('./assets/button.png')

  sprite.width = 150
  sprite.height = 50
  sprite.x = x
  sprite.y = y

  return sprite
}
