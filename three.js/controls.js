const W = 87
const A = 65
const S = 83
const D = 68

const DELTA = 0.1

const createMovementVector = movement => {
  const x = DELTA * (-movement.left + movement.right)
  const y = 0
  const z = DELTA * (movement.backward - movement.forward)

  return {x, y, z}
}

export default (element, onChange) => {
  const movement = {
    forward: 0,
    backward: 0,
    left: 0,
    right: 0
  }

  const onKeydown = event => {
    const commands = {
      [W]: () => { movement.forward = 1 },
      [A]: () => { movement.left = 1 },
      [S]: () => { movement.backward = 1 },
      [D]: () => { movement.right = 1 }
    }
    const command = commands[event.keyCode]
    if (command) {
      command()
      onChange(createMovementVector(movement))
    }
  }

  const onKeyup = event => {
    const commands = {
      [W]: () => { movement.forward = 0 },
      [A]: () => { movement.left = 0 },
      [S]: () => { movement.backward = 0 },
      [D]: () => { movement.right = 0 }
    }
    const command = commands[event.keyCode]
    if (command) {
      command()
      onChange(createMovementVector(movement))
    }
  }

  element.addEventListener('keydown', onKeydown)
  element.addEventListener('keyup', onKeyup)
}
