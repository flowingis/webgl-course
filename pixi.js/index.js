import { Application } from 'pixi.js'
import createSquare from './square'

const SIZE = 200

const app = new Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x009DCD})

const square = createSquare(app, SIZE, 0xDEE831)

app.stage.addChild(square.element)

document.body.appendChild(app.view)

window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}, true)

window.document.body.addEventListener('click', square.move)
