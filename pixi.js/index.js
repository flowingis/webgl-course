import { Application, Graphics } from 'pixi.js'

const SIZE = 200

const createSquare = (size, color) => {
  const square = new Graphics()

  square.beginFill(color)
  square.drawRect(0, 0, size, size)

  return square
}

const app = new Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x009DCD})

const square = createSquare(SIZE, 0xDEE831)

app.stage.addChild(square)

document.body.appendChild(app.view)

app.ticker.add(() => {
  const END = window.innerWidth - SIZE
  const INCREMENT = 50
  if (square.x < END) {
    square.x += Math.min(INCREMENT, END - square.x)
  }
})

window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}, true)
