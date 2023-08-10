import { type TypedStartListening, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { type AppDispatch, type RootState } from '.'
import { addPatient, checkCapillaryRefill, checkMentalStatus, checkRespiratoryRate, checkWalking, clearAirway, clearPatients, controlBleeding, removePatient, setCode } from './patients'

export const LS_PATIENTS = 'patients'

export const persistMiddleware = createListenerMiddleware()

export const startListening = persistMiddleware.startListening as TypedStartListening<RootState, AppDispatch>

startListening({
  matcher: isAnyOf(addPatient, removePatient, clearPatients, controlBleeding, clearAirway,
    checkRespiratoryRate, checkCapillaryRefill, checkMentalStatus, checkWalking,
    setCode),
  effect: (_, listener) => {
    localStorage.setItem(LS_PATIENTS, JSON.stringify(listener.getState().patients))
  }
})
