import { type FunctionComponent, type PropsWithChildren } from 'preact/compat'
import { cx } from '../../utils'

type TagCellProps = PropsWithChildren<{ span?: number, title: string }>

const TagCell: FunctionComponent<TagCellProps> = ({ children, span, title }) => {
  const cls = cx(
    'p-2 overflow-hidden text-ellipsis whitespace-nowrap',
    `col-span-${span ?? 12}`
  )

  return (
    <div className={cls}>
      <p className="text-base text-black opacity-50 group-hover:hidden">{title}</p>
      <p className="text-2xl md:text-3xl font-bold group-hover:hidden">{children}</p>
    </div>
  )
}

export default TagCell
