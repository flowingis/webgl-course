import './style.css'
import { list } from './users'
import tableFactory from './table'
import initStats from './stats'

initStats()

const table = tableFactory()

list().then(table.setData)
