import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Notification from './components/Notification'
import User from './components/User'
import Home from './components/Home'
import UsersContainer from './components/users/UsersContainer'
import Note from './components/notes/Note'

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
  }, [dispatch])

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      dispatch(setNotes(initialNotes))
    })
  }, [dispatch])

  return (
    <Router>
      <Notification />
      <div className='p-10'>
        <Link className='mr-4' to='/'>
          home
        </Link>
        <Link className='mr-4' to='/users'>
          users
        </Link>
        <User />
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<UsersContainer />} />
        <Route path='/users/:id' element={<UsersContainer />} />
        <Route path='/notes/:id' element={<Note />} />
      </Routes>
    </Router>
  )
}

export default App
