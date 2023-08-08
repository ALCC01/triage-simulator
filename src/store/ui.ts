import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UIState {
  currentPatient?: number
}

const initialState: UIState = {}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentPatient: (state, { payload: id }: PayloadAction<number>) => {
      state.currentPatient = id
    }
  }
})

export const { setCurrentPatient } = uiSlice.actions

export default uiSlice.reducer
