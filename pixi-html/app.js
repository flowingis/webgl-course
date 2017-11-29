import { Application } from 'pixi.js'
import { stripPx } from './utils'
import style from './style.css'

const NAV_WIDTH = stripPx(style['nav-width'])

const calculateSize = () => {
  const width = window.innerWidth - NAV_WIDTH
  const height = window.innerHeight

  return {
    width,
    height
  }
}

export default (node) => {
  const initialTop = node.getBoundingClientRect().y
  const size = calculateSize()
  const app = new Application(size.width, size.height, {backgroundColor: 0xFFFFFF})
  app.view.style.position = 'fixed'
  app.view.style.top = `${node.getBoundingClientRect().y}px`
  app.view.style.left = `${node.getBoundingClientRect().x}px`

  const resize = () => {
    const size = calculateSize()
    app.renderer.resize(size.width, size.height)
  }

  const onScroll = () => {
    app.view.style.top = `${Math.max(0, initialTop - window.pageYOffset)}px`
  }

  node.appendChild(app.view)

  return {
    app,
    onScroll,
    resize
  }
}
