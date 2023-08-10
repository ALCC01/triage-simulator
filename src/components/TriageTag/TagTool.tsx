import { type FunctionComponent } from 'preact'
import { cx } from '../../utils'
import Icon from '../Icon'

interface TagToolProps { n: string, onClick?: () => void }

const TagTool: FunctionComponent<TagToolProps> = ({ n, onClick }) => {
  const cls = cx(
    'flex grow bg-blue-600 transition duration-500',
    'hover:bg-blue-800 active:bg-blue-800'
  )

  return (
    <button className={cls} onClick={onClick}>
      <Icon n={n} className='text-4xl sm:text-5xl block m-auto' />
    </button>
  )
}

export default TagTool
