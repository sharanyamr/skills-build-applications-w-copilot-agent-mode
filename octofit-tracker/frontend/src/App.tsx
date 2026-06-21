import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Home from './components/Users'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/users">Users</Link>
              <Link className="nav-link" to="/teams">Teams</Link>
              <Link className="nav-link" to="/activities">Activities</Link>
              <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              <Link className="nav-link" to="/workouts">Workouts</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <div>
      <h1>OctoFit Tracker</h1>
      <p>Use the navigation above to view users, teams, activities, leaderboard, and workouts.</p>
      <p>
        Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces API routing.
      </p>
    </div>
  )
}

export default App
