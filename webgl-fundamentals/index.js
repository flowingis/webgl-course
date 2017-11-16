import vertexShaderSource from './shaders/vertex.glsl'
import fragmentShaderSource from './shaders/fragment.glsl'

import {
  resizeCanvasToDisplaySize,
  createShader,
  createProgram,
  setResolutionToUniform
} from './utils'

const extractDataFromBuffer = (gl, positionAttributePointer) => {
  gl.enableVertexAttribArray(positionAttributePointer)

  const size = 2
  const type = gl.FLOAT
  const normalize = false

  gl.vertexAttribPointer(positionAttributePointer, size, type, normalize, 0, 0)
}

const main = () => {
  const canvas = document.querySelector('canvas[role="main"]')
  const gl = canvas.getContext('webgl')
  if (!gl) {
    return
  }

  const FIRST_TRIANGLE = [
    ...[0, 0],
    ...[Math.floor(window.innerWidth / 2), 0],
    ...[0, Math.floor(window.innerHeight / 2)]
  ]

  const SECOND_TRIANGLE = [
    ...[window.innerWidth, window.innerHeight],
    ...[Math.floor(window.innerWidth / 2), window.innerHeight],
    ...[window.innerWidth, Math.floor(window.innerHeight / 2)]
  ]

  const TRIANGLE_POINTS = new Float32Array([
    ...FIRST_TRIANGLE,
    ...SECOND_TRIANGLE
  ])

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

  setResolutionToUniform(gl, program, 'u_resolution')

  gl.drawArrays(gl.TRIANGLES, 0, TRIANGLE_POINTS.length / 2)
}

main()
