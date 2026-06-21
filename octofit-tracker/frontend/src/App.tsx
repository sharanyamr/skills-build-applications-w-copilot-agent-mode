import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <div>
      <h1>OctoFit Tracker</h1>
      <p>Modern multi-tier tracker starter app.</p>
    </div>
  )
}

export default App
