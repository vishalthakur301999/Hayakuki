import { useEffect, useState } from 'react'
import { ArrowLeftRight, CalendarDays, LoaderCircle, Search, ShieldCheck } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import AirportPicker from './AirportPicker'
import TravellerPicker from './TravellerPicker'
import { useApp } from '../context/AppContext'

export default function SearchBox({ compact = false }) {
  const { query, setQuery, isSearching, setIsSearching } = useApp()
  const [draft, setDraft] = useState(query)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => setDraft(query), [query])
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }))
  const search = (event) => {
    event.preventDefault()
    if (draft.from === draft.to || isSearching) return
    setIsSearching(true)
    window.setTimeout(() => {
      setQuery(draft)
      setIsSearching(false)
      if (location.pathname !== '/flights') navigate('/flights')
    }, 1000)
  }

  return <form className={compact ? 'flight-search compact' : 'flight-search'} onSubmit={search}>
    <div className="search-tabs">
      {['round', 'oneway', 'multi'].map((type) => <button type="button" key={type} className={draft.tripType === type ? 'active' : ''} onClick={() => update('tripType', type)}>{type === 'round' ? 'Round trip' : type === 'oneway' ? 'One way' : 'Multi-city'}</button>)}
      <span>Prices include taxes</span>
    </div>
    <div className="search-fields">
      <div className="route-fields">
        <AirportPicker label="From" value={draft.from} onChange={(value) => update('from', value)} />
        <button className="swap-airports" type="button" onClick={() => setDraft((current) => ({ ...current, from: current.to, to: current.from }))} aria-label="Swap airports"><ArrowLeftRight size={17} /></button>
        <AirportPicker label="To" value={draft.to} onChange={(value) => update('to', value)} />
      </div>
      <div className={`trip-fields ${draft.tripType}`}>
        <label className="date-input"><span className="field-label"><CalendarDays size={13} /> Depart</span><input type="date" min="2026-08-12" value={draft.depart} onChange={(event) => update('depart', event.target.value)} /><small>Choose travel date</small></label>
        {draft.tripType !== 'oneway' && <label className="date-input"><span className="field-label"><CalendarDays size={13} /> Return</span><input type="date" min={draft.depart} value={draft.returnDate} onChange={(event) => update('returnDate', event.target.value)} /><small>Flexible dates</small></label>}
        <TravellerPicker value={draft.travellers} onChange={(value) => update('travellers', value)} />
      </div>
    </div>
    <div className="search-submit-row"><span><ShieldCheck size={13} /> Free demo search · no booking fees</span><button className="find-flights" disabled={draft.from === draft.to || isSearching}>{isSearching ? <><LoaderCircle className="spin" size={18} /><span>Finding flights…</span></> : <><Search size={18} /><span>Search flights</span></>}</button></div>
    {draft.from === draft.to && <p className="search-error">Departure and arrival airports need to be different.</p>}
    {isSearching && <div className="search-loading" role="status" aria-live="polite"><span className="loading-plane">✈</span><div><strong>Checking the departure board</strong><small>Finding the best dummy fares for your route…</small></div></div>}
  </form>
}
