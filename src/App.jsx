import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Notes from './components/Notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import User from './components/User'

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
    <div>
      <h1>Notes</h1>
      <Notification />
      <User />
      <Notes />
      <Footer />
    </div>
  )
}

export default App
