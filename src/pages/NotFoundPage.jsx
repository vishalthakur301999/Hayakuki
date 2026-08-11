import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return <main className="not-found"><Compass /><span className="overline coral">404 · OFF ROUTE</span><h1>This destination<br />isn't on our map.</h1><p>Let's get you back to the departure board.</p><Link to="/"><ArrowLeft /> Back home</Link></main>
}
