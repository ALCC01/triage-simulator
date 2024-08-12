import { type FunctionComponent } from 'preact'
import { codeToColor, cx } from '../utils'
import Card, { CardHeader } from './Card'
import { allPatients, useAppDispatch, useAppSelector } from '../store'
import { setCurrentPatient, toggleFeedback } from '../store/ui'
import { useGame } from '../hooks'
import Icon from './Icon'
import { type Code } from '../algorithm'
import { useTranslation } from 'react-i18next'

interface PatientDotProps {
  active?: boolean
  value: number
  code: Code
  assignedCode: number
  onSelect: (id: number) => void
  reveal: boolean
}

const PatientDot: FunctionComponent<PatientDotProps> = ({ active, value, code, assignedCode, onSelect, reveal }) => {
  const cls = cx(
    'inline-block m-0.5 appearance-none cursor-pointer',
    codeToColor(assignedCode)[0]
  )

  const wrong = assignedCode !== 0 && code !== assignedCode
  let icon = 'circle'
  if (reveal) {
    if (assignedCode === 0) icon = 'help'
    else if (wrong) icon = 'cancel'
    else if (!wrong) icon = 'check_circle'
  }

  return (
    <a
      href="#"
      value={value}
      className={cls}
      onClick={() => { onSelect(value) }}
    >
      <Icon n={icon} className="text-4xl leading-none align-middle" fill={!(active ?? false)} />
    </a>
  )
}

const SkeletonPatientList: FunctionComponent = () => {
  const { t } = useTranslation()
  const { newGame } = useGame()

  return (
    <button className="flex items-center justify-center md:w-6/12 my-1 mx-auto p-4 text-2xl font-black text-white bg-blue-700 hover:bg-blue-800 transition duration-500" onClick={newGame}>
      <Icon n="add" className="text-4xl" /> {t('New disaster')}
    </button>
  )
}

const PatientList: FunctionComponent = () => {
  const { t } = useTranslation()
  const currentPatientId = useAppSelector((state) => state.ui.currentPatient)
  const patients = useAppSelector(allPatients)
  const revealCodes = useAppSelector((state) => state.ui.revealFeedback)
  const dispatch = useAppDispatch()

  const onSelect = (id: number): void => {
    dispatch(setCurrentPatient(id))
  }

  const onToggleFeedback = (): void => {
    dispatch(toggleFeedback())
  }

  return (
    <Card className="mb-6">
      <CardHeader title={t('Patients')}>
        <button
          className="cursor-pointer"
          title={revealCodes ? t('Hide correct triage codes') : t('Show correct triage codes')}
          aria-label={revealCodes ? t('Hide correct triage codes') : t('Show correct triage codes')}
          onClick={onToggleFeedback}
        >
          <Icon
            n={revealCodes ? 'visibility_off' : 'visibility'}
            className="text-4xl leading-4 align-middle"
          />
        </button>
      </CardHeader>
      <div className="p-2 max-h-36 overflow-scroll flex justify-items-center justify-center flex-wrap">
        {patients.length === 0 && <SkeletonPatientList />}
        {patients.map(({ assignedCode, code, id }) => (
          <PatientDot
            key={id}
            value={id}
            code={code}
            assignedCode={assignedCode ?? 0}
            onSelect={onSelect} active={currentPatientId === id}
            reveal={revealCodes}
          />
        ))}
      </div>
    </Card >
  )
}

export default PatientList
