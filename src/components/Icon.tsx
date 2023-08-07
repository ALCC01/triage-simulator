import { type FunctionComponent } from 'preact'

const Icon: FunctionComponent<{ n: string, className?: string }> = ({ n, className }) => (
  <span className={`material-symbols-outlined ${className ?? ''}`}>
    {n}
  </span>
)

export default Icon
