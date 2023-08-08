import { type PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { START, type Code, type Patient } from '../algorithm'

export const patientsAdapter = createEntityAdapter<Patient>()

const initialState = patientsAdapter.getInitialState()

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient: patientsAdapter.addMany,
    removePatient: patientsAdapter.removeOne,
    controlBleeding: (state, { payload: id }: PayloadAction<number>) => {
      patientsAdapter.updateOne(state, { id, changes: START.controlBleeding() })
    },
    clearAirway: (state, { payload: id }: PayloadAction<number>) => {
      patientsAdapter.updateOne(state, { id, changes: START.clearAirway() })
    },
    checkRespiratoryRate: (state, { payload: id }: PayloadAction<number>) => {
      const patient = state.entities[id]
      if (patient === undefined) throw new Error('Patient not found')

      patientsAdapter.updateOne(state, { id, changes: START.checkRespiratoryRate(patient) })
    },
    checkCapillaryRefill: (state, { payload: id }: PayloadAction<number>) => {
      const patient = state.entities[id]
      if (patient === undefined) throw new Error('Patient not found')

      patientsAdapter.updateOne(state, { id, changes: START.checkCapillaryRefill(patient) })
    },
    checkMentalStatus: (state, { payload: id }: PayloadAction<number>) => {
      const patient = state.entities[id]
      if (patient === undefined) throw new Error('Patient not found')

      patientsAdapter.updateOne(state, { id, changes: START.checkMentalStatus(patient) })
    },
    checkWalking: (state, { payload: id }: PayloadAction<number>) => {
      const patient = state.entities[id]
      if (patient === undefined) throw new Error('Patient not found')

      patientsAdapter.updateOne(state, { id, changes: START.checkWalking(patient) })
    },
    setCode: (state, { payload: [id, code] }: PayloadAction<[number, Code]>) => {
      patientsAdapter.updateOne(state, { id, changes: { assignedCode: code } })
    }
  }
})

export const {
  addPatient, removePatient, controlBleeding, clearAirway,
  checkRespiratoryRate, checkCapillaryRefill, checkMentalStatus, checkWalking,
  setCode
} = patientSlice.actions

export default patientSlice.reducer
