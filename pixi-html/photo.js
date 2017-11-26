import { Application, Sprite } from 'pixi.js'

export default (node, picture) => {
  const app = new Application(50, 50, {backgroundColor: 0x000000, forceCanvas: true})
  const sprite = Sprite.fromImage(picture)
  sprite.width = 50
  sprite.height = 50
  app.stage.addChild(sprite)
  node.appendChild(app.view)
}
