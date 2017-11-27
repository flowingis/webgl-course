import { Container, Graphics, Text, TextStyle } from 'pixi.js'
import style from './style.css'
import { stripPx, hexToInt } from './utils'
import photoFactory from './photo'

const padding = stripPx(style['row-padding'])
const photoSize = stripPx(style['photo-size'])
const fontColor = style['primary-text-color']

const createText = name => {
  const style = new TextStyle({
    fontSize: 18,
    fill: fontColor
  })

  const textElement = new Text(name, style)
  textElement.x = photoSize + padding * 2
  textElement.y = padding

  return textElement
}

const createSeparator = (width, height) => {
  const line = new Graphics()
  line.lineStyle(2, hexToInt(fontColor))
  line.moveTo(padding, height)
  line.lineTo(width - padding, height)
  return line
}

const createRow = ({width, height, y, user, showSeparator, index}) => {
  const row = new Container()

  row.x = 0
  row.y = index * height
  row.width = width
  row.height = height

  const photo = photoFactory({
    picture: user.picture,
    y: padding,
    x: padding,
    width: photoSize
  })

  const text = createText(user.name)

  row.addChild(photo)
  row.addChild(text)

  if (showSeparator) {
    const separator = createSeparator(width, height)
    row.addChild(separator)
  }

  return row
}

export default (params) => {
  const row = createRow(params)
  return {
    element: row
  }
}
