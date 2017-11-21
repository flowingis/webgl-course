import * as THREE from 'three'
import initStats from './stats'

initStats()

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
  const material = new THREE.MeshBasicMaterial({ color: 0xDEE831 })
  const cube = new THREE.Mesh(geometry, material)
  cube.position.set(1, 0, -3)
  return cube
}

const createScene = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x1280AD)
  return scene
}

const scene = createScene()
const camera = createCamera()
const cube = createCube()

scene.add(cube)

const renderer = new THREE.WebGLRenderer()

document.body.appendChild(renderer.domElement)

const render = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
}

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)

window.addEventListener('resize', () => {
  render()
})
