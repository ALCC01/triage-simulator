import { configureStore } from '@reduxjs/toolkit'
import patients, { patientsAdapter } from './patients'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    patients
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
