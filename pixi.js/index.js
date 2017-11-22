import { Application, Graphics } from 'pixi.js'

const createSquare = (size, color) => {
  const square = new Graphics()

  square.beginFill(color)
  square.drawRect(0, 0, size, size)

  return square
}

const app = new Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x009DCD})

const square = createSquare(200, 0xDEE831)

app.stage.addChild(square)

document.body.appendChild(app.view)
