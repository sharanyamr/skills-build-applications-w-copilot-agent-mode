const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_HOST = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const API_BASE = `${API_HOST}/api`

export function apiUrl(path) {
  const normalized = path.replace(/^\/+/, '')
  return `${API_BASE}/${normalized}`
}

export function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return payload
  }

  if (Array.isArray(payload.data) || Array.isArray(payload.items) || Array.isArray(payload.results)) {
    return payload
  }

  const arrayValues = Object.values(payload).filter(Array.isArray)
  if (arrayValues.length === 1) {
    return arrayValues[0]
  }

  return payload
}
