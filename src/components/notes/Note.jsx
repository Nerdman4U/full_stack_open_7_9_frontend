import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as commentService from '../../services/comments'
import {
  setNotification,
  clearNotification,
} from '../../reducers/notificationReducer'
import { appendComment } from '../../reducers/noteReducer'

const Note = () => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const note_id = useParams().id
  const note = useSelector(state =>
    state.notes.find(note => note.id === note_id),
  )
  if (!note) return null

  const handleChangeComment = e => {
    setComment(e.target.value)
  }
  const addCommit = e => {
    e.preventDefault()
    commentService
      .create(note.id, comment)
      .then(response => response.json())
      .then(returnedComment => {
        console.log(returnedComment, 'note.id:', note.id)
        dispatch(appendComment({ id: note.id, comment: returnedComment }))
      })
      .then(() => setComment(''))
      .then(() => {
        dispatch(setNotification('Comment added!'))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 3000)
        //window.location.reload()
      })
  }

  return (
    <>
      <h1>{note.content}</h1>
      <div>Important: {note.important ? 'true' : 'false'}</div>
      <div>
        <h3>Comments</h3>
        <form onSubmit={addCommit}>
          <input onChange={handleChangeComment} value={comment} />
          <button type='submit'>add comment</button>
        </form>
        <ul>
          {note.comments?.map(comment => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Note
