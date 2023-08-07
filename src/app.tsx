import { type FunctionComponent } from 'preact'
import TriageTag from './components/TriageTag'
import { store } from './store'
import { Provider } from 'react-redux'
import { Patient, addPatient } from './store/patients'

store.dispatch(addPatient([new Patient()]))

export const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <div className="flex h-screen p-4">
        <TriageTag />
      </div>
    </Provider>
  )
}
