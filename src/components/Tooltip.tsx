import { type FunctionComponent, type PropsWithChildren } from 'preact/compat'
import { cx } from '../utils'

type TooltipProps = PropsWithChildren<{ title: string, id: string, className?: string }>

const Tooltip: FunctionComponent<TooltipProps> = ({ children, title, id, className }) => {
  const cls = cx(
    'group relative',
    className
  )
  const tooltipContentCls = cx(
    'absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2',
    'rounded py-2 px-3 bg-gray-800 text-white text-md pointer-events-none whitespace-nowrap font-semibold',
    'opacity-0 transition-opacity duration-500',
    'group-hover:opacity-100'
  )

  return (
    <div className={cls}>
      {children}
      <span className={tooltipContentCls} role="tooltip" id={id} >
        {title}
      </span>
    </div>

  )
}
export default Tooltip
