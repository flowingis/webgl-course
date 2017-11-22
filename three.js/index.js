import * as THREE from 'three'
import initStats from './stats'
import bindControls from './controls'

initStats()

const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  camera.position.y = 1

  return camera
}

const createLight = () => {
  var light = new THREE.DirectionalLight(0xffffff)
  light.position.set(0, 2, 2)
  return light
}

const createCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshLambertMaterial({ color: 0xDEE831 })
  const cube = new THREE.Mesh(geometry, material)
  cube.position.set(1, 1, -3)
  return cube
}

const createFloor = () => {
  const geometry = new THREE.PlaneGeometry(1000, 1000, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide })
  const floor = new THREE.Mesh(geometry, material)
  floor.rotation.x = Math.PI / 2
  return floor
}

const createScene = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x1280AD)
  return scene
}

const scene = createScene()
const camera = createCamera()
const cube = createCube()
const light = createLight()
const floor = createFloor()

let movementVector
let counter = 0

scene.add(cube)
scene.add(light)
scene.add(floor)

const renderer = new THREE.WebGLRenderer()

document.body.appendChild(renderer.domElement)
renderer.setSize(window.innerWidth, window.innerHeight)

const render = () => {
  if (movementVector) {
    camera.translateX(movementVector.x)
    camera.translateZ(movementVector.z)
  }

  cube.translateX(Math.cos(counter) > 0 ? 0.2 : -0.2)
  counter += 0.1

  renderer.render(scene, camera)
  window.requestAnimationFrame(render)
}

bindControls(document.body, v => {
  movementVector = v
})

window.requestAnimationFrame(render)

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})
