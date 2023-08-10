import { type FunctionComponent } from 'preact'
import { store } from './store'
import { Provider } from 'react-redux'
import TriageTag from './components/TriageTag'
import PatientList from './components/PatientList'
import Toolbar from './components/Toolbar'

export const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <div className="flex h-screen p-4">
        <div className="m-auto w-full lg:w-5/12 h-min">
          <Toolbar />
          <PatientList />
          <TriageTag />
        </div>
      </div>
    </Provider>
  )
}
