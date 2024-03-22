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
    toggleImportanceOf(state, action) {
      const id = action.payload
      const note = state.find(n => n.id === id)
      note.important = !note.important
    },
  },
})

export default noteSlice.reducer
export const { setNotes, appendNote, toggleImportanceOf } = noteSlice.actions
