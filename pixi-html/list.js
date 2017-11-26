import { Application } from 'pixi.js'
import { stripPx } from './utils'
import listItemFactory from './listitem'

export default (node, style) => {
  const ROW_HEIGHT = stripPx(style['row-height'])
  const NAV_WIDTH = stripPx(style['nav-width'])
  const SCROLL_WIDTH = 15
  const app = new Application({backgroundColor: 0xffffff})
  let users = []

  const resize = () => {
    const width = window.innerWidth - NAV_WIDTH
    const height = users.length * ROW_HEIGHT
    app.renderer.resize(width, height)
  }

  const calculateRowWidth = () => {
    let scrollOffset = 0
    if (document.body.scrollHeight > window.innerHeight) {
      scrollOffset = SCROLL_WIDTH
    }

    return window.innerWidth - NAV_WIDTH - scrollOffset
  }

  const setUsers = u => {
    users = u
    resize()
    users
    .map((user, index) => {
      return listItemFactory({
        user,
        width: calculateRowWidth(),
        index,
        height: ROW_HEIGHT,
        showSeparator: index !== users.length - 1
      })
    })
    .forEach(row => app.stage.addChild(row.element))
  }

  node.appendChild(app.view)

  resize()

  return {
    resize,
    setUsers
  }
}
