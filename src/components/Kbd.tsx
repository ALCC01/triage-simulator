import { type FunctionComponent } from 'preact'
import { type PropsWithChildren } from 'preact/compat'

const Kbd: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <kbd className="px-1.5 py-0.5 text-sm font-bold font-sans text-black bg-gray-50 border border-gray-300 rounded-md">
    {children}
  </kbd>
)

export default Kbd
