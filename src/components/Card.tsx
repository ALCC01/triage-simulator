import { type FunctionComponent } from 'preact'
import { type PropsWithChildren } from 'preact/compat'

type CardHeaderProps = PropsWithChildren<{ title: string }>

export const CardHeader: FunctionComponent<CardHeaderProps> = ({ children, title }) => (
  <div className="flex p-2 lg:px-3 items-center justify-between border-b-4 border-black">
    <h2 className="text-2xl font-bold">{title}</h2>
    {children}
  </div>

)

type CardProps = PropsWithChildren<{ className?: string }>

const Card: FunctionComponent<CardProps> = ({ children, className }) => (
  <div className={`bg-white shadow-lg ${className ?? ''}`}>
    {children}
  </div>
)

export default Card
