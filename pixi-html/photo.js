import { Application } from 'pixi.js'

export default (node, user) => {
  const app = new Application(50, 50, {backgroundColor: 0x000000})
  node.appendChild(app.view)
}
