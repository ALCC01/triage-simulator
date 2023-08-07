import { type PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { randomBool, randomFloat, randomInt } from '../utils'

export enum Code {
  EXPECTANT = 4,
  IMMEDIATE = 3,
  DELAYED = 2,
  MINOR = 1
}

export class Patient {
  id: number
  age: number
  code: Code
  assignedCode?: Code
  bleeding?: boolean
  walking?: boolean
  breathing?: boolean
  airwayObstruction: boolean
  airwayCleared?: boolean
  respiratoryRate?: number
  capillaryRefill?: number
  obeys?: boolean

  constructor () {
    this.id = randomInt(0, 500)
    this.age = randomInt(0, 80)
    this.code = randomInt(0, 5)
    this.airwayObstruction = this.code === Code.IMMEDIATE ? randomBool(0.3) : false
  }
}

export const patientsAdapter = createEntityAdapter<Patient>()

const initialState = patientsAdapter.getInitialState()

export const counterSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient: patientsAdapter.addMany,
    removePatient: patientsAdapter.removeOne,
    controlBleeding: (state, { payload: id }: PayloadAction<number>) => {
      patientsAdapter.updateOne(state, { id, changes: { bleeding: false } })
    },
    clearAirway: (state, { payload: id }: PayloadAction<number>) => {
      patientsAdapter.updateOne(state, { id, changes: { airwayCleared: true } })
    },
    checkRespiratoryRate: (state, { payload: id }: PayloadAction<number>) => {
      const patient = state.entities[id]
      if (patient === undefined) return

      const code = patient.code
      const obstructed = patient.airwayObstruction && patient.airwayCleared !== true

      let respiratoryRate = 0
      if (code < Code.IMMEDIATE) respiratoryRate = randomInt(5, 30)
      if (code === Code.IMMEDIATE) respiratoryRate = obstructed ? 0 : randomInt(30, 50)

      patientsAdapter.updateOne(state, { id, changes: { respiratoryRate } })
    },
    checkCapillaryRefill: (state, { payload: id }: PayloadAction<number>) => {
      const patient = state.entities[id]
      if (patient === undefined) return

      const code = patient.code
      const capillaryRefill = code >= Code.IMMEDIATE ? randomFloat(2, 10) : randomFloat(0, 2)
      patientsAdapter.updateOne(state, { id, changes: { capillaryRefill } })
    },
    checkMentalStatus: (state, { payload: id }: PayloadAction<number>) => {
      const patient = state.entities[id]
      if (patient === undefined) return

      const code = patient.code
      const obeys = code < Code.IMMEDIATE
      patientsAdapter.updateOne(state, { id, changes: { obeys } })
    },
    checkWalking: (state, { payload: id }: PayloadAction<number>) => {
      const patient = state.entities[id]
      if (patient === undefined) return

      const code = patient.code
      const walking = code <= Code.MINOR
      patientsAdapter.updateOne(state, { id, changes: { walking } })
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
} = counterSlice.actions

export default counterSlice.reducer
