import { Container } from 'pixi.js'
import photoFactory from './photo'

const createSquare = (width, height, y, picture) => {
  const row = new Container()

  row.x = 0
  row.y = y
  row.width = width
  row.height = height

  const photo = photoFactory({
    picture,
    width: 50
  })

  row.addChild(photo)

  return row
}

export default ({style, user, width, height, index}) => {
  const y = index * height
  const row = createSquare(width, height, y, user.picture)
  return {
    element: row
  }
}
