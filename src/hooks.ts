import { START } from './algorithm'
import { useAppDispatch } from './store'
import { addPatient, clearPatients } from './store/patients'
import { setCurrentPatient } from './store/ui'
import { randomInt } from './utils'

export const useGame = (): { newGame: () => void } => {
  const dispatch = useAppDispatch()

  const newGame = (): void => {
    dispatch(clearPatients())
    dispatch(addPatient(new Array(80).fill(0).map((_, i) => START.newPatient(randomInt(1, 5), i + 1))))
    dispatch(setCurrentPatient(1))
  }

  return { newGame }
}
