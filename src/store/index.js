import { configureStore } from '@reduxjs/toolkit'
import statementReducer from './feature/statementSlice'

export const store = configureStore({
  reducer: {
    statement: statementReducer
  },
})