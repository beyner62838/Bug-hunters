export function distanceInKm(from, to) {
  if (!from?.lat || !from?.lng || !to?.lat || !to?.lng) {
    return null
  }

  const earthRadius = 6371
  const dLat = degreesToRadians(to.lat - from.lat)
  const dLng = degreesToRadians(to.lng - from.lng)
  const startLat = degreesToRadians(from.lat)
  const endLat = degreesToRadians(to.lat)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(startLat) * Math.cos(endLat)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return earthRadius * c
}

export function formatDistance(distance) {
  if (distance === null || distance === undefined) {
    return 'Sin cálculo'
  }

  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`
  }

  return `${distance.toFixed(1)} km`
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180
}
