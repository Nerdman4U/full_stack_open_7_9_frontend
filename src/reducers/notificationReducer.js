import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { type: 'error', message: '' },
  reducers: {
    setNotification(state, action) {
      return { type: 'info', message: action.payload }
    },
    setError(state, action) {
      return { type: 'error', message: action.payload }
    },
    clearNotification(state, action) {
      return { type: 'info', message: '' }
    },
  },
})

export default notificationSlice.reducer
export const { setNotification, setError, clearNotification } =
  notificationSlice.actions
