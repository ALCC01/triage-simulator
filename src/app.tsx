import { type FunctionComponent } from 'preact'
import { store } from './store'
import { Provider } from 'react-redux'
import TriageTag from './components/TriageTag'
import PatientList from './components/PatientList'
import Toolbar from './components/Toolbar'
import StatsModal from './components/modals/StatsModal'
import Footer from './components/Footer'
import InfoModal from './components/modals/InfoModal'
import FeedbackCard from './components/FeedbackCard'

export const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <div className="flex h-screen p-4">
        <div className="mt-0 sm:m-auto w-full lg:w-5/12 h-min">
          <Toolbar />
          <PatientList />
          <TriageTag />
          <FeedbackCard />
          <Footer />
        </div>
      </div>
      <StatsModal />
      <InfoModal />
    </Provider>
  )
}
