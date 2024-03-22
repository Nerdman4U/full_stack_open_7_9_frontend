import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Note from './Note'
import noteService from '../services/notes'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'
import { setNotes, appendNote, removeNote } from '../reducers/noteReducer'
import Togglable from './Togglable'
import NoteForm from './NoteForm'

const Notes = () => {
  const [showAll, setShowAll] = useState(true)
  const notes = useSelector(state => state.notes)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  const noteFormRef = useRef()

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

  const addNote = noteObject => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then(returnedNote => {
      dispatch(appendNote(returnedNote))
    })
  }

  const remove = note => {
    if (!user) {
      console.error('No user')
      return
    }
    const id = note.id
    noteService.remove(id).then(() => {
      dispatch(removeNote(id))
      dispatch(setNotification(`Note '${note.content}' removed`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    })
  }

  return (
    <>
      {user && (
        <Togglable buttonLabel='new note' ref={noteFormRef}>
          <NoteForm createNote={addNote} />
        </Togglable>
      )}
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
            remove={() => remove(note)}
          />
        ))}
      </ul>
    </>
  )
}

export default Notes
