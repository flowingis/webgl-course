import * as THREE from 'three'

const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  return camera
}

const createCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const cube = new THREE.Mesh(geometry)
  cube.position.set(1, 0, -3)
  return cube
}

const scene = new THREE.Scene()
const camera = createCamera()
const cube = createCube()

scene.add(cube)

const renderer = new THREE.WebGLRenderer()

document.body.appendChild(renderer.domElement)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
