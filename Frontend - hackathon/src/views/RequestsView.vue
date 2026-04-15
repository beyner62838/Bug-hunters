<script setup>
import { computed } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import DataTable from '@/components/common/DataTable.vue'
import StatCard from '@/components/common/StatCard.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import { useRequestStore } from '@/stores/requestStore'
import { capitalizeText, formatDate } from '@/utils/formatters'

const requestStore = useRequestStore()

const stats = computed(() =>
  requestStore.requestsByStatus.map((item) => ({
    title: capitalizeText(item.status.replace('_', ' ')),
    value: item.total,
    hint: 'Solicitudes en este estado',
    accent: item.status === 'delivered' ? 'brand' : item.status === 'in_route' ? 'ocean' : 'amber'
  }))
)

const columns = [
  { key: 'receiverName', label: 'Organización' },
  { key: 'donationLabel', label: 'Alimento' },
  { key: 'quantity', label: 'Cantidad' },
  { key: 'priority', label: 'Prioridad' },
  { key: 'status', label: 'Estado' },
  { key: 'requestedAt', label: 'Fecha' },
  { key: 'actions', label: 'Gestión' }
]

function nextStepLabel(status) {
  const labels = {
    pending: 'Pasar a revisión',
    under_review: 'Asignar',
    assigned: 'Enviar a ruta',
    in_route: 'Marcar entregada',
    delivered: 'Cerrada'
  }

  return labels[status] ?? 'Actualizar'
}
</script>

<template>
  <div class="page-shell">
    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard
        v-for="item in stats"
        :key="item.title"
        :title="item.title"
        :value="item.value"
        :hint="item.hint"
        compact
        :accent="item.accent"
      />
    </section>

    <section class="panel-surface p-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Gestión operativa</p>
          <h2 class="mt-2 section-title">Solicitudes y asignaciones</h2>
        </div>
        <p class="text-sm text-slate-500">
          Avanza cada solicitud para completar el flujo de distribución y trazabilidad.
        </p>
      </div>

      <div class="mt-6">
        <DataTable :columns="columns" :rows="requestStore.enrichedRequests" empty-text="Aún no hay solicitudes registradas.">
          <template #cell-priority="{ value }">
            <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
              {{ value }}
            </span>
          </template>
          <template #cell-status="{ value }">
            <StatusBadge :status="value" />
          </template>
          <template #cell-requestedAt="{ value }">
            {{ formatDate(value) }}
          </template>
          <template #cell-actions="{ row }">
            <BaseButton
              size="sm"
              :variant="row.status === 'delivered' ? 'secondary' : 'primary'"
              :disabled="row.status === 'delivered'"
              @click="requestStore.advanceRequest(row.id)"
            >
              {{ nextStepLabel(row.status) }}
            </BaseButton>
          </template>
        </DataTable>
      </div>
    </section>
  </div>
</template>
