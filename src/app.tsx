import { type FunctionComponent } from 'preact'
import { store } from './store'
import { Provider } from 'react-redux'
import { addPatient } from './store/patients'
import { START } from './algorithm'
import { randomInt } from './utils'
import TriageTag from './components/TriageTag'
import PatientList from './components/PatientList'

store.dispatch(addPatient(new Array(80).fill(0).map((_, i) => START.newPatient(randomInt(1, 5), i + 1))))

export const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <div className="flex h-screen p-4">
        <div className="m-auto w-full lg:w-5/12 h-min">
          <PatientList />
          <TriageTag />
        </div>
      </div>
    </Provider>
  )
}
