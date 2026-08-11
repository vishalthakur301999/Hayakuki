import { ArrowRight, ArrowUpRight, BadgeIndianRupee, Leaf, ShieldCheck, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBox from '../components/SearchBox'
import { inspirations, stories } from '../data'
import { useApp } from '../context/AppContext'

export default function HomePage() {
  const navigate = useNavigate()
  const { query, setQuery } = useApp()
  const choose = (code) => { setQuery({ ...query, to: code, from: query.from === code ? 'DEL' : query.from }); navigate('/flights') }
  return <main className="home-page">
    <section className="dark-hero">
      <div className="hero-shade" />
      <div className="hero-content"><span className="overline">YOUR NEXT STORY STARTS HERE</span><h1>Find your way<br /><em>somewhere.</em></h1><p>Search thoughtful flight options across India, without the noise or the mystery fees.</p></div>
      <SearchBox />
      <div className="hero-facts"><span><ShieldCheck size={15} /> No hidden fees</span><span><BadgeIndianRupee size={15} /> Fare insights</span><span><Leaf size={15} /> Carbon estimates</span></div>
    </section>

    <section className="home-destinations page-width">
      <div className="page-section-head"><div><span className="overline coral">READY WHEN YOU ARE</span><h2>Places calling your name.</h2></div><p>Hand-picked routes for the season, with fares pulled from our dummy departure board.</p></div>
      <div className="dark-destination-grid">{inspirations.map((item, index) => <button key={item.city} className={`dark-destination ${item.className}`} onClick={() => choose(item.code)}><span>0{index + 1}</span><div className="destination-art" /><div><small>{item.kicker}</small><h3>{item.city}</h3><em>{item.price} <ArrowUpRight size={15} /></em></div></button>)}</div>
    </section>

    <section className="home-value"><div className="page-width value-layout"><div><span className="overline">THE HAYAKUKI DIFFERENCE</span><h2>Flight search,<br />with the lights dimmed.</h2><p>A calmer interface with the information that matters: timing, baggage, fares and a little environmental context.</p></div><div className="value-cards"><article><span>01</span><BadgeIndianRupee /><h3>Real-feeling fares</h3><p>Compare sample prices and nearby travel dates without leaving the page.</p></article><article><span>02</span><Sparkles /><h3>Useful shortlists</h3><p>Save options locally and come back after a refresh.</p></article><article><span>03</span><ShieldCheck /><h3>Full demo flow</h3><p>Sign in, book a flight and manage it—all without a backend.</p></article></div></div></section>

    <section className="story-preview page-width"><div className="page-section-head"><div><span className="overline coral">TRAVEL IDEAS</span><h2>Read before you go.</h2></div><Link to="/stories">All stories <ArrowRight size={16} /></Link></div><div className="story-preview-grid">{stories.slice(0, 3).map((story) => <Link to={`/stories/${story.id}`} className={`story-tile ${story.className}`} key={story.id}><div className="story-art" /><span>{story.category} · {story.readTime}</span><h3>{story.title}</h3><p>{story.excerpt}</p></Link>)}</div></section>
  </main>
}
