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
const ROW_FONT_SIZE = stripPx(style['row-font-size'])
const ROW_MAX_FONT_SIZE = stripPx(style['row-max-font-size'])

const MIN_TEXT_X = photoSize + padding * 2

const createBox = () => {
  const box = new Graphics()
  box.beginFill(0xFFFFFF)
  box.lineStyle(2, hexToInt(fontColor))
  box.drawRect(0, 0, ROW_WIDTH, ROW_HEIGHT)
  return box
}

const createText = name => {
  const style = new TextStyle({
    fontFamily,
    fontSize: ROW_FONT_SIZE,
    fill: fontColor
  })

  const textElement = new Text(name, style)
  textElement.x = MIN_TEXT_X
  textElement.y = (ROW_HEIGHT - textElement.height) / 2

  return textElement
}

const createRow = ({user, showSeparator, index, app, coords, onClick}) => {
  const row = new Container()

  row.x = coords.x
  row.y = coords.y
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

  row.interactive = true
  row.buttonMode = true

  let shouldGrow = false

  row.on('pointerover', () => {
    shouldGrow = true
  })

  row.on('pointerout', () => {
    shouldGrow = false
  })

  row.on('click', () => {
    onClick(user)
  })

  app.ticker.add(delta => {
    if (shouldGrow) {
      text.style.fontSize = Math.min(ROW_MAX_FONT_SIZE, text.style.fontSize + 0.5 * delta)
      const maxTextX = ROW_WIDTH - padding - text.width
      text.x = Math.min(maxTextX, text.x + 10 * delta)
    } else {
      text.style.fontSize = Math.max(ROW_FONT_SIZE, text.style.fontSize - 0.5 * delta)
      text.x = Math.max(MIN_TEXT_X, text.x - 10 * delta)
    }
    text.y = (ROW_HEIGHT - text.height) / 2
  })

  return row
}

export default (params) => {
  const row = createRow(params)
  return {
    element: row
  }
}
