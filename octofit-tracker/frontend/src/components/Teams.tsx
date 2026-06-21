import { useEffect, useState } from 'react'
import { apiUrl, normalizeResponse } from '../lib/api'

function Teams() {
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(apiUrl('teams'))
        const payload = await response.json()
        const data = normalizeResponse(payload)
        setTeams(Array.isArray(data) ? data : [])
      } catch (err) {
        setError('Failed to load teams')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div>
      <h2>Teams</h2>
      <p>API: {apiUrl('teams')}</p>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div>
          {teams.length === 0 ? (
            <p>No teams available.</p>
          ) : (
            <ul className="list-group">
              {teams.map((team, index) => (
                <li key={index} className="list-group-item">
                  <strong>{team.name}</strong> — Coach: {team.coach}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Teams
