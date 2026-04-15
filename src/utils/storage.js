export function cloneData(value) {
  return JSON.parse(JSON.stringify(value))
}

export function loadState(key, fallback) {
  if (typeof window === 'undefined') {
    return cloneData(fallback)
  }

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : cloneData(fallback)
  } catch (error) {
    console.warn(`No se pudo leer ${key} desde localStorage.`, error)
    return cloneData(fallback)
  }
}

export function saveState(key, value) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`No se pudo guardar ${key} en localStorage.`, error)
  }
}

export function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`
}
