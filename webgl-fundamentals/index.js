import vertexShaderSource from './shaders/vertex.glsl'
import fragmentShaderSource from './shaders/fragment.glsl'

import {
  resizeCanvasToDisplaySize,
  createShader,
  createProgram
} from './utils'

const TRIANGLE_POINTS = new Float32Array([
  0, 0, 0,
  ...[0, 1], -1,
  ...[1, 1], -1,
  ...[1, 0], -1
])

const extractDataFromBuffer = (gl, positionAttributePointer) => {
  // Enable the attribute
  gl.enableVertexAttribArray(positionAttributePointer)

  const size = 2
  const type = gl.FLOAT
  const normalize = false
  const stride = 3 * TRIANGLE_POINTS.BYTES_PER_ELEMENT
  const offset = 3 * TRIANGLE_POINTS.BYTES_PER_ELEMENT
  // specifying the memory layout of the buffer holding the vertex attributes
  gl.vertexAttribPointer(positionAttributePointer, size, type, normalize, stride, offset)
}

const draw = gl => {
  const offset = 0
  const count = 3
  gl.drawArrays(gl.TRIANGLES, offset, count)
}

const main = () => {
  const canvas = document.querySelector('canvas[role="main"]')
  const gl = canvas.getContext('webgl')
  if (!gl) {
    return
  }

  // Creating Shaders from source
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

  // Create the program
  const program = createProgram(gl, vertexShader, fragmentShader)

  // take an attribute from the shader
  const positionAttributePointer = gl.getAttribLocation(program, 'a_position')

  // Create a buffer to put points data into it
  const positionBuffer = gl.createBuffer()

  // Bind the buffer it to WebGL ARRAY_BUFFER global
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  // Put the data in the buffer
  gl.bufferData(gl.ARRAY_BUFFER, TRIANGLE_POINTS, gl.STATIC_DRAW)

  // Rendering

  resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  // Clear the canvas
  gl.clearColor(0.066666666666667, 0.501960784313725, 0.67843137254902, 1) // #1280AD
  gl.clear(gl.COLOR_BUFFER_BIT) // Enable color writing

  gl.useProgram(program)

  extractDataFromBuffer(gl, positionAttributePointer)

  draw(gl)
}

main()
