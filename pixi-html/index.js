import style from './style.css'
import { list as listUsers } from './users'
import list from './list'
import initStats from './stats'

console.log(style)

initStats()

const listNode = document.querySelector('div[role="list"]')

list(listNode)

listUsers().then(users => {

})
