import data from './data/users'
export const list = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(data)
  }, 500)
})
