import { useEffect, useState } from 'react'
import { apiUrl, normalizeResponse } from '../lib/api'

function Users() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(apiUrl('users'))
        const payload = await response.json()
        const data = normalizeResponse(payload)
        setUsers(Array.isArray(data) ? data : [])
      } catch (err) {
        setError('Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <p>API: {apiUrl('users')}</p>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <ul className="list-group">
              {users.map((user, index) => (
                <li key={index} className="list-group-item">
                  <strong>{user.name}</strong> — {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Users
