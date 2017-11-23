import { Container, Sprite, Text, TextStyle } from 'pixi.js'

const WIDTH = 150
const HEIGHT = 50

const createText = text => {
  const style = new TextStyle({
    fontSize: 18,
    fill: '#ffffff'
  })

  const textElement = new Text(text, style)

  textElement.x = (WIDTH - textElement.width) / 2
  textElement.y = (HEIGHT - textElement.height) / 2

  return textElement
}

const createSprite = () => {
  const sprite = Sprite.fromImage('./assets/button.png')
  sprite.height = HEIGHT
  sprite.width = WIDTH
  return sprite
}

export default (text, x, y) => {
  const container = new Container()

  const textElement = createText(text)
  const sprite = createSprite()

  container.x = x
  container.y = y
  container.height = HEIGHT
  container.width = WIDTH

  container.addChild(sprite)
  container.addChild(textElement)

  return container
}
