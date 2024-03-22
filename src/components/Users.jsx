import { useState, useEffect } from 'react'
import * as usersService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService.getAll().then(users => {
      setUsers(users)
      console.log(users)
    })
  }, [])

  const sorted = () => {
    return [...users].sort((a, b) => (b.name < a.name ? 1 : -1))
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Notes created</th>
          </tr>
          {sorted().map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.notes.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
