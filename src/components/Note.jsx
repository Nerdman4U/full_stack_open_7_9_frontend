import { useSelector, useDispatch } from 'react-redux'
import noteService from '../services/notes'
import { removeNote } from '../reducers/noteReducer'

const Note = ({ note, toggleImportance }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const label = note.important ? 'make not important' : 'make important'

  const remove = () => {
    if (!user) {
      console.error('No user')
      return
    }
    const id = note.id
    noteService.remove(id).then(() => {
      dispatch(removeNote(id))
    })
  }

  return (
    <li className='note'>
      <span>{note.content}</span>
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
