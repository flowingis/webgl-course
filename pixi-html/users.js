import data from './data/users'
export const list = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([...data].map((user, index) => {
      return Object.assign({}, user, {picture: user.picture + (index % 10)})
    }))
  }, 500)
})
