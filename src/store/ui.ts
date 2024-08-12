import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import i18n, { type Locale } from '../i18n'

interface UIState {
  currentPatient?: number
  currentModal?: string
  revealFeedback: boolean
  locale: Locale
}

const initialState: UIState = {
  revealFeedback: false,
  locale: 'en'
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentPatient: (state, { payload: id }: PayloadAction<number | undefined>) => {
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
    },
    setLocale: (state, { payload: locale }: PayloadAction<Locale>) => {
      console.log(locale)
      state.locale = locale
      void i18n.changeLanguage(locale)
    }
  }
})

export const { setCurrentPatient, openModal, closeModal, toggleFeedback, setLocale } = uiSlice.actions

export default uiSlice.reducer
