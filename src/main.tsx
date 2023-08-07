import { render } from 'preact'
import { App } from './app.tsx'
import '@fontsource/archivo/latin-400.css'
import '@fontsource/archivo/latin-700.css'
import '@material-symbols/font-400/outlined.css'
import './index.css'

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
render(<App />, document.getElementById('app')!)
