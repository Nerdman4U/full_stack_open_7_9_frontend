import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div className='m-10'>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Notes created</th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.notes.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
