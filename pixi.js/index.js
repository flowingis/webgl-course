import { Application } from 'pixi.js'
import createSquare from './square'
import createButton from './button'

const SIZE = 200

const app = new Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xEDECED})

const square = createSquare(app, SIZE)

const moveButton = createButton({
  text: 'Move',
  x: 20,
  y: window.innerHeight - 100,
  onClick: square.move
})

const rotateButton = createButton({
  text: 'Rotate',
  x: 200,
  y: window.innerHeight - 100,
  onClick: square.startRotating
})

app.stage.addChild(square.element)
app.stage.addChild(moveButton)
app.stage.addChild(rotateButton)

document.body.appendChild(app.view)

window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}, true)
