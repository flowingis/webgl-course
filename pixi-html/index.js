import { list as listUsers } from './users'
import listFactory from './list'
import appFactory from './app'
import detailFactory from './detail'
import initStats from './stats'
import style from './style.css'
import { stripPx } from './utils'

const ROW_HEIGHT = stripPx(style['row-height'])
const ROW_WIDTH = stripPx(style['row-width'])
const NAV_WIDTH = stripPx(style['nav-width'])

initStats()

const listNode = document.querySelector('div[role="list"]')

const application = appFactory(listNode)
const detail = detailFactory(application.app)
const list = listFactory(application.app, listNode)

application.app.stage.addChild(list.element)
application.app.stage.addChild(detail.element)

listUsers().then(users => {
  const elementsPerRow = Math.floor((window.innerWidth - NAV_WIDTH) / ROW_WIDTH)
  const height = Math.floor(users.length / elementsPerRow) * ROW_HEIGHT
  listNode.style.height = `${height}px`
  list.setUsers(users)
})

list.setOnUserClick(user => {
  detail.show(user)
})

window.addEventListener('scroll', () => {
  application.onScroll()
  list.onScroll()
}, false)

window.addEventListener('resize', () => {
  application.resize()
}, true)
