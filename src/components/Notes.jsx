import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Note from './Note'
import noteService from '../services/notes'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'
import { setNotes } from '../reducers/noteReducer'

const Notes = () => {
  const [showAll, setShowAll] = useState(true)
  const notes = useSelector(state => state.notes)
  const dispatch = useDispatch()

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        dispatch(
          setNotes(notes.map(note => (note.id !== id ? note : returnedNote))),
        )
      })
      .catch(error => {
        const msg = `Note '${note.content}' was already removed from server`
        dispatch(setNotification(msg))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
      })
  }

  return (
    <>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </>
  )
}

export default Notes
