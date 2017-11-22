import { Sprite } from 'pixi.js'

const createSquare = (size) => {
  const sprite = Sprite.fromImage('./assets/square.png')

  sprite.width = size
  sprite.height = size
  sprite.x = 0
  sprite.y = 0

  return sprite
}

export default (app, size) => {
  let shouldMove = false
  const square = createSquare(size)

  const move = () => {
    shouldMove = true
  }

  app.ticker.add(delta => {
    if (shouldMove) {
      const END = window.innerWidth - size
      const INCREMENT = 50 * delta
      if (square.x < END) {
        square.x += Math.min(INCREMENT, END - square.x)
      }
    }
  })

  return {
    element: square,
    move
  }
}
