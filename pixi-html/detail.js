import { Container, Graphics, Text, TextStyle, Sprite, loader } from 'pixi.js'
import { hexToInt, parseFontType } from './utils'
import style from './style.css'

const FONT_COLOR = hexToInt(style['secondary-text-color'])
const FONT_FAMILY = parseFontType(style.font)
const BACKGROUND_COLOR = hexToInt(style['secondary-bg-color'])

export default (app) => {
  const container = new Container()
  const { width, height } = app.renderer
  container.x = width
  container.y = 0

  const background = new Graphics()
  background.beginFill(BACKGROUND_COLOR)
  background.drawRect(0, 0, width, height)

  const photo = new Sprite()
  photo.width = width / 2
  photo.height = width / 2
  photo.x = width / 4
  photo.y = height / 10

  const name = new Text('', new TextStyle({
    fill: FONT_COLOR,
    fontFamily: FONT_FAMILY
  }))

  name.y = photo.y + photo.height + (height / 10)

  container.addChild(background)
  container.addChild(photo)
  container.addChild(name)

  container.interactive = true

  let shouldShow = false
  let shown = false
  let shouldHide = false

  app.ticker.add(delta => {
    if (shouldShow) {
      container.x = Math.max(0, container.x - 50 * delta)
      if (container.x === 0) {
        shouldShow = false
        shown = true
      }
      return
    }

    if (shouldHide) {
      container.x = Math.min(app.renderer.width, container.x + 50 * delta)
      if (container.x === app.renderer.width) {
        shouldHide = false
        shown = false
      }
    }
  })

  const hide = () => {
    if (shown) {
      shouldHide = true
    }
  }

  const show = user => {
    if (!shown) {
      shouldShow = true
      photo.texture = loader.resources[user.picture].texture
      name.text = user.name
      name.x = (width - name.width) / 2
    }
  }

  container.on('click', hide)

  return {
    element: container,
    show
  }
}
