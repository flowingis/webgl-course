const createCoords = (xOffset, yOffset, width) => {
  const firstPoint = [
    xOffset + (width / 2),
    yOffset
  ]

  const secondPoint = [
    xOffset + width,
    yOffset + width
  ]

  const thirdPoint = [
    xOffset,
    yOffset + width
  ]

  return new Float32Array([
    ...firstPoint,
    ...secondPoint,
    ...thirdPoint
  ])
}

export default (xOffset, yOffset, width, gl, program) => {
  const coords = createCoords(xOffset, yOffset, width)
  gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STATIC_DRAW)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}
