import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UIState {
  currentPatient?: number
  currentModal?: string
  revealFeedback: boolean
}

const initialState: UIState = {
  revealFeedback: false
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
    toggleFeedback: (state) => {
      state.revealFeedback = !state.revealFeedback
    }
  }
})

export const { setCurrentPatient, openModal, closeModal, toggleFeedback } = uiSlice.actions

export default uiSlice.reducer
