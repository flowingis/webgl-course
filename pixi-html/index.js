import { list as listUsers } from './users'
import list from './list'
import initStats from './stats'

initStats()

const listNode = document.querySelector('div[role="list"]')

const listElement = list(listNode)

listUsers().then(users => {
  listElement.setUsers(users)
})

window.addEventListener('resize', () => {
  listElement.resize()
}, true)
