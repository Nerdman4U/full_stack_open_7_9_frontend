import { createSlice } from '@reduxjs/toolkit'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    setNotes(state, action) {
      return action.payload
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    appendComment(state, action) {
      const id = action.payload.id
      const comment = action.payload.comment
      const note = state.find(note => note.id === id)
      if (!note) return state
      const modifiedNote = {
        ...note,
        comments: [...note.comments, comment],
      }
      return state.map(n => (n.id !== note.id ? n : modifiedNote))
    },
    removeNote(state, action) {
      const id = action.payload
      return state.filter(note => note.id !== id)
    },
  },
})

export default noteSlice.reducer
export const { setNotes, appendNote, appendComment, removeNote } =
  noteSlice.actions
