import { type FunctionComponent } from 'preact'

const Footer: FunctionComponent = () => (
  <footer className="text-center opacity-75 mt-4 mb-3">
    <span aria-label="Version">{APP_VERSION}</span> <span aria-label="Commit hash">{COMMIT_HASH}</span>
  </footer>
)

export default Footer
