import { useEffect, useState } from 'react'
import { apiUrl, normalizeResponse } from '../lib/api'

function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(apiUrl('leaderboard'))
        const payload = await response.json()
        const data = normalizeResponse(payload)
        setEntries(Array.isArray(data) ? data : [])
      } catch (err) {
        setError('Failed to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div>
      <h2>Leaderboard</h2>
      <p>API: {apiUrl('leaderboard')}</p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div>
          {entries.length === 0 ? (
            <p>No leaderboard entries available.</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.rank}</td>
                    <td>{entry.userId?.name ?? entry.userId ?? 'Unknown'}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

export default Leaderboard
