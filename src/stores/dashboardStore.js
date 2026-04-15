import { computed } from 'vue'
import { defineStore } from 'pinia'
import metricsSeed from '@/data/metrics.json'
import { useCompanyStore } from '@/stores/companyStore'
import { useDonationStore } from '@/stores/donationStore'
import { useRequestStore } from '@/stores/requestStore'
import { useTrainingStore } from '@/stores/trainingStore'

export const useDashboardStore = defineStore('dashboardStore', () => {
  const donationStore = useDonationStore()
  const requestStore = useRequestStore()
  const trainingStore = useTrainingStore()
  const companyStore = useCompanyStore()

  const homeContent = computed(() => metricsSeed)

  const dashboardStats = computed(() => [
    {
      title: 'Alimentos disponibles',
      value: donationStore.availableDonations.length,
      hint: 'Lotes listos para solicitud inmediata.',
      accent: 'brand'
    },
    {
      title: 'Donaciones activas',
      value: donationStore.activeDonations.length,
      hint: 'Seguimiento abierto en operación.',
      accent: 'ocean'
    },
    {
      title: 'Organizaciones conectadas',
      value: donationStore.receivers.length,
      hint: 'Red receptora habilitada para retiro o entrega.',
      accent: 'amber'
    },
    {
      title: 'Entregas completadas',
      value: requestStore.requests.filter((request) => request.status === 'delivered').length,
      hint: 'Solicitudes cerradas con trazabilidad.',
      accent: 'slate'
    },
    {
      title: 'Personas inscritas en cursos',
      value: trainingStore.enrollmentCount,
      hint: 'Inscripciones simuladas dentro del MVP.',
      accent: 'brand'
    }
  ])

  const summaryRows = computed(() => [
    {
      id: 'summary-01',
      label: 'Lotes con prioridad alta',
      value: donationStore.donations.filter((item) => item.priority === 'alta').length,
      note: 'Respuesta rápida requerida'
    },
    {
      id: 'summary-02',
      label: 'Solicitudes en tránsito',
      value: requestStore.requests.filter((item) => item.status === 'in_route').length,
      note: 'Entregas activas'
    },
    {
      id: 'summary-03',
      label: 'Vacantes aliadas',
      value: companyStore.totalVacancies,
      note: 'Oportunidades disponibles'
    },
    {
      id: 'summary-04',
      label: 'Postulaciones registradas',
      value: companyStore.applications.length,
      note: 'Simulaciones de inserción'
    }
  ])

  const statusDistribution = computed(() =>
    requestStore.requestsByStatus.map((item) => ({
      ...item,
      percentage:
        requestStore.requests.length === 0
          ? 0
          : Math.round((item.total / requestStore.requests.length) * 100)
    }))
  )

  const adminIndicators = computed(() => metricsSeed.adminIndicators)

  return {
    homeContent,
    dashboardStats,
    summaryRows,
    statusDistribution,
    adminIndicators
  }
})
