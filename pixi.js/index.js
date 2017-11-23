import { Application } from 'pixi.js'
import createSquare from './square'
import createButton from './button'

const SIZE = 200

const app = new Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xEDECED})

const square = createSquare(app, SIZE)
const moveButton = createButton('Move', 20, window.innerHeight - 100)
const rotateButton = createButton('Rotate', 200, window.innerHeight - 100)

app.stage.addChild(square.element)
app.stage.addChild(moveButton)
app.stage.addChild(rotateButton)

document.body.appendChild(app.view)

window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}, true)

window.document.body.addEventListener('click', square.startRotating)
