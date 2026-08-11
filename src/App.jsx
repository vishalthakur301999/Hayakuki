import { useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BaggageClaim,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  GitCompareArrows,
  Heart,
  Info,
  Leaf,
  Luggage,
  Menu,
  Plane,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  TicketCheck,
  Users,
  WalletCards,
  X,
} from 'lucide-react'
import { airports, fareDates, flights, inspirations } from './data'

const money = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })
const airport = (code) => airports.find((item) => item.code === code)

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Hayakuki home">
      <span className="logo-mark"><Plane size={18} strokeWidth={2.5} /></span>
      <span>hayakuki</span>
    </a>
  )
}

function Header({ savedCount, onTrips }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className={mobileOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#search" onClick={() => setMobileOpen(false)}>Flights</a>
          <a href="#explore" onClick={() => setMobileOpen(false)}>Explore</a>
          <button className="nav-button" onClick={() => { onTrips(); setMobileOpen(false) }}>
            My trips
            {savedCount > 0 && <span className="nav-badge">{savedCount}</span>}
          </button>
        </nav>
        <div className="header-actions">
          <button className="currency-button" aria-label="Change currency">INR <ChevronDown size={14} /></button>
          <button className="profile-button" onClick={onTrips}><CircleUserRound size={18} /> <span>Sign in</span></button>
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMobileOpen((value) => !value)}>
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  )
}

function SearchPanel({ query, setQuery, onSearch }) {
  const [tripType, setTripType] = useState('round')
  const swap = () => setQuery((old) => ({ ...old, from: old.to, to: old.from }))
  const submit = (event) => {
    event.preventDefault()
    onSearch()
  }
  return (
    <form className="search-panel" id="search" onSubmit={submit}>
      <div className="search-topline">
        <div className="trip-tabs" role="tablist" aria-label="Trip type">
          {['round', 'oneway', 'multi'].map((type) => (
            <button key={type} type="button" role="tab" aria-selected={tripType === type} className={tripType === type ? 'active' : ''} onClick={() => setTripType(type)}>
              {type === 'round' ? 'Round trip' : type === 'oneway' ? 'One way' : 'Multi-city'}
            </button>
          ))}
        </div>
        <button type="button" className="fare-watch"><Sparkles size={15} /> Track prices</button>
      </div>
      <div className="search-grid">
        <label className="search-field location-field">
          <span>From</span>
          <select value={query.from} onChange={(e) => setQuery({ ...query, from: e.target.value })} aria-label="Departure airport">
            {airports.map((item) => <option value={item.code} key={item.code}>{item.city} ({item.code})</option>)}
          </select>
          <small>{airport(query.from)?.name}</small>
        </label>
        <button type="button" className="swap-button" onClick={swap} aria-label="Swap departure and arrival"><ArrowRight size={18} /></button>
        <label className="search-field location-field">
          <span>To</span>
          <select value={query.to} onChange={(e) => setQuery({ ...query, to: e.target.value })} aria-label="Arrival airport">
            {airports.map((item) => <option value={item.code} key={item.code}>{item.city} ({item.code})</option>)}
          </select>
          <small>{airport(query.to)?.name}</small>
        </label>
        <label className="search-field date-field">
          <span><CalendarDays size={14} /> Depart</span>
          <input type="date" value={query.depart} min="2026-08-12" onChange={(e) => setQuery({ ...query, depart: e.target.value })} />
          <small>{new Date(`${query.depart}T12:00:00`).toLocaleDateString('en-IN', { weekday: 'long' })}</small>
        </label>
        {tripType !== 'oneway' && (
          <label className="search-field date-field">
            <span><CalendarDays size={14} /> Return</span>
            <input type="date" value={query.returnDate} min={query.depart} onChange={(e) => setQuery({ ...query, returnDate: e.target.value })} />
            <small>{new Date(`${query.returnDate}T12:00:00`).toLocaleDateString('en-IN', { weekday: 'long' })}</small>
          </label>
        )}
        <label className="search-field traveller-field">
          <span><Users size={14} /> Travellers & cabin</span>
          <select value={query.travellers} onChange={(e) => setQuery({ ...query, travellers: e.target.value })} aria-label="Travellers and cabin">
            <option value="1">1 traveller</option>
            <option value="2">2 travellers</option>
            <option value="3">3 travellers</option>
            <option value="4">4 travellers</option>
          </select>
          <small>Economy</small>
        </label>
        <button className="search-button" type="submit"><Search size={20} /> Search flights</button>
      </div>
      <div className="search-footnote"><ShieldCheck size={15} /> No hidden fees — the price you see is what you pay.</div>
    </form>
  )
}

function Hero({ query, setQuery, onSearch }) {
  return (
    <main id="top">
      <section className="hero-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Made for going places</div>
            <h1>Go somewhere<br /><em>good.</em></h1>
            <p>Thoughtful flight search for spontaneous weekends, long-awaited reunions, and everything in between.</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="sun-disc" />
            <div className="flight-path" />
            <Plane className="hero-plane" size={34} fill="currentColor" />
            <div className="hero-stamp"><span>GO</span><small>somewhere</small></div>
            <div className="hero-note">DEL <ArrowRight size={15} /> GOI<br /><small>2h 40m · nonstop</small></div>
          </div>
        </div>
        <SearchPanel query={query} setQuery={setQuery} onSearch={onSearch} />
      </section>
      <div className="trust-strip">
        <div><strong>50+</strong><span>airlines compared</span></div>
        <div><strong>₹0</strong><span>booking fees</span></div>
        <div><strong>4.8 <Star size={14} fill="currentColor" /></strong><span>traveller rating</span></div>
        <p>Clear choices. Fair fares. Less tab-hopping.</p>
      </div>
    </main>
  )
}

function FareCalendar() {
  return (
    <div className="fare-calendar" aria-label="Nearby date fares">
      <button className="calendar-arrow" aria-label="Previous dates"><ChevronRight size={18} /></button>
      {fareDates.map((item) => (
        <button key={item.date} className={item.best ? 'fare-day best' : 'fare-day'}>
          <span>{item.day}, {item.date}</span>
          <strong>₹{money.format(item.price)}</strong>
          {item.best && <small>lowest</small>}
        </button>
      ))}
      <button className="calendar-arrow next" aria-label="Next dates"><ChevronRight size={18} /></button>
    </div>
  )
}

function Filters({ filter, setFilter, sort, setSort }) {
  return (
    <div className="filter-row">
      <div className="filter-chips">
        <button className="filter-button"><SlidersHorizontal size={16} /> Filters</button>
        {['Recommended', 'Nonstop', 'Under ₹6,000', 'Morning'].map((item) => (
          <button key={item} className={filter === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter(filter === item ? 'Recommended' : item)}>{item}</button>
        ))}
      </div>
      <label className="sort-select">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="price">Lowest price</option><option value="duration">Shortest duration</option><option value="departure">Earliest departure</option></select></label>
    </div>
  )
}

function FlightCard({ flight, saved, compared, onSave, onCompare, onSelect }) {
  const [details, setDetails] = useState(false)
  return (
    <article className="flight-card">
      <div className="flight-card-main">
        <div className="airline-cell">
          <div className="airline-logo" style={{ '--airline': flight.color }}>{flight.short}</div>
          <div><strong>{flight.airline}</strong><small>{flight.id}</small></div>
        </div>
        <div className="time-cell"><strong>{flight.depart}</strong><span>{flight.from}</span></div>
        <div className="route-cell"><span>{flight.duration}</span><div className="route-line"><i /><Plane size={14} fill="currentColor" /></div><small>{flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop · BOM`}</small></div>
        <div className="time-cell"><strong>{flight.arrive}</strong><span>{flight.to}</span></div>
        <div className="price-cell">
          <span className={`deal-badge ${flight.badge === 'Lowest emissions' ? 'green' : ''}`}>{flight.badge === 'Lowest emissions' && <Leaf size={11} />}{flight.badge}</span>
          <small>{flight.original > flight.price && <del>₹{money.format(flight.original)}</del>} per adult</small>
          <strong>₹{money.format(flight.price)}</strong>
          <button className="select-button" onClick={() => onSelect(flight)}>Select <ArrowRight size={16} /></button>
        </div>
      </div>
      <div className="flight-card-footer">
        <button onClick={() => setDetails((value) => !value)}>{details ? 'Hide details' : 'Flight details'} <ChevronDown className={details ? 'rotate' : ''} size={15} /></button>
        <div>
          <span><Luggage size={14} /> Cabin bag included</span>
          <button className={compared ? 'is-active' : ''} onClick={() => onCompare(flight)}><GitCompareArrows size={14} /> {compared ? 'Comparing' : 'Compare'}</button>
          <button className={saved ? 'is-active heart' : ''} onClick={() => onSave(flight)} aria-label={saved ? 'Remove saved flight' : 'Save flight'}><Heart size={15} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}</button>
        </div>
      </div>
      {details && (
        <div className="flight-details">
          <div><Clock3 size={17} /><span><strong>{flight.duration} total</strong><small>{flight.aircraft}</small></span></div>
          <div><BaggageClaim size={17} /><span><strong>{flight.baggage} checked bag</strong><small>7 kg cabin bag included</small></span></div>
          <div><Leaf size={17} /><span><strong>{flight.emissions} kg CO₂e</strong><small>{flight.emissions < 140 ? '12% below route average' : 'Route estimate'}</small></span></div>
        </div>
      )}
    </article>
  )
}

function Results({ query, searched, onSelect, saved, setSaved, compared, setCompared }) {
  const [filter, setFilter] = useState('Recommended')
  const [sort, setSort] = useState('recommended')
  const routeFlights = useMemo(() => {
    const exact = flights.filter((item) => item.from === query.from && item.to === query.to)
    const base = exact.length ? exact : flights.slice(0, 5).map((item, index) => ({ ...item, id: `${item.short}-${410 + index}`, from: query.from, to: query.to, price: item.price + 740 }))
    let list = [...base]
    if (filter === 'Nonstop') list = list.filter((item) => item.stops === 0)
    if (filter === 'Under ₹6,000') list = list.filter((item) => item.price < 6000)
    if (filter === 'Morning') list = list.filter((item) => Number(item.depart.split(':')[0]) < 12)
    if (sort === 'price') list.sort((a, b) => a.price - b.price)
    if (sort === 'duration') list.sort((a, b) => parseInt(a.duration) - parseInt(b.duration))
    if (sort === 'departure') list.sort((a, b) => a.depart.localeCompare(b.depart))
    return list
  }, [query.from, query.to, filter, sort])

  const toggleSaved = (flight) => setSaved((items) => items.some((id) => id === flight.id) ? items.filter((id) => id !== flight.id) : [...items, flight.id])
  const toggleCompare = (flight) => setCompared((items) => items.some((id) => id === flight.id) ? items.filter((id) => id !== flight.id) : items.length < 3 ? [...items, flight.id] : [...items.slice(1), flight.id])
  return (
    <section className={searched ? 'results-section searched' : 'results-section'} id="results">
      <div className="section-heading results-heading">
        <div>
          <span className="section-kicker">Your flight shortlist</span>
          <h2>{airport(query.from)?.city} <ArrowRight size={25} /> {airport(query.to)?.city}</h2>
          <p>{routeFlights.length} good options · {new Date(`${query.depart}T12:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} · {query.travellers} traveller{query.travellers !== '1' ? 's' : ''}</p>
        </div>
        <div className="price-alert"><span><Sparkles size={15} /></span><div><strong>Prices look good</strong><small>Fares are 8% lower than usual</small></div></div>
      </div>
      <FareCalendar />
      <Filters filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      <div className="results-layout">
        <div className="flight-list">
          {routeFlights.length ? routeFlights.map((flight) => <FlightCard key={flight.id} flight={flight} saved={saved.includes(flight.id)} compared={compared.includes(flight.id)} onSave={toggleSaved} onCompare={toggleCompare} onSelect={onSelect} />) : (
            <div className="empty-state"><Plane size={30} /><h3>No exact matches</h3><p>Try clearing a filter to see more flights.</p><button onClick={() => setFilter('Recommended')}>Clear filters</button></div>
          )}
          <button className="show-more">Show more flights <ChevronDown size={16} /></button>
        </div>
        <aside className="insight-card">
          <div className="mini-chart"><i style={{ height: '68%' }} /><i style={{ height: '48%' }} /><i className="today" style={{ height: '34%' }} /><i style={{ height: '55%' }} /><i style={{ height: '79%' }} /><i style={{ height: '66%' }} /><i style={{ height: '87%' }} /></div>
          <span className="insight-icon"><Sparkles size={17} /></span>
          <h3>A good time to book</h3>
          <p>Fares on this route usually rise by ₹800 within 10 days.</p>
          <button>Track this route <ArrowUpRight size={15} /></button>
          <small>Price insight based on recent fare patterns</small>
        </aside>
      </div>
    </section>
  )
}

function Explore({ onChoose }) {
  return (
    <section className="explore-section" id="explore">
      <div className="section-heading explore-heading">
        <div><span className="section-kicker">A little inspiration</span><h2>Where to next?</h2></div>
        <p>Three places worth packing a bag for, chosen for the season.</p>
      </div>
      <div className="destination-grid">
        {inspirations.map((item, index) => (
          <button className={`destination-card ${item.className}`} key={item.city} onClick={() => onChoose(item.code)}>
            <span className="destination-number">0{index + 1}</span>
            <div className="destination-shape" />
            <div className="destination-copy"><small>{item.kicker}</small><h3>{item.city}</h3><span>{item.price} <ArrowUpRight size={16} /></span></div>
          </button>
        ))}
      </div>
    </section>
  )
}

function WhyHayakuki() {
  return (
    <section className="why-section">
      <div className="why-title"><span className="section-kicker">Why hayakuki</span><h2>The calm way<br />to book a flight.</h2><p>Fewer distractions, useful details, and all the confidence you need before take-off.</p></div>
      <div className="why-grid">
        <article><span>01</span><WalletCards size={24} /><h3>Honest prices</h3><p>No surprise fees waiting at checkout. What you see is what you pay.</p></article>
        <article><span>02</span><Leaf size={24} /><h3>Smarter choices</h3><p>Compare time, cost and carbon—without opening twelve tabs.</p></article>
        <article><span>03</span><TicketCheck size={24} /><h3>Trips in one place</h3><p>Save options, keep your itinerary handy, and get back to the fun bit.</p></article>
      </div>
    </section>
  )
}

function BookingModal({ flight, query, onClose, onConfirm }) {
  const [step, setStep] = useState('review')
  const [name, setName] = useState('')
  if (!flight) return null
  const taxes = 899
  const total = flight.price * Number(query.travellers) + taxes
  const confirm = () => {
    if (!name.trim()) return
    setStep('success')
    onConfirm({ ...flight, passenger: name, total })
  }
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="modal-close" onClick={onClose} aria-label="Close booking"><X size={20} /></button>
        {step === 'review' ? <>
          <span className="section-kicker">Almost there</span>
          <h2 id="booking-title">Review your trip</h2>
          <div className="modal-route">
            <div><strong>{flight.depart}</strong><span>{flight.from}</span><small>{airport(flight.from)?.city}</small></div>
            <div><Plane size={17} /><span>{flight.duration}</span><small>{flight.stops ? '1 stop' : 'Nonstop'}</small></div>
            <div><strong>{flight.arrive}</strong><span>{flight.to}</span><small>{airport(flight.to)?.city}</small></div>
          </div>
          <div className="modal-flight"><div className="airline-logo" style={{ '--airline': flight.color }}>{flight.short}</div><div><strong>{flight.airline} · {flight.id}</strong><span>{flight.aircraft}</span></div><div><Luggage size={16} /> {flight.baggage}</div></div>
          <label className="name-input"><span>Lead traveller</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name as on ID" autoFocus /><small>This is a demo—no payment details needed.</small></label>
          <div className="fare-summary"><div><span>Flight · {query.travellers} traveller{query.travellers !== '1' ? 's' : ''}</span><strong>₹{money.format(flight.price * Number(query.travellers))}</strong></div><div><span>Taxes & service</span><strong>₹{money.format(taxes)}</strong></div><div className="total"><span>Total</span><strong>₹{money.format(total)}</strong></div></div>
          <button className="confirm-button" disabled={!name.trim()} onClick={confirm}>Confirm demo booking <ArrowRight size={17} /></button>
          <p className="secure-note"><ShieldCheck size={14} /> Secure checkout · Free cancellation for 24 hours</p>
        </> : <div className="success-state">
          <span className="success-icon"><Check size={28} /></span><span className="section-kicker">Trip confirmed</span><h2>You're going to {airport(flight.to)?.city}!</h2><p>Your demo itinerary is now waiting in My trips.</p>
          <div className="booking-code"><span>Booking reference</span><strong>HYK8Q2</strong></div>
          <button className="confirm-button" onClick={onClose}>Done</button>
        </div>}
      </div>
    </div>
  )
}

function TripsModal({ saved, bookings, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="trips-modal" role="dialog" aria-modal="true" aria-labelledby="trips-title">
        <button className="modal-close" onClick={onClose} aria-label="Close trips"><X size={20} /></button>
        <span className="section-kicker">Your travel space</span><h2 id="trips-title">My trips</h2>
        {bookings.length > 0 ? bookings.map((trip) => <div className="trip-ticket" key={trip.id}><div><span>UPCOMING</span><strong>{trip.from} <ArrowRight size={17} /> {trip.to}</strong><small>{trip.airline} · {trip.id}</small></div><div><strong>{trip.depart}</strong><small>14 Aug 2026</small></div><div className="ticket-code">HYK8Q2</div></div>) : <div className="no-trips"><TicketCheck size={28} /><h3>No booked trips yet</h3><p>Select any flight to try the demo booking flow.</p></div>}
        <div className="saved-summary"><div><Heart size={17} /><span><strong>{saved.length} saved flight{saved.length === 1 ? '' : 's'}</strong><small>They'll stay here while you compare.</small></span></div></div>
        <button className="confirm-button" onClick={onClose}>Keep exploring</button>
      </div>
    </div>
  )
}

function CompareBar({ compared, onClear }) {
  if (!compared.length) return null
  return <div className="compare-bar"><div><GitCompareArrows size={18} /><span><strong>{compared.length} flight{compared.length > 1 ? 's' : ''} selected</strong><small>Pick up to 3 to compare</small></span></div><div className="compare-pills">{compared.map((id) => <span key={id}>{id}</span>)}</div><button disabled={compared.length < 2}>Compare now</button><button className="clear-compare" onClick={onClear} aria-label="Clear comparison"><X size={17} /></button></div>
}

function Footer() {
  return (
    <footer>
      <div className="footer-main"><div><Logo /><p>Good flights. Clear choices.<br />More places to be.</p></div><div><strong>Discover</strong><a href="#search">Flights</a><a href="#explore">Weekend ideas</a><a href="#results">Fare insights</a></div><div><strong>Company</strong><a href="#why">Our story</a><a href="#why">How it works</a><a href="mailto:hello@hayakuki.example">Say hello</a></div><div className="footer-postcard"><span>GOOD TO GO</span><Plane size={26} fill="currentColor" /><small>Made for curious travellers</small></div></div>
      <div className="footer-bottom"><span>© 2026 Hayakuki. A static portfolio experience.</span><div><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Accessibility</a></div></div>
    </footer>
  )
}

export default function App() {
  const [query, setQuery] = useState({ from: 'DEL', to: 'GOI', depart: '2026-08-14', returnDate: '2026-08-18', travellers: '1' })
  const [searched, setSearched] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [saved, setSaved] = useState([])
  const [compared, setCompared] = useState([])
  const [tripsOpen, setTripsOpen] = useState(false)
  const [bookings, setBookings] = useState([])

  const search = () => {
    if (query.from === query.to) setQuery((old) => ({ ...old, to: old.from === 'GOI' ? 'DEL' : 'GOI' }))
    setSearched(true)
    window.setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }
  const chooseDestination = (code) => {
    setQuery((old) => ({ ...old, to: code, from: code === old.from ? 'DEL' : old.from }))
    setSearched(true)
    window.setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }
  const confirmBooking = (trip) => setBookings((items) => [trip, ...items.filter((item) => item.id !== trip.id)])

  return (
    <>
      <Header savedCount={saved.length + bookings.length} onTrips={() => setTripsOpen(true)} />
      <Hero query={query} setQuery={setQuery} onSearch={search} />
      <Results query={query} searched={searched} onSelect={setSelectedFlight} saved={saved} setSaved={setSaved} compared={compared} setCompared={setCompared} />
      <Explore onChoose={chooseDestination} />
      <div id="why"><WhyHayakuki /></div>
      <Footer />
      <CompareBar compared={compared} onClear={() => setCompared([])} />
      <BookingModal flight={selectedFlight} query={query} onClose={() => setSelectedFlight(null)} onConfirm={confirmBooking} />
      {tripsOpen && <TripsModal saved={saved} bookings={bookings} onClose={() => setTripsOpen(false)} />}
    </>
  )
}
