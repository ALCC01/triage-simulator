import { type FunctionComponent } from 'preact'
import { useTranslation } from 'react-i18next'

const Footer: FunctionComponent = () => {
  const { t } = useTranslation()

  return (
    <footer className="text-center opacity-75 mt-4 mb-3">
      <span aria-label={t('Version')}>{APP_VERSION}</span> <span aria-label={t('Commit hash')}>{COMMIT_HASH}</span>
    </footer>
  )
}

export default Footer
