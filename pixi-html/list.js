import { Application } from 'pixi.js'
import { stripPx } from './utils'

export default (node, style) => {
  const app = new Application({backgroundColor: 0xffffff})

  const resize = () => {
    const width = window.innerWidth - stripPx(style['nav-width'])
    app.renderer.resize(width, 1)
  }

  node.appendChild(app.view)

  resize()

  return {
    resize
  }
}
