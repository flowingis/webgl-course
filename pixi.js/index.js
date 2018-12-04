import { Application } from 'pixi.js'
import { random } from 'lodash'
import createSquare from './square'
import createButton from './button'

const app = new Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xEDECED})

const squares = []
let buttons = []

const checkOverlap = (listToCheck, square) => {
  const checkOverlapElement = (toCheck, index) => {
    console.log(index, toCheck.x, toCheck.y, toCheck.width, toCheck.height, square.x, square.y, square.width, square.height)
    if (toCheck.x + toCheck.width < square.x) {
      return false
    }

    if (toCheck.y + toCheck.height < square.y) {
      return false
    }

    const isSquareXInside = square.x > toCheck.x && square.x < toCheck.x + toCheck.width
    const isSquareYInside = square.y > toCheck.y && square.y < toCheck.y + toCheck.height

    // console.log(index, isSquareXInside, isSquareYInside)

    if (isSquareXInside && isSquareYInside) {
      return true
    }

    const isSquareCoveringToCheckWidth = square.width > toCheck.x - square.x
    const isSquareCoveringToCheckHeight = square.height > toCheck.y - square.y

    // console.log(index, isSquareCoveringToCheckWidth, isSquareCoveringToCheckHeight)

    return isSquareCoveringToCheckWidth && isSquareCoveringToCheckHeight
  }
  const overllappedElement = listToCheck.find(checkOverlapElement)
  return !!overllappedElement
}

const addSquare = () => {
  const square = createSquare({
    app,
    size: random(50, 250),
    x: random(0, window.innerWidth),
    y: random(0, window.innerHeight)
  })

  if (checkOverlap(buttons, square.element)) {
    console.log('Not using', square)
    return
  }

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

buttons = buttons.concat([
  moveButton,
  rotateButton,
  addButton
])

app.stage.addChild(moveButton)
app.stage.addChild(rotateButton)
app.stage.addChild(addButton)

document.body.appendChild(app.view)

window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}, true)
