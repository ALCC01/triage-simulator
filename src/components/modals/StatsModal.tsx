import { type FunctionComponent } from 'preact'
import Modal from '.'
import { pct } from '../../utils'
import { allPatients, selectBleedingNotControlled, selectOvertriagedPatients, selectTriagedPatients, selectUndertriagedPatients, useAppSelector } from '../../store'

export const STATS_MODAL_ID = 'stats'

const Figure: FunctionComponent<{ n: string, label: string }> = ({ n, label }) => (
  <li className="flex flex-col items-center col-span-3">
    <span className="block text-5xl font-black mb-1">
      {n}
    </span>
    <span className="block text-xl">{label}</span>
  </li>
)

const StatsModal: FunctionComponent = () => {
  const patients = useAppSelector(allPatients).length
  const triaged = useAppSelector(selectTriagedPatients).length
  const undertriaged = useAppSelector(selectUndertriagedPatients).length
  const overtriaged = useAppSelector(selectOvertriagedPatients).length
  const stillBleeding = useAppSelector(selectBleedingNotControlled).length

  return (
    <Modal name={STATS_MODAL_ID} title='Statistics'>
      <ul className="flex justify-center gap-8 mb-2">
        <Figure n={pct(triaged / patients)} label={`Triaged (${triaged})`} />
      </ul>
      <ul className="flex justify-center gap-8 mb-2">
        <Figure n={pct(undertriaged / triaged)} label={`Undertriaged (${undertriaged})`} />
        <Figure n={pct(overtriaged / triaged)} label={`Overtriaged (${overtriaged})`} />
      </ul>
      <ul className="flex justify-center gap-8">
        <Figure n={stillBleeding.toString()} label='Overseen hemorrages' />
      </ul>
    </Modal>
  )
}

export default StatsModal
