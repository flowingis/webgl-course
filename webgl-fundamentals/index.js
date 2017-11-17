import vertexShaderSource from './shaders/vertex.glsl'
import fragmentShaderSource from './shaders/fragment.glsl'

import {
  resizeCanvasToDisplaySize,
  createShader,
  createProgram,
  setResolutionToUniform
} from './utils'

import drawEquilateralTriangle from './drawEquilateralTriangle'

const extractDataFromBuffer = (gl, positionAttributePointer) => {
  gl.enableVertexAttribArray(positionAttributePointer)

  const size = 2
  const type = gl.FLOAT
  const normalize = false

  gl.vertexAttribPointer(positionAttributePointer, size, type, normalize, 0, 0)
}

const setColor = (redShade, gl, program) => {
  const colorUniformPointer = gl.getUniformLocation(program, 'u_color')
  gl.uniform4f(colorUniformPointer, redShade, 0, 0, 1)
}

const rotate = (x, y, gl, program) => {
  const rotation = [x, y]
  const rotationPointer = gl.getUniformLocation(program, 'u_rotation')
  gl.uniform2fv(rotationPointer, rotation)
}

const translate = (x, y, gl, program) => {
  const translation = [x, y]
  const translationPointer = gl.getUniformLocation(program, 'u_translation')
  gl.uniform2fv(translationPointer, translation)
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

  let counter = 0

  translate(200, 200, gl, program)

  const draw = () => {
    const cos = Math.cos(counter)

    rotate(cos, Math.sin(counter), gl, program)
    setColor(Math.abs(cos), gl, program)

    drawEquilateralTriangle(0, 0, 100, gl, program)

    counter += 0.1

    window.requestAnimationFrame(draw)
  }

  window.requestAnimationFrame(draw)
}

main()
