import { type FunctionComponent } from 'preact'
import TriageTag from './components/TriageTag'

export const App: FunctionComponent = () => {
  return (
    <div className="flex h-screen p-4">
      <TriageTag />
    </div>
  )
}
