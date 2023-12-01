import { configureStore } from '@reduxjs/toolkit'
import statementReducer from './feature/statementSlice'
import userReducer from './feature/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    statement: statementReducer,
  },
})