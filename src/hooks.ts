import { useCallback, useEffect } from 'preact/hooks'
import { START } from './algorithm'
import { useAppDispatch, useAppSelector } from './store'
import { addPatient, clearPatients } from './store/patients'
import { closeModal, openModal, setCurrentPatient } from './store/ui'
import { randomInt } from './utils'

export const useGame = (): { newGame: () => void } => {
  const dispatch = useAppDispatch()

  const newGame = useCallback((): void => {
    dispatch(clearPatients())
    dispatch(addPatient(new Array(80).fill(0).map((_, i) => START.newPatient(randomInt(1, 5), i + 1))))
    dispatch(setCurrentPatient(undefined))
  }, [dispatch])

  return { newGame }
}

interface UseModal { isOpen: boolean, close: () => void, open: () => void }

export const useModal = (name: string): UseModal => {
  const currentModal = useAppSelector((state) => state.ui.currentModal)
  const dispatch = useAppDispatch()

  const isOpen = currentModal === name
  const close = useCallback((): void => { dispatch(closeModal()) }, [dispatch])
  const open = useCallback((): void => { dispatch(openModal(name)) }, [dispatch, name])

  return { isOpen, close, open }
}

export const useHotkey = (key: string, callback: () => void): void => {
  const keydownListener = useCallback((e: KeyboardEvent) => {
    const { key: eventKey, repeat } = e
    if (repeat) return
    if (key !== eventKey) return

    callback()
  }, [key, callback])

  useEffect(() => {
    window.addEventListener('keydown', keydownListener, true)
    return () => { window.removeEventListener('keydown', keydownListener, true) }
  }, [keydownListener])
}
