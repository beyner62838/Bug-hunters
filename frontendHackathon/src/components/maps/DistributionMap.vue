<script setup>
import L from 'leaflet'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  donors: {
    type: Array,
    default: () => []
  },
  receivers: {
    type: Array,
    default: () => []
  },
  requests: {
    type: Array,
    default: () => []
  },
  zones: {
    type: Array,
    default: () => []
  }
})

const mapElement = ref(null)
let mapInstance = null
let layerGroup = null

onMounted(() => {
  mapInstance = L.map(mapElement.value, {
    zoomControl: false
  }).setView([2.9358, -75.2809], 13)

  L.control.zoom({ position: 'bottomright' }).addTo(mapInstance)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapInstance)

  layerGroup = L.layerGroup().addTo(mapInstance)
  renderLayers()
})

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove()
  }
})

watch(
  () => [props.donors, props.receivers, props.requests, props.zones],
  () => {
    renderLayers()
  },
  { deep: true }
)

function renderLayers() {
  if (!layerGroup || !mapInstance) {
    return
  }

  layerGroup.clearLayers()

  props.zones.forEach((zone) => {
    L.circle([zone.lat, zone.lng], {
      radius: 520,
      color: '#1496f0',
      fillColor: '#39b7ff',
      fillOpacity: 0.16,
      weight: 1.2
    })
      .bindPopup(`<strong>${zone.name}</strong><br/>${zone.description}`)
      .addTo(layerGroup)
  })

  props.donors.forEach((donor) => {
    L.marker([donor.lat, donor.lng], {
      icon: buildIcon('#2e9f72', 'D')
    })
      .bindPopup(
        `<strong>${donor.name}</strong><br/>${donor.type}<br/>${donor.address}, ${donor.neighborhood}`
      )
      .addTo(layerGroup)
  })

  props.receivers.forEach((receiver) => {
    L.marker([receiver.lat, receiver.lng], {
      icon: buildIcon('#0876cc', 'R')
    })
      .bindPopup(
        `<strong>${receiver.name}</strong><br/>${receiver.type}<br/>${receiver.address}<br/>Beneficiarios: ${receiver.beneficiaries}`
      )
      .addTo(layerGroup)
  })

  props.requests
    .filter((request) => ['assigned', 'in_route', 'delivered'].includes(request.status))
    .forEach((request) => {
      const donor = props.donors.find((item) => item.id === request.donation?.donorId)
      const receiver = props.receivers.find((item) => item.id === request.receiverId)

      if (!donor || !receiver) {
        return
      }

      const routeColor =
        request.status === 'delivered'
          ? '#10b981'
          : request.status === 'in_route'
            ? '#8b5cf6'
            : '#1496f0'

      L.polyline(
        [
          [donor.lat, donor.lng],
          [receiver.lat, receiver.lng]
        ],
        {
          color: routeColor,
          weight: 4,
          opacity: 0.78,
          dashArray: request.status === 'delivered' ? null : '9 8'
        }
      )
        .bindPopup(
          `<strong>${request.donationLabel}</strong><br/>${donor.name} → ${receiver.name}<br/>Estado: ${request.status}`
        )
        .addTo(layerGroup)
    })
}

function buildIcon(color, label) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 34px;
        height: 34px;
        border-radius: 999px;
        background: ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.25);
        border: 3px solid white;
      ">${label}</div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  })
}
</script>

<template>
  <div class="panel-surface overflow-hidden p-3">
    <div ref="mapElement" class="h-[520px] w-full rounded-[28px]"></div>
  </div>
</template>
