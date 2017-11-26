import { Container, Graphics } from 'pixi.js'
import style from './style.css'
import { stripPx } from './utils'
import photoFactory from './photo'

const padding = stripPx(style['row-padding'])
const photoSize = stripPx(style['photo-size'])

const createSeparator = (width, height) => {
  const line = new Graphics()
  line.lineStyle(2, 0x000000)
  line.moveTo(padding, height)
  line.lineTo(width - padding, height)
  return line
}

const createRow = (width, height, y, picture, showSeparator) => {
  const row = new Container()

  row.x = 0
  row.y = y
  row.width = width
  row.height = height

  const photo = photoFactory({
    picture,
    y: padding,
    x: padding,
    width: photoSize
  })

  row.addChild(photo)

  if (showSeparator) {
    const separator = createSeparator(width, height)
    row.addChild(separator)
  }

  return row
}

export default ({style, user, width, height, index, showSeparator}) => {
  const y = index * height
  const row = createRow(width, height, y, user.picture, showSeparator)
  return {
    element: row
  }
}
