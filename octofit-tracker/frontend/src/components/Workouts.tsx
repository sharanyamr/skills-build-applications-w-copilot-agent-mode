import { useEffect, useState } from 'react'
import { apiUrl, normalizeResponse } from '../lib/api'

function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(apiUrl('workouts'))
        const payload = await response.json()
        const data = normalizeResponse(payload)
        setWorkouts(Array.isArray(data) ? data : [])
      } catch (err) {
        setError('Failed to load workouts')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div>
      <h2>Workouts</h2>
      <p>API: {apiUrl('workouts')}</p>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div>
          {workouts.length === 0 ? (
            <p>No workouts found.</p>
          ) : (
            <ul className="list-group">
              {workouts.map((workout, index) => (
                <li key={index} className="list-group-item">
                  <strong>{workout.title}</strong> — {workout.difficulty}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Workouts
