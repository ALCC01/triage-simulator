import { type FunctionComponent } from 'preact'
import Card, { CardHeader } from './Card'
import { patientById, useAppDispatch, useAppSelector } from '../store'
import { START } from '../algorithms/START'
import { toggleFeedback } from '../store/ui'
import Icon from './Icon'

const FeedbackCard: FunctionComponent = () => {
  const currentPatientId = useAppSelector((state) => state.ui.currentPatient)
  const patient = useAppSelector((state) => patientById(state, currentPatientId ?? 0))
  const revealFeedback = useAppSelector((state) => state.ui.revealFeedback)
  const dispatch = useAppDispatch()

  const onToggleFeedback = (): void => {
    dispatch(toggleFeedback())
  }

  if (currentPatientId === undefined) return <></>
  if (patient === undefined) return <></>
  const feedback = START.getFeedback(patient)

  return (
    <Card className="mt-3">
      <CardHeader title="Feedback">
        <button
          className="cursor-pointer"
          title={`${revealFeedback ? 'Hide' : 'Reveal'} feedback on patients`}
          aria-label={`${revealFeedback ? 'Hide' : 'Reveal'} feedback on patients`}
          onClick={onToggleFeedback}
        >
          <Icon
            n={revealFeedback ? 'visibility_off' : 'visibility'}
            className="text-4xl leading-4 align-middle"
          />
        </button>
      </CardHeader>
      {revealFeedback &&
        <div className="p-2">
          <ol className="list-name text-lg">
            {feedback.map((e, i) => <li key={i}>{e}</li>)}
          </ol>
        </div>
      }
    </Card>
  )
}

export default FeedbackCard
