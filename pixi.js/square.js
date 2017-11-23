import { Sprite, filters } from 'pixi.js'

const createSquare = (size, x, y) => {
  const sprite = Sprite.fromImage('./assets/square.png')

  sprite.width = size
  sprite.height = size
  sprite.x = x + size / 2
  sprite.y = y + size / 2
  sprite.anchor.x = 0.5
  sprite.anchor.y = 0.5

  const filter = new filters.ColorMatrixFilter()
  sprite.filters = [filter]

  const matrix = filter.matrix

  matrix[0] = Math.random()
  matrix[6] = Math.random()
  matrix[12] = Math.random()

  return sprite
}

export default ({app, size, x, y}) => {
  let shouldMove = false
  let shouldRotate = false
  const square = createSquare(size, x, y)

  const move = () => {
    shouldMove = true
  }

  const startRotating = () => {
    shouldRotate = true
  }

  app.ticker.add(delta => {
    if (shouldRotate) {
      square.rotation += 0.1 * delta
    }

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
    move,
    startRotating
  }
}
