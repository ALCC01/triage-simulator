import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import patients, { patientsAdapter } from './patients'
import ui from './ui'

export const store = configureStore({
  reducer: {
    patients,
    ui
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const {
  selectById: patientById,
  selectAll: allPatients
} = patientsAdapter.getSelectors<RootState>((state) => state.patients)
