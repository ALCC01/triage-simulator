import { createSelector } from '@reduxjs/toolkit'
import { patientsAdapter } from './patients'
import { type RootState } from '.'

export const {
  selectById: patientById,
  selectAll: allPatients
} = patientsAdapter.getSelectors<RootState>((state) => state.patients)

export const selectTriagedPatients = createSelector(
  [allPatients],
  patients => patients.filter(({ assignedCode }) => assignedCode !== undefined)
)

export const selectUndertriagedPatients = createSelector(
  [allPatients],
  patients => patients.filter(({ code, assignedCode }) => code > assignedCode) // eslint-disable-line @typescript-eslint/no-non-null-assertion
)

export const selectOvertriagedPatients = createSelector(
  [allPatients],
  patients => patients.filter(({ code, assignedCode }) => code < assignedCode) // eslint-disable-line @typescript-eslint/no-non-null-assertion
)

export const selectBleedingNotControlled = createSelector(
  [selectTriagedPatients],
  patients => patients.filter(({ bleeding }) => bleeding)
)
