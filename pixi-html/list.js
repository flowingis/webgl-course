import { Application } from 'pixi.js'
import { stripPx } from './utils'

export default (node, style) => {
  const ROW_HEIGHT = stripPx(style['row-height'])
  const NAV_WIDTH = stripPx(style['nav-width'])
  const app = new Application({backgroundColor: 0xffffff})
  let users = []

  const resize = () => {
    const width = window.innerWidth - NAV_WIDTH
    const height = users.length * ROW_HEIGHT
    app.renderer.resize(width, height)
  }

  const setUsers = u => {
    users = u
    resize()
  }

  node.appendChild(app.view)

  resize()

  return {
    resize,
    setUsers
  }
}
