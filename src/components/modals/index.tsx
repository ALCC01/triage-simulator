import { type FunctionComponent } from 'preact'
import { type PropsWithChildren, createPortal } from 'preact/compat'
import { useHotkey, useModal } from '../../hooks'
import Card from '../Card'
import Icon from '../Icon'
import { useTranslation } from 'react-i18next'

const Modal: FunctionComponent<PropsWithChildren<{ name: string, title: string }>> = ({ name, children, title }) => {
  const { t } = useTranslation()
  const { isOpen, close } = useModal(name)
  useHotkey('Escape', close)

  if (!isOpen) return null

  return createPortal(
    <div className="relative z-10" role="dialog" aria-modal="true" aria-labelledby={`${name}-modal-title`}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity cursor-pointer" onClick={close} />
      <div className="fixed inset-0 z-10 overflow-y-auto pointer-events-none">
        <div className="flex min-h-full items-center justify-center">
          <Card className="relative w-full sm:w-9/12 lg:w-6/12 m-4 overflow-hidden bg-white shadow-xl transition-all pointer-events-auto">
            <div className="flex p-2 lg:px-3 justify-between items-center border-b-4 border-black">
              <h2 className="text-2xl font-bold" id={`${name}-modal-title`}>{title}</h2>
              <button className="cursor-pointer" aria-label={t('Close modal')} onClick={() => { close() }}>
                <Icon n="close" className="text-4xl leading-4 align-middle" />
              </button>
            </div>
            <div className="p-4 lg:px-6 overflow-scroll">
              {children}
            </div>
          </Card>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
