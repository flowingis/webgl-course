import { loader, Container } from 'pixi.js'
import { Resource } from 'resource-loader'
import { stripPx } from './utils'
import listItemFactory from './listitem'
import { PLACEHOLDER_URL, ERRORED_IMAGE_URL } from './photo'
import { uniq } from 'lodash'
import style from './style.css'

const ROW_HEIGHT = stripPx(style['row-height'])
const ROW_WIDTH = stripPx(style['row-width'])
const NAV_WIDTH = stripPx(style['nav-width'])

export default (app, node) => {
  let users = []
  let onUserClick = () => {}

  const initialTop = node.getBoundingClientRect().y

  const container = new Container()
  container.x = 0
  container.y = 0

  const getCoords = index => {
    const elementsPerRow = Math.floor((window.innerWidth - NAV_WIDTH) / ROW_WIDTH)
    const x = ROW_WIDTH * (index % elementsPerRow)
    const y = Math.floor(index / elementsPerRow) * ROW_HEIGHT
    return {
      x, y
    }
  }

  const setUsers = u => {
    users = u

    container.height = node.height

    loader.add([PLACEHOLDER_URL, ERRORED_IMAGE_URL]).load(() => {
      const pictures = uniq(users.map(u => u.picture))
      pictures.forEach(picture => {
        loader.add(picture, picture, {
          loadType: Resource.LOAD_TYPE.IMAGE
        })
      })

      const rows = users.map((user, index) => {
        const coords = getCoords(index)
        return listItemFactory({
          coords,
          app,
          user,
          index,
          showSeparator: index !== users.length - 1,
          onClick: (user) => {
            onUserClick(user)
          }
        })
      })

      rows.forEach(row => {
        container.addChild(row.element)
      })
    })
  }

  const onScroll = () => {
    container.y = -1 * Math.max(0, window.pageYOffset - initialTop)
  }

  return {
    element: container,
    setUsers,
    onScroll,
    setOnUserClick: cb => {
      onUserClick = cb
    }
  }
}
