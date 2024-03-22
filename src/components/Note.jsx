import { useSelector, useDispatch } from 'react-redux'
import noteService from '../services/notes'
import { removeNote } from '../reducers/noteReducer'
import { Link } from 'react-router-dom'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'

const Note = ({ note, toggleImportance, remove }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <span>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </span>
      {user && (
        <>
          <button onClick={toggleImportance}>{label}</button>
          <button onClick={remove}>remove</button>
        </>
      )}
    </li>
  )
}

export default Note
