import { random } from 'lodash'

const createVertex = () => {
  const x = random(0, window.innerWidth)
  const y = random(0, window.innerHeight)
  return [x, y]
}

const setRandomColor = (gl, program) => {
  const colorUniformPointer = gl.getUniformLocation(program, 'u_color')
  gl.uniform4f(colorUniformPointer, Math.random(), Math.random(), Math.random(), 1)
}

export default (gl, program) => {
  setRandomColor(gl, program)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    ...createVertex(),
    ...createVertex(),
    ...createVertex()
  ]), gl.STATIC_DRAW)

  gl.drawArrays(gl.TRIANGLES, 0, 3)
}
