import { type TypedStartListening, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { type AppDispatch, type RootState } from '.'
import { addPatient, clearPatients, removePatient, executeAction, setCode } from './patients'

export const LS_PATIENTS = 'patients'

export const persistMiddleware = createListenerMiddleware()

export const startListening = persistMiddleware.startListening as TypedStartListening<RootState, AppDispatch>

startListening({
  matcher: isAnyOf(addPatient, removePatient, clearPatients, executeAction, setCode),
  effect: (_, listener) => {
    localStorage.setItem(LS_PATIENTS, JSON.stringify(listener.getState().patients))
  }
})
