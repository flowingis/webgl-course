import { Application } from 'pixi.js'

export default (node) => {
  const app = new Application({backgroundColor: 0xffffff})
  node.appendChild(app.view)
}
