import { type FunctionComponent } from 'preact'
import { cx } from '../../utils'
import Icon from '../Icon'
import TagRow from './TagRow'
import TagCell from './TagCell'

const TagTool: FunctionComponent<{ n: string }> = ({ n }) => {
  const cls = cx(
    'flex col-span-2 bg-blue-600 transition duration-500',
    'hover:bg-blue-800 active:bg-blue-800'
  )

  return (
    <button className={cls}>
      <Icon n={n} className='text-3xl md:text-5xl block m-auto' />
    </button>
  )
}

const TagCodeButton: FunctionComponent<{ value: number, className?: string, checked: boolean }> = ({ value, className, checked }) => {
  const cls = cx(
    'flex col-span-1 group appearance-none transition duration-500 cursor-pointer',
    className
  )

  return (
    <input type="radio" name="triage-code" value={value} checked={checked} className={cls}>
      <Icon n='check_circle' className='hidden group-checked:block text-4xl md:text-6xl block m-auto' />
    </input>
  )
}

const TagCodeSelector: FunctionComponent<{ value?: number }> = ({ value }) => (
  <div className="grid grid-cols-4 h-20 text-white cursor-pointer">
    <TagCodeButton value={4} checked={value === 4} className="bg-gray-900" />
    <TagCodeButton value={3} checked={value === 3} className="bg-red-600" />
    <TagCodeButton value={2} checked={value === 2} className="bg-amber-400" />
    <TagCodeButton value={1} checked={value === 1} className="bg-green-500" />
  </div>
)

const TriageTag: FunctionComponent = () => {
  return (
    <div className="m-auto w-full lg:w-5/12 h-min bg-white shadow-lg">
      <h1 className="text-xl font-black p-4 border-b-4 border-black">Triage Tag <span className="text-gray-600">#1</span></h1>
      <TagRow border>
        <TagCell title='Name' span={9}>Mario Rossi</TagCell>
        <TagCell title='Age' span={3}>78yrs</TagCell>
      </TagRow>
      <TagRow>
        <TagCell title='Hemorrage' span={6}><span className="text-red-600">Bleeding</span></TagCell>
        <TagCell title='Mobility' span={6}>Walking</TagCell>
      </TagRow>
      <TagRow>
        <TagCell title='Airway' span={4}>✓</TagCell>
        <TagCell title='Respiratory rate' span={4}>28</TagCell>
        <TagCell title='Capillary refill' span={4}>1.81s</TagCell>
      </TagRow>
      <TagRow>
        <TagCell title='Mental status'>Obeys</TagCell>
      </TagRow>
      <TagRow className='text-white border-b-0 divide-x-0'>
        <TagTool n='directions_walk' />
        <TagTool n='healing' />
        <TagTool n='respiratory_rate' />
        <TagTool n='ent' />
        <TagTool n='ecg' />
        <TagTool n='cognition' />
      </TagRow>
      <TagCodeSelector />
    </div >
  )
}

export default TriageTag
