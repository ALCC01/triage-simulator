import { type FunctionComponent } from 'preact'
import Card, { CardHeader } from './Card'
import { patientById, useAppDispatch, useAppSelector } from '../store'
import { Feedback, START } from '../algorithm'
import { toggleFeedback } from '../store/ui'
import Icon from './Icon'
import { useTranslation } from 'react-i18next'
import { codeToEmoji } from '../utils'

const FeedbackCard: FunctionComponent = () => {
  const currentPatientId = useAppSelector((state) => state.ui.currentPatient)
  const patient = useAppSelector((state) => patientById(state, currentPatientId ?? 0))
  const revealFeedback = useAppSelector((state) => state.ui.revealFeedback)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const onToggleFeedback = (): void => {
    dispatch(toggleFeedback())
  }

  const feedbackToString = (fb: Feedback): string => {
    switch (fb) {
      case Feedback.CODE_NOT_ASSIGNED: return t('❓ You did not assign a code to this patient')
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      case Feedback.CODE_CORRECT: return t('🎉 The correct code was {{c}}!', { c: codeToEmoji(patient!.code) })
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      case Feedback.CODE_INCORRECT: return t('❌ The correct code was {{c}}, you assigned {{a}}', { c: codeToEmoji(patient!.code), a: codeToEmoji(patient!.assignedCode!) })
      case Feedback.BLEEDING_CONTROLLED: return t('✅ Bleeding was controlled')
      case Feedback.BLEEDING_NOT_CONTROLLED: return t('❌ Bleeding wasn\'t controlled')
      case Feedback.BLEEDING_NOT_NEEDED: return t('❌ Bleeding control wasn\'t needed')
      case Feedback.AIRWAY_CLEARED: return t('✅ Airway was cleared')
      case Feedback.AIRWAY_NOT_CLEARED: return t('❌ Airway wasn\'t cleared')
      case Feedback.AIRWAY_NOT_NEEDED: return t('❌ Airway wasn\'t needed')
      case Feedback.PROGRESS_STOP_MOBILTY: return t('❌ You didn\'t need to proceed beyond checking mobility')
      case Feedback.PROGRESS_STOP_RESPIRATORY_RATE: return t('❌ You didn\'t need to proceed beyond checking the respiratory rate')
      case Feedback.PROGRESS_STOP_CAPILLARY_REFILL: return t('❌ You didn\'t need to proceed beyond checking the capillary refill')
    }
  }

  if (currentPatientId === undefined) return <></>
  if (patient === undefined) return <></>
  const feedback = START.getFeedback(patient)

  return (
    <Card className="mt-3">
      <CardHeader title={t('Feedback')}>
        <button
          className="cursor-pointer"
          title={revealFeedback ? t('Hide feedback on patient') : t('Show feedback on patient')}
          aria-label={revealFeedback ? t('Hide feedback on patient') : t('Show feedback on patient')}
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
            {feedback.map((e, i) => <li key={i}>{feedbackToString(e)}</li>)}
          </ol>
        </div>
      }
    </Card>
  )
}

export default FeedbackCard
