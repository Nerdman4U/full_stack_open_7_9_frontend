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
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2'
            onClick={toggleImportance}>
            {label}
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2'
            onClick={remove}>
            remove
          </button>
        </>
      )}
    </li>
  )
}

export default Note
