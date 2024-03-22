import { useSelector, useDispatch } from 'react-redux'
import { useState, useRef } from 'react'
import LoginForm from './LoginForm'
import loginService from '../services/login'
import noteService from '../services/notes'
import { appendNote } from '../reducers/noteReducer'
import { setUser, clearUser } from '../reducers/userReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'

const User = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('username1')
  const [password, setPassword] = useState('password1')
  const [loginVisible, setLoginVisible] = useState(false)

  console.log('User.user', user)

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong credentials'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(clearUser())
    noteService.setToken(null)
  }

  return (
    <>
      {!user && loginForm()}
      {user && (
        <div>
          {user.name} logged in
          <input type='button' onClick={() => logout()} value='logout' />
        </div>
      )}
    </>
  )
}

export default User
