const baseUrl = '/api/notes'

const create = async (id, content) => {
  return fetch(`${baseUrl}/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: content }),
  })
}

export { create }
