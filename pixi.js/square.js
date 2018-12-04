import { Sprite, filters } from 'pixi.js'

const createSquare = (size, x, y) => {
  const sprite = Sprite.fromImage('./assets/square.png')

  sprite.width = size
  sprite.height = size
  sprite.x = x + size / 2
  sprite.y = y + size / 2

  const colorFilter = new filters.ColorMatrixFilter()
  const matrix = colorFilter.matrix

  matrix[0] = Math.random()
  matrix[6] = Math.random()
  matrix[12] = Math.random()

  const blurFilter = new filters.BlurFilter()
  blurFilter.blur = 0

  sprite.filters = [
    colorFilter,
    blurFilter
  ]

  return sprite
}

export default ({app, size, x, y}) => {
  let shouldMove = false
  let shouldRotate = false
  const square = createSquare(size, x, y)

  square.interactive = true

  let checkOver = false

  square.on('pointerover', () => {
    checkOver = true
  })

  square.on('pointerout', () => {
    checkOver = false
  })

  const move = () => {
    shouldMove = true
  }

  const startRotating = () => {
    shouldRotate = true
  }

  const BLUR_DELTA = 0.5
  const MAX_BLUR = 3
  const MIN_BLUR = 0

  const checkBlur = (delta) => {
    let blur = square.filters[1].blur
    if (checkOver) {
      if (blur === MAX_BLUR) {
        return
      }

      blur = Math.min(blur + BLUR_DELTA * delta, MAX_BLUR)
    } else {
      if (blur === MIN_BLUR) {
        return
      }
      blur = Math.max(blur - BLUR_DELTA * delta, MIN_BLUR)
      blur -= BLUR_DELTA * delta
    }

    square.filters[1].blur = blur
  }

  app.ticker.add(delta => {
    checkBlur(delta)

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
