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
    removeNote(state, action) {
      const id = action.payload
      return state.filter(note => note.id !== id)
    },
  },
})

export default noteSlice.reducer
export const { setNotes, appendNote, removeNote } = noteSlice.actions
