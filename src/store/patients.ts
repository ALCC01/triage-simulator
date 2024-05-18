import { type PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { START, type StartPatient } from '../algorithms/START'
import { type Code } from '../algorithms'

export const patientsAdapter = createEntityAdapter<StartPatient>()

const initialState = patientsAdapter.getInitialState()

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient: patientsAdapter.addMany,
    removePatient: patientsAdapter.removeOne,
    clearPatients: patientsAdapter.removeAll,
    executeAction: (state, { payload: [id, action] }: PayloadAction<[number, any]>) => {
      const patient = state.entities[id]
      if (patient === undefined) throw new Error('Patient not found')

      patientsAdapter.updateOne(state, { id, changes: START.action(action, patient) })
    },
    setCode: (state, { payload: [id, code] }: PayloadAction<[number, Code]>) => {
      patientsAdapter.updateOne(state, { id, changes: { assignedCode: code } })
    }
  }
})

// TODO When crearing an action remember to add it to the matcher in persistMiddleware.ts too
export const {
  addPatient, removePatient, clearPatients, executeAction, setCode
} = patientSlice.actions

export default patientSlice.reducer
