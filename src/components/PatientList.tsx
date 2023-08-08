import { type FunctionComponent } from 'preact'
import { codeToColor, cx } from '../utils'
import Card from './Card'
import { allPatients, useAppDispatch, useAppSelector } from '../store'
import { setCurrentPatient } from '../store/ui'

interface PatientDotProps { active?: boolean, value: number, code: number, onSelect: (id: number) => void }

const PatientDot: FunctionComponent<PatientDotProps> = ({ active, value, code, onSelect }) => {
  const cls = cx(
    'inline-block h-6 w-6 mx-1 rounded-full appearance-none cursor-pointer',
    active === true && 'border-4 bg-white',
    code === 0 && (active === true ? 'border-gray-400' : 'bg-gray-400'),
    code !== 0 && (active === true ? codeToColor(code)[1] : codeToColor(code)[0])
  )

  return (
    <input type="radio" name="current-patient" value={value} checked={active} className={cls} onClick={() => { onSelect(value) }} />
  )
}

const PatientList: FunctionComponent = () => {
  const currentPatientId = useAppSelector((state) => state.ui.currentPatient)
  const patients = useAppSelector(allPatients)
  const dispatch = useAppDispatch()

  const onSelect = (id: number): void => {
    dispatch(setCurrentPatient(id))
  }

  return (
    <Card className="mb-6">
      <div className="p-2 lg:px-3 border-b-4 border-black">
        <p className="text-2xl md:text-3xl font-bold">Patients</p>
      </div>
      <div className="p-2 max-h-36 overflow-scroll">
        {patients.map(({ assignedCode, id }) => (
          <PatientDot key={id} value={id} code={assignedCode ?? 0} onSelect={onSelect} active={currentPatientId === id} />
        ))}
      </div>
    </Card>
  )
}

export default PatientList
