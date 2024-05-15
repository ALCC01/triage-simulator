import { type FunctionComponent } from 'preact'
import { codeToColor, cx } from '../utils'
import Card, { CardHeader } from './Card'
import { allPatients, useAppDispatch, useAppSelector } from '../store'
import { setCurrentPatient, toggleFeedback } from '../store/ui'
import { useGame } from '../hooks'
import Icon from './Icon'
import { type Code } from '../algorithm'

interface PatientDotProps {
  active?: boolean
  value: number
  code: Code
  assignedCode: number
  onSelect: (id: number) => void
  reveal: boolean
}

const PatientDot: FunctionComponent<PatientDotProps> = ({ active, value, code, assignedCode, onSelect, reveal }) => {
  let cls = cx(
    'inline-block h-6 w-6 mx-1 appearance-none cursor-pointer',
    active === true && 'border-4 bg-white',
    assignedCode === 0 && (active === true ? 'border-gray-400' : 'bg-gray-400')
  )

  if (reveal) {
    cls = cx(
      cls,
      assignedCode !== 0 && code !== assignedCode ? 'rounded-none' : 'rounded-full',
      assignedCode !== 0 && (active === true ? codeToColor(code)[1] : codeToColor(code)[0])
    )
  } else {
    cls = cx(
      cls,
      'rounded-full',
      assignedCode !== 0 && (active === true ? codeToColor(assignedCode)[1] : codeToColor(assignedCode)[0])
    )
  }

  return (
    <a
      href="#"
      value={value}
      className={cls}
      onClick={() => { onSelect(value) }}
    />
  )
}

const SkeletonPatientList: FunctionComponent = () => {
  const { newGame } = useGame()

  return (
    <button className="flex items-center justify-center md:w-6/12 my-1 mx-auto p-4 text-2xl font-black text-white bg-blue-700 hover:bg-blue-800 transition duration-500" onClick={newGame}>
      <Icon n="add" className="text-4xl" /> New disaster
    </button>
  )
}

const PatientList: FunctionComponent = () => {
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
      <CardHeader title="Patients">
        <button
          className="cursor-pointer"
          title={`${revealCodes ? 'Hide' : 'Reveal'} correct triage codes`}
          aria-label={`${revealCodes ? 'Hide' : 'Reveal'} correct triage codes`}
          onClick={onToggleFeedback}
        >
          <Icon
            n={revealCodes ? 'visibility_off' : 'visibility'}
            className="text-4xl leading-4 align-middle"
          />
        </button>
      </CardHeader>
      <div className="p-2 max-h-36 overflow-scroll">
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
