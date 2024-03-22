const baseUrl = '/api/users'

const getAll = () => {
  return fetch(baseUrl).then(res => res.json())
}

export { getAll }
