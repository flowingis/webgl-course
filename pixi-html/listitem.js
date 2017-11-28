import { Container, Graphics, Text, TextStyle } from 'pixi.js'
import style from './style.css'
import { stripPx, hexToInt, parseFontType } from './utils'
import photoFactory from './photo'

const padding = stripPx(style['row-padding'])
const photoSize = stripPx(style['photo-size'])
const fontColor = style['primary-text-color']
const fontFamily = parseFontType(style.font)
const ROW_HEIGHT = stripPx(style['row-height'])
const ROW_WIDTH = stripPx(style['row-width'])

const createBox = () => {
  const box = new Graphics()
  box.lineStyle(2, hexToInt(fontColor))
  box.drawRect(0, 0, ROW_WIDTH, ROW_HEIGHT)
  return box
}

const createText = name => {
  const style = new TextStyle({
    fontFamily,
    fontSize: 18,
    fill: fontColor
  })

  const textElement = new Text(name, style)
  textElement.x = photoSize + padding * 2
  textElement.y = (ROW_HEIGHT - textElement.height) / 2

  return textElement
}

const createRow = ({y, user, showSeparator, index, app}) => {
  const row = new Container()

  row.x = 0
  row.y = index * ROW_HEIGHT
  row.width = ROW_WIDTH
  row.height = ROW_HEIGHT

  const photo = photoFactory({
    app,
    picture: user.picture,
    y: padding,
    x: padding,
    width: photoSize,
    animationDelay: 500 * index,
    clockWise: index % 2 === 0
  })

  const text = createText(user.name)
  const box = createBox()

  row.addChild(box)
  row.addChild(photo)
  row.addChild(text)

  return row
}

export default (params) => {
  const row = createRow(params)
  return {
    element: row
  }
}
