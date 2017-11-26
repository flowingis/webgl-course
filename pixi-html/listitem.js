import { Graphics } from 'pixi.js'

const createSquare = (width, height, y) => {
  const row = new Graphics()

  row.beginFill(0xffffff)
  row.lineStyle(1, 0x000000)
  row.drawRect(0, y, width, height)

  return row
}

export default ({style, user, width, height, index}) => {
  const row = createSquare(width, height, index * height)
  return {
    element: row
  }
}
