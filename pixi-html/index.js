import './style.css'
import { list as listUsers } from './users'
import list from './list'
import initStats from './stats'

initStats()

const listNode = document.querySelector('div[role="list"]')

list(listNode)

listUsers().then(users => {

})
