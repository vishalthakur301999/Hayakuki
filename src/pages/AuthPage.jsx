import { useState } from 'react'
import { ArrowRight, KeyRound, Plane } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { airports } from '../data'
import { useApp } from '../context/AppContext'

export function LoginPage() {
  const { login } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const isAdminEntry = location.state?.from === '/admin'
  const [email, setEmail] = useState(isAdminEntry ? 'admin@hayakuki.com' : 'vishal@hayakuki.com')
  const [password, setPassword] = useState('demo')
  const [error, setError] = useState('')
  const submit = (event) => { event.preventDefault(); const result = login(email, password); if (result.ok) navigate(location.state?.from || (result.user.role === 'admin' ? '/admin' : '/profile')); else setError(result.error) }
  return <main className="auth-page"><section className="auth-visual"><div><span className="overline">WELCOME BACK</span><h1>The world kept<br />your seat warm.</h1><p>This is a local demo account. Nothing leaves your browser.</p></div></section><section className="auth-form-wrap"><form className="auth-form" onSubmit={submit}><span className="auth-icon"><Plane /></span><h2>Sign in to Hayakuki</h2><p>Everything is already filled in. Any non-empty password works in this demo.</p><label><span>Email</span><input name="login-email" autoComplete="username" type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label><span>Password</span><input name="login-password" autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <div className="auth-error">{error}</div>}<button className="primary-action">Sign in <ArrowRight /></button><small className="auth-switch">New here? <Link to="/signup">Create a local demo account</Link></small></form></section></main>
}

export function SignupPage() {
  const { signup } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', home: 'New Delhi (DEL)', password: '' })
  const submit = (event) => { event.preventDefault(); signup(form); navigate('/profile') }
  return <main className="auth-page signup"><section className="auth-visual"><div><span className="overline">JOIN THE JOURNEY</span><h1>Pack light.<br />Dream big.</h1><p>Your account exists only in this browser and can be cleared anytime.</p></div></section><section className="auth-form-wrap"><form className="auth-form" autoComplete="off" onSubmit={submit}><span className="auth-icon"><KeyRound /></span><h2>Create local account</h2><p>Your details are stored only in this browser and will populate your profile and bookings.</p><div className="form-row"><label><span>Full name</span><input name="new-traveller-name" autoComplete="off" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label><label><span>Phone</span><input name="new-traveller-phone" autoComplete="off" required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="+91 98765 43210" /></label></div><label><span>Email</span><input name="new-traveller-email" autoComplete="off" required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label><label><span>Home airport</span><select name="new-traveller-airport" value={form.home} onChange={(event) => setForm({ ...form, home: event.target.value })}>{airports.map((item) => <option value={`${item.city} (${item.code})`} key={item.code}>{item.city} ({item.code})</option>)}</select></label><label><span>Password</span><input name="new-traveller-password" autoComplete="new-password" required type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Anything you like" /></label><button className="primary-action">Create account <ArrowRight /></button><small className="auth-switch">Already have one? <Link to="/login">Sign in</Link></small></form></section></main>
}
