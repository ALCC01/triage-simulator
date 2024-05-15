import { type FunctionComponent } from 'preact'
import { cx } from '../../utils'
import Icon from '../Icon'
import Tooltip from '../Tooltip'

interface TagToolProps { n: string, title: string, id: string, onClick?: () => void }

const TagTool: FunctionComponent<TagToolProps> = ({ n, title, id, onClick }) => {
  const cls = cx(
    'flex grow bg-blue-600 transition duration-500',
    'hover:bg-blue-800 active:bg-blue-800'
  )
  const tooltipId = `${id}-tooltip`

  return (
    <Tooltip title={title} id={tooltipId} className='flex grow'>
      <button className={cls} id={id} aria-describedby={tooltipId} onClick={onClick}>
        <Icon n={n} className='text-4xl sm:text-5xl block m-auto' />
      </button>
    </Tooltip>
  )
}

export default TagTool
