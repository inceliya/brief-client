import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import loginReducer from './loginReducer'

export const store = configureStore({
  reducer: {
    login: loginReducer
  },
})

export const useAppDispatch = useDispatch;