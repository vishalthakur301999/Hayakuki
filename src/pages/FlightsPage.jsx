import { useMemo, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, SlidersHorizontal, Sparkles } from 'lucide-react'
import SearchBox from '../components/SearchBox'
import FlightCard from '../components/FlightCard'
import { airports, fareDates } from '../data'
import { useApp } from '../context/AppContext'

const airport = (code) => airports.find((item) => item.code === code)

export default function FlightsPage() {
  const { query, flights, isSearching } = useApp()
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('recommended')
  const options = useMemo(() => {
    const exact = flights.filter((item) => item.from === query.from && item.to === query.to)
    let list = exact.length ? exact : flights.slice(0, 6).map((item, index) => ({ ...item, id: `${item.short}-${510 + index}`, from: query.from, to: query.to, price: item.price + 420 + index * 90 }))
    if (filter === 'nonstop') list = list.filter((item) => item.stops === 0)
    if (filter === 'morning') list = list.filter((item) => Number(item.depart.split(':')[0]) < 12)
    if (filter === 'baggage') list = list.filter((item) => parseInt(item.baggage) >= 20)
    if (sort === 'price') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'departure') list = [...list].sort((a, b) => a.depart.localeCompare(b.depart))
    if (sort === 'duration') list = [...list].sort((a, b) => parseInt(a.duration) - parseInt(b.duration))
    return list
  }, [query.from, query.to, flights, filter, sort])

  return <main className="results-page">
    <section className="results-search"><div className="page-width"><SearchBox compact /></div></section>
    {isSearching ? <section className="results-refresh" role="status" aria-live="polite"><div className="refresh-orbit"><span>✈</span><i /><i /><i /></div><span className="overline coral">UPDATING YOUR ROUTE</span><h1>Finding fresh flights…</h1><p>The previous results have left the board while we check the new search.</p><div className="refresh-skeletons"><i /><i /><i /></div></section> : <section className="results-content page-width">
      <div className="results-title"><div><span className="overline coral">FLIGHT RESULTS</span><h1>{airport(query.from)?.city} <ArrowRight /> {airport(query.to)?.city}</h1><p>{options.length} options · {new Date(`${query.depart}T12:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} · {query.travellers} traveller{query.travellers !== '1' ? 's' : ''}</p></div><div className="fare-good"><Sparkles /><span><strong>Fares look good</strong><small>About 8% below the route average</small></span></div></div>
      <div className="fare-ribbon"><button><ChevronLeft /></button>{fareDates.map((item) => <div className={item.best ? 'best' : ''} key={item.date}><span>{item.day}, {item.date}</span><strong>₹{item.price.toLocaleString('en-IN')}</strong>{item.best && <small>LOWEST</small>}</div>)}<button><ChevronRight /></button></div>
      <div className="results-toolbar"><div><button className="filter-lead"><SlidersHorizontal size={15} /> Filters</button>{[['all','All flights'],['nonstop','Nonstop'],['morning','Morning'],['baggage','20 kg bag']].map(([key, label]) => <button className={filter === key ? 'active' : ''} onClick={() => setFilter(key)} key={key}>{label}</button>)}</div><label>Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="price">Lowest price</option><option value="departure">Departure</option><option value="duration">Duration</option></select></label></div>
      <div className="results-grid"><div className="results-list">{options.map((flight) => <FlightCard flight={flight} key={flight.id} />)}{!options.length && <div className="empty-panel"><h2>No flights match those filters.</h2><p>Try another time of day or baggage preference.</p></div>}</div><aside className="route-insight"><span className="overline">FARE PULSE</span><div className="pulse-bars">{[53,75,42,30,63,82,58].map((height, index) => <i style={{ height: `${height}%` }} className={index === 3 ? 'hot' : ''} key={index} />)}</div><h3>Booking now is a good call.</h3><p>Prices on this route tend to climb in the last 10 days before departure.</p><button>Track this route</button><small>Based on sample historical data</small></aside></div>
    </section>}
  </main>
}
