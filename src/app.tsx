import { type FunctionComponent } from 'preact'
import TriageTag from './components/TriageTag'
import { store } from './store'
import { Provider } from 'react-redux'
import { addPatient } from './store/patients'
import { START } from './algorithm'
import { randomInt } from './utils'

store.dispatch(addPatient([START.newPatient(randomInt(1, 5))]))

export const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <div className="flex h-screen p-4">
        <TriageTag />
      </div>
    </Provider>
  )
}
