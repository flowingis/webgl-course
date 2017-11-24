export default () => {
  const body = document.querySelector('table[role="list"] tbody')
  const template = document.querySelector('#user-row')

  const createNode = (user, index) => {
    const node = template.content.cloneNode(true)
    node.querySelector('td[role="photo"]').innerHTML = `<img src="${user.picture + (index % 10)}" width="50"/>`
    node.querySelector('td[role="name"]').innerHTML = user.name
    return node
  }

  const setData = users => {
    body.innerHTML = ''
    users.forEach((user, index) => {
      const node = createNode(user, index)
      body.appendChild(node)
    })
  }

  return {
    setData
  }
}
