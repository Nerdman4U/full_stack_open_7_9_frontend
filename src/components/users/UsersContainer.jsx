import { useState, useEffect } from 'react'
import * as usersService from '../../services/users'
import { Link, useParams } from 'react-router-dom'

import Users from './Users'
import User from './User'

const UsersContainer = () => {
  const [users, setUsers] = useState([])

  const user_id = useParams().id
  const user = users.find(user => user.id === user_id)

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
    <>
      {user && <User user={user} />}
      {!user && <Users users={sorted()} />}
    </>
  )
}

export default UsersContainer
