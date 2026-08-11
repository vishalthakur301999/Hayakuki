import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, MapPin, Search, X } from 'lucide-react'
import { airports } from '../data'

export default function AirportPicker({ label, value, onChange }) {
  const [open, setOpen] = useState(false)
  const [term, setTerm] = useState('')
  const root = useRef(null)
  const selected = airports.find((item) => item.code === value) || airports[0]
  const matches = useMemo(() => airports.filter((item) => `${item.city} ${item.code} ${item.name}`.toLowerCase().includes(term.toLowerCase())), [term])

  useEffect(() => {
    const close = (event) => { if (!root.current?.contains(event.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const choose = (code) => { onChange(code); setOpen(false); setTerm('') }

  return <div className="airport-picker" ref={root}>
    <button type="button" className="airport-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(true)}>
      <span className="field-label"><MapPin size={13} /> {label}</span>
      <strong>{selected.city}</strong>
      <small>{selected.code} · {selected.name}</small>
    </button>
    {open && <div className="airport-popover">
      <div className="picker-heading"><div><span>{label}</span><strong>Choose an airport</strong></div><button type="button" onClick={() => setOpen(false)} aria-label="Close airport picker"><X size={19} /></button></div>
      <label className="airport-search"><Search size={17} /><input autoFocus value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Search city, airport or code" /></label>
      <div className="airport-options" role="listbox">
        {matches.map((item) => <button type="button" role="option" aria-selected={item.code === value} key={item.code} onClick={() => choose(item.code)}>
          <span className="airport-code">{item.code}</span><span><strong>{item.city}</strong><small>{item.name}</small></span>{item.code === value && <Check size={17} />}
        </button>)}
        {!matches.length && <div className="no-airports">No airports found for “{term}”</div>}
      </div>
    </div>}
  </div>
}
