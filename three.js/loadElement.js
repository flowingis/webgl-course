import * as THREE from 'three'
import OBJLoader from 'three-obj-loader'
OBJLoader(THREE)

export default url => new Promise((resolve, reject) => {
  const loader = new THREE.OBJLoader()
  loader.load(
      url,
      obj => resolve(obj),
      () => {},
      err => reject(err))
})
