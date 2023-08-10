import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UIState {
  currentPatient?: number
  currentModal?: string
}

const initialState: UIState = {}

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
    }
  }
})

export const { setCurrentPatient, openModal, closeModal } = uiSlice.actions

export default uiSlice.reducer
