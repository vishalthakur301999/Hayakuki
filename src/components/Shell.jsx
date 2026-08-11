import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { CircleUserRound, Heart, LogOut, Menu, Plane, ShieldCheck, TicketCheck, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function Logo() {
  return <Link className="brand" to="/"><span className="brand-mark"><Plane size={17} fill="currentColor" /></span><span>HAYAKUKI</span></Link>
}

export default function Shell() {
  const [open, setOpen] = useState(false)
  const { user, logout, saved } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const signOut = () => { logout(); setOpen(false); navigate('/') }
  const navClass = ({ isActive }) => isActive ? 'active' : ''

  return <div className="app-shell">
    <header className={location.pathname === '/' ? 'app-header overlay' : 'app-header'}>
      <div className="header-wrap">
        <Logo />
        <nav className={open ? 'main-nav open' : 'main-nav'}>
          <NavLink className={navClass} to="/" onClick={() => setOpen(false)}>Fly</NavLink>
          <NavLink className={navClass} to="/stories" onClick={() => setOpen(false)}>Travel ideas</NavLink>
          <NavLink className={navClass} to="/bookings" onClick={() => setOpen(false)}>My bookings</NavLink>
          {user?.role === 'admin' && <NavLink className={navClass} to="/admin" onClick={() => setOpen(false)}><ShieldCheck size={14} /> Admin</NavLink>}
        </nav>
        <div className="account-actions">
          <Link to="/profile" className="saved-link" title="Saved flights"><Heart size={16} /> <span>{saved.length}</span></Link>
          {user ? <div className="user-menu">
            <Link to="/profile" className="avatar">{user.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</Link>
            <div className="user-menu-copy"><span>{user.name.split(' ')[0]}</span><small>{user.role}</small></div>
            <button onClick={signOut} title="Sign out"><LogOut size={16} /></button>
          </div> : <Link to="/login" className="signin-link"><CircleUserRound size={17} /> Sign in</Link>}
          <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
    <Outlet />
    <footer className="app-footer">
      <div className="footer-wrap"><div><Logo /><p>Flights, stories and a little more world.</p></div><div><strong>Explore</strong><Link to="/">Search flights</Link><Link to="/stories">Travel stories</Link><Link to="/bookings">My bookings</Link></div><div><strong>Account</strong><Link to="/login">Demo login</Link><Link to="/profile">Profile</Link>{user?.role === 'admin' ? <Link to="/admin">Admin console</Link> : <Link to="/login" state={{ from: '/admin' }}>Admin console</Link>}</div><div className="footer-seal"><TicketCheck size={26} /><span>GOOD TO GO</span><small>Since the old days</small></div></div>
      <div className="footer-legal">© 2026 Hayakuki · Local portfolio experience · No real bookings are made</div>
    </footer>
  </div>
}
