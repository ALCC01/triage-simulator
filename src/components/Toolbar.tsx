import { type FunctionComponent } from 'preact'
import Icon from './Icon'
import { useGame } from '../hooks'

interface ToolbarIconProps { n: string, title: string, onClick?: () => void }

const ToolbarIcon: FunctionComponent<ToolbarIconProps> = ({ n, title, onClick }) => (
  <a href="#" title={title} onClick={onClick}>
    <Icon n={n} className='text-3xl' />
  </a>
)

const Toolbar: FunctionComponent = () => {
  const { newGame } = useGame()

  const onReload = (): void => { newGame() }

  return (
    <div className="flex flex-row-reverse items-center gap-2 mb-4">
      <ToolbarIcon n="restart_alt" title="New game" onClick={onReload}/>
      <ToolbarIcon n="show_chart" title="Statistics" />
      <ToolbarIcon n="info" title="About" />
      <span className="text-lg font-black">Triage Simulator</span>
    </div>
  )
}

export default Toolbar
