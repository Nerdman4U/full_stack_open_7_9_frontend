import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Note = () => {
  const note_id = useParams().id
  const note = useSelector(state =>
    state.notes.find(note => note.id === note_id),
  )
  if (!note) return null

  return (
    <>
      <h1>{note.content}</h1>
      <div>Important: {note.important ? 'true' : 'false'}</div>
    </>
  )
}

export default Note
