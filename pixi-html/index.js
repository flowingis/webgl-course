import './style.css'
import { list } from './users'
import tableFactory from './table'

const table = tableFactory()

list().then(table.setData)
