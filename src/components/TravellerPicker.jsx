import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Users, X } from 'lucide-react'

export default function TravellerPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const root = useRef(null)
  const count = Number(value)

  useEffect(() => {
    const close = (event) => { if (!root.current?.contains(event.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const choose = (next) => { onChange(String(next)); setOpen(false) }

  return <div className="traveller-picker" ref={root}>
    <button type="button" className="traveller-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)}>
      <span className="field-label"><Users size={13} /> Travellers</span>
      <strong>{count} traveller{count !== 1 ? 's' : ''}</strong>
      <small>Economy</small>
      <ChevronDown className={open ? 'up' : ''} size={16} />
    </button>
    {open && <div className="traveller-popover">
      <div className="picker-heading"><div><span>Passengers</span><strong>Who's travelling?</strong></div><button type="button" onClick={() => setOpen(false)} aria-label="Close traveller picker"><X size={18} /></button></div>
      <div className="traveller-options" role="listbox" aria-label="Number of travellers">
        {[1,2,3,4,5,6].map((number) => <button type="button" role="option" aria-selected={count === number} key={number} onClick={() => choose(number)}><span>{number}</span><div><strong>{number} traveller{number !== 1 ? 's' : ''}</strong><small>{number === 1 ? 'Flying solo' : 'Economy cabin'}</small></div>{count === number && <Check size={16} />}</button>)}
      </div>
    </div>}
  </div>
}
