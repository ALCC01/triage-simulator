import { type FunctionComponent } from 'preact'
import { type Code } from '../../store/patients'
import { cx } from '../../utils'
import Icon from '../Icon'

interface TagCodeButtonProps { value: Code, className?: string, checked: boolean, onClick: (code: Code) => void }

const TagCodeButton: FunctionComponent<TagCodeButtonProps> = ({ value, className, checked, onClick }) => {
  const cls = cx(
    'flex col-span-1 group appearance-none transition duration-500 cursor-pointer',
    className
  )

  return (
    <input type="radio" name="triage-code" value={value} checked={checked} className={cls} onClick={() => { onClick(value) }}>
      <Icon n='check_circle' className='hidden group-checked:block text-4xl md:text-6xl block m-auto' />
    </input>
  )
}

export default TagCodeButton
