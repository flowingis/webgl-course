const W = 87
const A = 65
const S = 83
const D = 68
const NOOP = () => {}

export default (camera, element) => {
  const left = () => {
    camera.position.x -= 0.1
  }

  const right = () => {
    camera.position.x += 0.1
  }

  const forward = () => {
    camera.position.z -= 0.1
  }

  const backward = () => {
    camera.position.z += 0.1
  }

  const commands = {
    [W]: forward,
    [A]: left,
    [S]: backward,
    [D]: right
  }

  const onKeydown = event => {
    const command = commands[event.keyCode] || NOOP
    camera.updateProjectionMatrix()
    command()
  }

  element.addEventListener('keydown', onKeydown)
}
