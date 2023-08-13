import { type FunctionComponent } from 'preact'
import { type PropsWithChildren, createPortal } from 'preact/compat'
import { useHotkey, useModal } from '../../hooks'
import Card from '../Card'
import Icon from '../Icon'

const Modal: FunctionComponent<PropsWithChildren<{ name: string, title: string }>> = ({ name, children, title }) => {
  const { isOpen, close } = useModal(name)
  useHotkey('Escape', close)

  if (!isOpen) return null

  return createPortal(
    <div className="relative z-10" role="dialog" aria-modal="true" aria-labelledby={`${name}-modal-title`}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity cursor-pointer" onClick={close} />
      <div className="fixed inset-0 z-10 overflow-y-auto pointer-events-none">
        <div className="flex min-h-full items-center justify-center">
          <Card className="relative w-full max-w-3xl m-4 overflow-hidden bg-white shadow-xl transition-all pointer-events-auto">
            <div className="flex p-2 lg:px-3 justify-between items-center border-b-4 border-black">
              <h1 className="text-2xl font-bold" id={`${name}-modal-title`}>{title}</h1>
              <a href="#" onClick={() => { close() }} aria-label="Close modal"><Icon n="close" className="text-3xl" /></a>
            </div>
            <div className="p-2 lg:px-3 overflow-scroll">
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
