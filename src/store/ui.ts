import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UIState {
  currentPatient?: number
  currentModal?: string
  revealCodes: boolean
}

const initialState: UIState = {
  revealCodes: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentPatient: (state, { payload: id }: PayloadAction<number>) => {
      state.currentPatient = id
    },
    openModal: (state, { payload: id }: PayloadAction<string>) => {
      state.currentModal = id
    },
    closeModal: (state) => {
      state.currentModal = undefined
    },
    toggleRevealCodes: (state) => {
      state.revealCodes = !state.revealCodes
    }
  }
})

export const { setCurrentPatient, openModal, closeModal, toggleRevealCodes } = uiSlice.actions

export default uiSlice.reducer
