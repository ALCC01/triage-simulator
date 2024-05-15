import { type FunctionComponent } from 'preact'
import { cx } from '../utils'

const Icon: FunctionComponent<{ n: string, fill?: boolean, className?: string }> = ({ n, fill, className }) => {
  const cls = cx(
    'material-symbols-outlined',
    (fill ?? false) && 'material-symbols-filled',
    className
  )
  return (
    <span className={cls}>
      {n}
    </span>
  )
}

export default Icon
