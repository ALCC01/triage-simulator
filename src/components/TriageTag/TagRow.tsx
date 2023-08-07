import { type FunctionComponent, type PropsWithChildren } from 'preact/compat'
import { cx } from '../../utils'

type TagRowProps = PropsWithChildren<{ border?: true, className?: string }>

const TagRow: FunctionComponent<TagRowProps> = ({ children, border, className }) => {
  const cls = cx(
    'grid grid-cols-12 span-0 h-20 divide-x divide-gray-300',
    border ? 'border-b-4 border-black' : 'border-b border-gray-300',
    className
  )

  return (
    <div className={cls}>
      {children}
    </div>
  )
}

export default TagRow
