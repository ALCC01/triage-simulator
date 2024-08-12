import { type FunctionComponent } from 'preact'
import Modal from '.'
import { pct } from '../../utils'
import { allPatients, selectBleedingNotControlled, selectOvertriagedPatients, selectTriagedPatients, selectUndertriagedPatients, useAppSelector } from '../../store'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <Modal name={STATS_MODAL_ID} title={t('Statistics')}>
      <ul className="flex justify-center gap-8 mb-2">
        <Figure n={pct(triaged / patients)} label={t('Triaged ({{n}})', { n: triaged })} />
      </ul>
      <ul className="flex justify-center gap-8 mb-2">
        <Figure n={pct(undertriaged / triaged)} label={t('Undertriaged  ({{n}})', { n: undertriaged })} />
        <Figure n={pct(overtriaged / triaged)} label={t('Overtriaged ({{n}})', { n: overtriaged })} />
      </ul>
      <ul className="flex justify-center gap-8">
        <Figure n={stillBleeding.toString()} label={t('Overlooked bleeds')} />
      </ul>
    </Modal>
  )
}

export default StatsModal
