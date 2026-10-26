import { useEffect, useRef } from 'react'
import Icon from './Icon'

// Native <dialog>: focus trap, Esc to close and inert background for free
export default function Modal({ open, onClose, title, description, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="modal-soft"
      aria-labelledby="modal-title"
    >
      {open && (
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h2 id="modal-title" className="font-display text-2xl">{title}</h2>
              {description && <p className="text-sm text-ink/70 mt-1">{description}</p>}
            </div>
            <button type="button" className="icon-btn -mr-2 -mt-1" onClick={onClose} aria-label="Close">
              <Icon name="x" />
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  )
}

export function ConfirmModal({ open, onClose, onConfirm, title, body, confirmLabel = 'Delete', busy }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-ink/80 mb-6">{body}</p>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
        <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
        <button type="button" className="btn-danger" onClick={onConfirm} disabled={busy}>
          <Icon name="trash" size={18} />
          {busy ? 'Deleting…' : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
