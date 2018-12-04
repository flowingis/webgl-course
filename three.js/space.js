const SPACE = 32

export default (element, onChange) => {
  const onKeydown = event => {
    if (event.keyCode === SPACE) {
      onChange()
    }
  }

  element.addEventListener('keydown', onKeydown)
}
