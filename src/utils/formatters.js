const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
})

const compactNumber = new Intl.NumberFormat('es-CO', {
  notation: 'compact',
  maximumFractionDigits: 1
})

const regularNumber = new Intl.NumberFormat('es-CO')

export function formatDate(value) {
  if (!value) {
    return 'Sin fecha'
  }

  return dateFormatter.format(new Date(value))
}

export function formatNumber(value, compact = false) {
  const formatter = compact ? compactNumber : regularNumber
  return formatter.format(value ?? 0)
}

export function formatRelativeUrgency(expirationDate) {
  if (!expirationDate) {
    return 'Sin dato'
  }

  const now = new Date()
  const target = new Date(expirationDate)
  const diffInDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24))

  if (diffInDays <= 0) {
    return 'Vence hoy'
  }

  if (diffInDays === 1) {
    return 'Vence mañana'
  }

  return `Vence en ${diffInDays} días`
}

export function capitalizeText(value) {
  if (!value) {
    return ''
  }

  return value.charAt(0).toUpperCase() + value.slice(1)
}
