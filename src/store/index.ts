import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { LS_PATIENTS, LS_UI, persistMiddleware } from './persistMiddleware'
import patients from './patients'
import ui from './ui'

const patientsState = JSON.parse(localStorage.getItem(LS_PATIENTS) ?? 'null') ?? undefined
const uiState = JSON.parse(localStorage.getItem(LS_UI) ?? 'null') ?? undefined

export const store = configureStore({
  preloadedState: {
    patients: patientsState,
    ui: uiState
  },
  reducer: {
    patients,
    ui
  },
  middleware: (gDM) => gDM().concat(persistMiddleware.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export * from './selectors'
