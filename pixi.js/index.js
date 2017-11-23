import { Application } from 'pixi.js'
import createSquare from './square'
import createButton from './button'

const SIZE = 200

const app = new Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xEDECED})

const square = createSquare(app, SIZE)
const firstButton = createButton(20, window.innerHeight - 100)
const secondButton = createButton(200, window.innerHeight - 100)

app.stage.addChild(square.element)
app.stage.addChild(firstButton)
app.stage.addChild(secondButton)

document.body.appendChild(app.view)

window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}, true)

window.document.body.addEventListener('click', square.startRotating)
