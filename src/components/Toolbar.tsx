import { type FunctionComponent } from 'preact'
import Icon from './Icon'
import { useGame, useModal } from '../hooks'
import { STATS_MODAL_ID } from './modals/StatsModal'
import { INFO_MODAL_ID } from './modals/InfoModal'
import { useState } from 'preact/hooks'
import { cx } from '../utils'
import { useTranslation } from 'react-i18next'
import { locales } from '../i18n'
import { setLocale } from '../store/ui'
import { useAppDispatch, useAppSelector } from '../store'

interface ToolbarIconProps { n: string, title: string, onClick?: () => void }

const ToolbarIcon: FunctionComponent<ToolbarIconProps> = ({ n, title, onClick }) => (
  <a href="#" title={title} onClick={onClick}>
    <Icon n={n} className='text-3xl' />
  </a>
)

interface LocaleDropdownElementProps { cc: string, name: string, icon: string, active: boolean, onClick: () => void }

const LocaleDropdownElement: FunctionComponent<LocaleDropdownElementProps> = ({ cc, name, icon, active, onClick }) => {
  const cls = cx(
    'block px-3 py-1 text-lg hover:bg-gray-100 hover:text-gray-900',
    active && 'font-bold'
  )

  return (
    <a
      href="#"
      className={cls}
      role="menuitem"
      tabIndex="-1"
      id={cc}
      onClick={onClick}>
      <span className="bg-white rounded px-1 inline-block mr-2">{icon}</span> {name}
    </a>
  )
}

const LocaleDropdown: FunctionComponent<{ open: boolean, onChoice: () => void }> = ({ open, onChoice }) => {
  const dispatch = useAppDispatch()
  const currentLocale = useAppSelector(state => state.ui.locale)

  const onClick = (cc: string): void => {
    dispatch(setLocale(cc as any))
    onChoice()
  }

  const cls = cx(
    'absolute right-0 z-10 mt-1 w-48 origin-top-right bg-white shadow-md rounded',
    open ? 'block' : 'hidden'
  )

  return (
    <div className={cls} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
      <div className="py-1" role="none">
        {Object.entries(locales).map(([cc, { name, icon }]) => (
          <LocaleDropdownElement key={cc} cc={cc} active={cc === currentLocale} name={name} icon={icon} onClick={() => { onClick(cc) }} />
        ))}
      </div>
    </div>
  )
}

const Toolbar: FunctionComponent = () => {
  const { t } = useTranslation()
  const { newGame } = useGame()
  const { open: openStats } = useModal(STATS_MODAL_ID)
  const { open: openInfo } = useModal(INFO_MODAL_ID)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const onReload = (): void => { newGame() }

  return (
    <div className="flex flex-row items-center gap-2 mb-4">
      <span className="text-lg font-black flex-1">⛑ Triage Simulator</span>
      <ToolbarIcon n="info" title={t('About')} onClick={openInfo} />
      <div className="relative">
        <ToolbarIcon n="language" title={t('Change language')} onClick={() => { setDropdownOpen(!dropdownOpen) }} />
        <LocaleDropdown open={dropdownOpen} onChoice={() => { setDropdownOpen(false) }} />
      </div>
      <ToolbarIcon n="show_chart" title={t('Statistics')} onClick={openStats} />
      <ToolbarIcon n="restart_alt" title={t('New disaster')} onClick={onReload} />
    </div>
  )
}

export default Toolbar
