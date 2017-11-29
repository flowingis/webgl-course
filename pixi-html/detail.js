import { Container, Graphics, Text, TextStyle } from 'pixi.js'
import { hexToInt, parseFontType } from './utils'
import style from './style.css'

const FONT_COLOR = hexToInt(style['secondary-text-color'])
const FONT_FAMILY = parseFontType(style.font)
const BACKGROUND_COLOR = hexToInt(style['secondary-bg-color'])

export default (app) => {
  const container = new Container()
  container.x = app.renderer.width
  container.y = 0

  const background = new Graphics()
  background.beginFill(BACKGROUND_COLOR)
  background.drawRect(0, 0, app.renderer.width, app.renderer.height)

  const text = new Text('Detail', new TextStyle({
    fill: FONT_COLOR,
    fontFamily: FONT_FAMILY
  }))

  container.addChild(background)
  container.addChild(text)

  return {
    element: container
  }
}
