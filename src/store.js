import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import noteReducer from './reducers/noteReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    notes: noteReducer,
  },
})

export default store
