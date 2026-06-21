import { useEffect, useState } from 'react'
import { apiUrl, normalizeResponse } from '../lib/api'

function Activities() {
  const [activities, setActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(apiUrl('activities'))
        const payload = await response.json()
        const data = normalizeResponse(payload)
        setActivities(Array.isArray(data) ? data : [])
      } catch (err) {
        setError('Failed to load activities')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div>
      <h2>Activities</h2>
      <p>API: {apiUrl('activities')}</p>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div>
          {activities.length === 0 ? (
            <p>No activities found.</p>
          ) : (
            <ul className="list-group">
              {activities.map((activity, index) => (
                <li key={index} className="list-group-item">
                  <strong>{activity.type}</strong> — {activity.durationMinutes} min
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Activities
