import { type FunctionComponent } from 'preact'
import { patientById, useAppDispatch, useAppSelector } from '../../store'
import { checkCapillaryRefill, checkMentalStatus, checkRespiratoryRate, checkWalking, clearAirway, controlBleeding, setCode } from '../../store/patients'
import { type Code } from '../../algorithm'
import TagRow from './TagRow'
import TagCell from './TagCell'
import TagTool from './TagTool'
import TagCodeButton from './TagCodeButton'
import Card from '../Card'

const TagCodeSelector: FunctionComponent<{ value?: number, onChange: (code: Code) => void }> = ({ value, onChange }) => (
  <div className="grid grid-cols-4 h-20 text-white cursor-pointer">
    <TagCodeButton onClick={onChange} value={4} checked={value === 4} className="bg-gray-900" />
    <TagCodeButton onClick={onChange} value={3} checked={value === 3} className="bg-red-600" />
    <TagCodeButton onClick={onChange} value={2} checked={value === 2} className="bg-amber-400" />
    <TagCodeButton onClick={onChange} value={1} checked={value === 1} className="bg-green-500" />
  </div>
)

const TriageTag: FunctionComponent = () => {
  const currentPatientId = useAppSelector((state) => state.ui.currentPatient)
  const patient = useAppSelector((state) => patientById(state, currentPatientId ?? 0))
  const dispatch = useAppDispatch()

  if (currentPatientId === undefined) return <></>
  if (patient === undefined) return <></>

  return (
    <Card className='h-min'>
      <TagRow border>
        <TagCell title='Triage tag' span={9}>#{patient.id.toString().padStart(4, '0')}</TagCell>
        <TagCell title='Age' span={3}>{patient.age} yrs</TagCell>
      </TagRow>
      <TagRow>
        <TagCell title='Hemorrhage' span={6}>
          {patient.bleedingControlled === true && <span className="text-green-600">Controlled</span>}
          {patient.bleeding && patient.bleedingControlled !== true && <span className="text-red-600">Bleeding</span>}
          {!patient.bleeding && patient.bleedingControlled !== true && 'Not bleeding'}
        </TagCell>
        <TagCell title='Mobility' span={6}>
          {patient.walking === undefined && '--'}
          {patient.walking === true && 'Walking'}
          {patient.walking === false && 'Not walking'}
        </TagCell>
      </TagRow>
      <TagRow>
        <TagCell title='Airway' span={4}>
          {patient.airwayCleared === undefined ? '--' : 'In place'}
        </TagCell>
        <TagCell title='Respiratory rate' span={4}>
          {patient.respiratoryRate === undefined ? '--' : patient.respiratoryRate}
        </TagCell>
        <TagCell title='Capillary refill' span={4}>
          {patient.capillaryRefill === undefined ? '--' : `${patient.capillaryRefill.toFixed(2)}s`}
        </TagCell>
      </TagRow>
      <TagRow>
        <TagCell title='Mental status'>
          {patient.obeys === undefined && '--'}
          {patient.obeys === true && 'Obeys'}
          {patient.obeys === false && 'Doesn\'t obey'}
        </TagCell>
      </TagRow>
      <div className='flex flex-1 h-20 text-white'>
        <TagTool title='Check mobility' id='check-mobility' n='directions_walk' onClick={() => dispatch(checkWalking(patient.id))} />
        <TagTool title='Control bleeding' id='control-bleed' n='healing' onClick={() => dispatch(controlBleeding(patient.id))} />
        <TagTool title='Respiratory rate' id='check-rr' n='respiratory_rate' onClick={() => dispatch(checkRespiratoryRate(patient.id))} />
        <TagTool title='Place airway' id='place-airway' n='ent' onClick={() => dispatch(clearAirway(patient.id))} />
        <TagTool title='Capillary refill' id='check-capillary-refill' n='ecg' onClick={() => dispatch(checkCapillaryRefill(patient.id))} />
        <TagTool title='Mental status' id='check-mental-statumobilitys' n='cognition' onClick={() => dispatch(checkMentalStatus(patient.id))} />
      </div>
      <TagCodeSelector value={patient.assignedCode} onChange={(code: Code) => dispatch(setCode([patient.id, code]))} />
    </Card >
  )
}

export default TriageTag
