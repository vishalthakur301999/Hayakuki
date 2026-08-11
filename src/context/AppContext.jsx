import { createContext, useContext, useMemo, useState } from 'react'
import { demoUsers, flights as seedFlights } from '../data'

const AppContext = createContext(null)

const readLocal = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const writeLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

const starterBookings = [
  {
    id: 'HYK4N8', flightId: 'AI-1741', airline: 'Air India', from: 'DEL', to: 'JAI',
    depart: '09:20', arrive: '10:15', date: '2026-09-02', passenger: 'Vishal Thakur',
    total: 3609, status: 'Confirmed', seat: '12A', terminal: 'T3',
  },
]

const safeUser = (account) => account ? {
  name: account.name,
  email: account.email,
  phone: account.phone || '+91 98765 43210',
  role: account.role || 'traveller',
  home: account.home || 'New Delhi',
  tier: account.tier || 'New Voyager',
} : null

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = readLocal('hayakuki-user', null)
    if (stored?.email === 'traveller@hayakuki.com' || stored?.email === 'vishal@hayakuki.com') return safeUser(demoUsers[0])
    return stored
  })
  const [bookings, setBookings] = useState(() => readLocal('hayakuki-bookings', starterBookings).map((booking) => booking.passenger === 'Aarav Sharma' ? { ...booking, passenger: 'Vishal Thakur' } : booking))
  const [saved, setSaved] = useState(() => readLocal('hayakuki-saved', ['6E-2113']))
  const [managedFlights, setManagedFlights] = useState(() => readLocal('hayakuki-flights', seedFlights))
  const [query, setQuery] = useState(() => readLocal('hayakuki-search', {
    from: 'DEL', to: 'GOI', depart: '2026-08-14', returnDate: '2026-08-18', travellers: '1', tripType: 'round',
  }))
  const [selectedFlight, setSelectedFlightState] = useState(() => readLocal('hayakuki-selected', null))
  const [isSearching, setIsSearching] = useState(false)

  const login = (email, password) => {
    const localAccounts = readLocal('hayakuki-accounts', [])
    const found = [...demoUsers, ...localAccounts].find((item) => item.email.toLowerCase() === email.trim().toLowerCase())
    if (!found) return { ok: false, error: 'No local account uses that email yet. Try the prefilled demo or sign up.' }
    if (!password.trim()) return { ok: false, error: 'Enter anything in the password field—this is only a demo.' }
    const nextUser = safeUser(found)
    setUser(writeLocal('hayakuki-user', nextUser))
    return { ok: true, user: nextUser }
  }

  const signup = ({ name, email, phone, home }) => {
    const newUser = { name, email: email.trim().toLowerCase(), phone, role: 'traveller', home, tier: 'New Voyager' }
    const accounts = readLocal('hayakuki-accounts', [])
    writeLocal('hayakuki-accounts', [newUser, ...accounts.filter((item) => item.email !== newUser.email)])
    setUser(writeLocal('hayakuki-user', newUser))
    return newUser
  }

  const logout = () => {
    localStorage.removeItem('hayakuki-user')
    setUser(null)
  }

  const updateQuery = (next) => {
    const value = typeof next === 'function' ? next(query) : next
    setQuery(writeLocal('hayakuki-search', value))
  }

  const setSelectedFlight = (flight) => setSelectedFlightState(writeLocal('hayakuki-selected', flight))

  const toggleSaved = (id) => {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]
    setSaved(writeLocal('hayakuki-saved', next))
  }

  const addBooking = (booking) => {
    const next = [booking, ...bookings]
    setBookings(writeLocal('hayakuki-bookings', next))
  }

  const cancelBooking = (id) => {
    const next = bookings.map((item) => item.id === id ? { ...item, status: 'Cancelled' } : item)
    setBookings(writeLocal('hayakuki-bookings', next))
  }

  const addFlight = (flight) => {
    const next = [{ ...flight, id: flight.id.toUpperCase() }, ...managedFlights]
    setManagedFlights(writeLocal('hayakuki-flights', next))
  }

  const removeFlight = (id) => {
    const next = managedFlights.filter((item) => item.id !== id)
    setManagedFlights(writeLocal('hayakuki-flights', next))
  }

  const value = useMemo(() => ({
    user, login, signup, logout, bookings, addBooking, cancelBooking, saved, toggleSaved,
    flights: managedFlights, addFlight, removeFlight, query, setQuery: updateQuery,
    selectedFlight, setSelectedFlight, isSearching, setIsSearching,
  }), [user, bookings, saved, managedFlights, query, selectedFlight, isSearching])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
