import { type FunctionComponent } from 'preact'
import { type PropsWithChildren } from 'preact/compat'

type CardProps = PropsWithChildren<{ className?: string }>

const Card: FunctionComponent<CardProps> = ({ children, className }) => (
  <div className={`bg-white shadow-lg ${className ?? ''}`}>
    {children}
  </div>
)

export default Card
