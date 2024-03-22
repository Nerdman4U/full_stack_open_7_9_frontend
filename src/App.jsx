import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Notification from './components/Notification'
import User from './components/User'
import Home from './components/Home'
import Users from './components/Users'

import noteService from './services/notes'

import { setNotes } from './reducers/noteReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      dispatch(setNotes(initialNotes))
    })
  }, [dispatch])

  return (
    <Router>
      <div>
        <Link to='/'>home</Link>
        <Link to='/users'>users</Link>
      </div>
      <Notification />
      <User />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </Router>
  )
}

export default App
