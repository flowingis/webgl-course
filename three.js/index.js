import * as THREE from 'three'
import initStats from './stats'
import bindControls from './controls'
import loadElement from './loadElement'

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
  const material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('./assets/crate.jpg') })
  const cube = new THREE.Mesh(geometry, material)
  cube.position.set(1, 1, -3)
  return cube
}

const createFloor = () => {
  const geometry = new THREE.PlaneGeometry(1000, 1000)

  const floorTexture = THREE.ImageUtils.loadTexture('./assets/grass.jpg')
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
  floorTexture.repeat.set(1000, 1000)

  const material = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide })
  const floor = new THREE.Mesh(geometry, material)
  floor.rotation.x = Math.PI / 2

  return floor
}

const createSky = () => {
  const geometry = new THREE.PlaneGeometry(1000, 1000)
  const material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('./assets/sky.jpg'), side: THREE.DoubleSide })

  const sky = new THREE.Mesh(geometry, material)
  sky.position.z = -100

  return sky
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
const sky = createSky()

loadElement('./assets/male02.obj')
  .then(minifigure => {
    const texture = THREE.ImageUtils.loadTexture('./assets/stone.jpg')
    minifigure.scale.set(0.02, 0.02, 0.02)
    minifigure.position.set(-6, 0, -6)
    minifigure.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture
      }
    })
    scene.add(minifigure)
  })

let movementVector

scene.add(sky)
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
