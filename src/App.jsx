import { Route, Routes } from 'react-router-dom'
import Shell from './components/Shell'
import HomePage from './pages/HomePage'
import FlightsPage from './pages/FlightsPage'
import { LoginPage, SignupPage } from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import BookingsPage from './pages/BookingsPage'
import CheckoutPage from './pages/CheckoutPage'
import { StoriesPage, StoryPage } from './pages/StoriesPage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return <><ScrollToTop /><Routes>
    <Route element={<Shell />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/flights" element={<FlightsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/checkout/:id" element={<CheckoutPage />} />
      <Route path="/stories" element={<StoriesPage />} />
      <Route path="/stories/:id" element={<StoryPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes></>
}
