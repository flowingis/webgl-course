import vertexShaderSource from './shaders/vertex.glsl'
import fragmentShaderSource from './shaders/fragment.glsl'

import {
  resizeCanvasToDisplaySize,
  createShader,
  createProgram,
  setResolutionToUniform
} from './utils'

import drawTriangle from './drawTriangle'

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

  // Rendering

  resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  gl.useProgram(program)

  extractDataFromBuffer(gl, positionAttributePointer)

  setResolutionToUniform(gl, program, 'u_resolution')

  for (let i = 0; i < 100; ++i) {
    drawTriangle(gl, program)
  }
}

main()
