import { useState } from 'react'
import { ArrowRight, BaggageClaim, ChevronDown, Clock3, Heart, Leaf, Plane } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const money = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

export default function FlightCard({ flight }) {
  const [expanded, setExpanded] = useState(false)
  const { saved, toggleSaved, setSelectedFlight } = useApp()
  const navigate = useNavigate()
  const choose = () => { setSelectedFlight(flight); navigate(`/checkout/${encodeURIComponent(flight.id)}`) }
  return <article className="result-card">
    <div className="result-main">
      <div className="result-airline"><span style={{ '--airline': flight.color }}>{flight.short}</span><div><strong>{flight.airline}</strong><small>{flight.id}</small></div></div>
      <div className="result-time"><strong>{flight.depart}</strong><span>{flight.from}</span></div>
      <div className="result-route"><small>{flight.duration}</small><div><i /><Plane size={14} fill="currentColor" /></div><span>{flight.stops ? `${flight.stops} stop` : 'Nonstop'}</span></div>
      <div className="result-time"><strong>{flight.arrive}</strong><span>{flight.to}</span></div>
      <div className="result-price"><em>{flight.badge}</em><small>from</small><strong>₹{money.format(flight.price)}</strong><button onClick={choose}>Choose <ArrowRight size={15} /></button></div>
    </div>
    <div className="result-actions"><button onClick={() => setExpanded((value) => !value)}>Flight details <ChevronDown className={expanded ? 'up' : ''} size={14} /></button><span>7 kg cabin bag included</span><button className={saved.includes(flight.id) ? 'saved' : ''} onClick={() => toggleSaved(flight.id)}><Heart size={14} fill={saved.includes(flight.id) ? 'currentColor' : 'none'} /> {saved.includes(flight.id) ? 'Saved' : 'Save'}</button></div>
    {expanded && <div className="result-details"><div><Clock3 /><span><strong>{flight.duration} total</strong><small>{flight.aircraft}</small></span></div><div><BaggageClaim /><span><strong>{flight.baggage} checked</strong><small>per traveller</small></span></div><div><Leaf /><span><strong>{flight.emissions} kg CO₂e</strong><small>estimated emissions</small></span></div></div>}
  </article>
}
