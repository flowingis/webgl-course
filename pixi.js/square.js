import { Graphics } from 'pixi.js'

const createSquare = (size, color) => {
  const square = new Graphics()

  square.beginFill(color)
  square.drawRect(0, 0, size, size)

  return square
}

export default (app, size, color) => {
  let shouldMove = false
  const square = createSquare(size, color)
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
