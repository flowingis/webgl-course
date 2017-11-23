import { Application } from 'pixi.js'
import { random } from 'lodash'
import createSquare from './square'
import createButton from './button'

const app = new Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xEDECED})

const squares = []

const addSquare = () => {
  const square = createSquare({
    app,
    size: random(50, 250),
    x: random(0, window.innerWidth),
    y: random(0, window.innerHeight)
  })

  squares.push(square)
  app.stage.addChild(square.element)
}

const moveAll = () => squares.forEach(s => s.move())
const rotateAll = () => squares.forEach(s => s.startRotating())

const moveButton = createButton({
  text: 'Move',
  x: 20,
  y: window.innerHeight - 100,
  onClick: moveAll
})

const rotateButton = createButton({
  text: 'Rotate',
  x: 200,
  y: window.innerHeight - 100,
  onClick: rotateAll
})

const addButton = createButton({
  text: 'Add',
  x: 380,
  y: window.innerHeight - 100,
  onClick: addSquare
})

app.stage.addChild(moveButton)
app.stage.addChild(rotateButton)
app.stage.addChild(addButton)

document.body.appendChild(app.view)

window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}, true)
