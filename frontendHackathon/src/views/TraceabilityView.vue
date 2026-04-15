<script setup>
import { computed } from 'vue'
import DataTable from '@/components/common/DataTable.vue'
import StatCard from '@/components/common/StatCard.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import { useRequestStore } from '@/stores/requestStore'
import { formatDate } from '@/utils/formatters'

const requestStore = useRequestStore()

const stats = computed(() => [
  {
    title: 'Registros trazables',
    value: requestStore.traceabilityRows.length,
    hint: 'Histórico consolidado para auditoría social',
    accent: 'brand'
  },
  {
    title: 'Entregas verificadas',
    value: requestStore.traceabilityRows.filter((item) => item.status === 'delivered').length,
    hint: 'Ciclos cerrados con evidencia temporal',
    accent: 'ocean'
  },
  {
    title: 'En seguimiento',
    value: requestStore.traceabilityRows.filter((item) => item.status !== 'delivered').length,
    hint: 'Rutas y asignaciones aún abiertas',
    accent: 'amber'
  }
])

const columns = [
  { key: 'donor', label: 'Donante' },
  { key: 'receiver', label: 'Receptor' },
  { key: 'donation', label: 'Alimento' },
  { key: 'publishedAt', label: 'Publicación' },
  { key: 'assignedAt', label: 'Asignación' },
  { key: 'deliveredAt', label: 'Entrega' },
  { key: 'status', label: 'Estado' },
  { key: 'observations', label: 'Observaciones' }
]
</script>

<template>
  <div class="page-shell">
    <section class="grid gap-4 md:grid-cols-3">
      <StatCard
        v-for="item in stats"
        :key="item.title"
        :title="item.title"
        :value="item.value"
        :hint="item.hint"
        :accent="item.accent"
      />
    </section>

    <section class="panel-surface p-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Auditoría social</p>
          <h2 class="mt-2 section-title">Tabla de trazabilidad</h2>
        </div>
        <p class="text-sm text-slate-500">
          Seguimiento de publicación, asignación, entrega y observaciones de cada caso.
        </p>
      </div>

      <div class="mt-6">
        <DataTable :columns="columns" :rows="requestStore.traceabilityRows" empty-text="No hay registros aún.">
          <template #cell-publishedAt="{ value }">
            {{ formatDate(value) }}
          </template>
          <template #cell-assignedAt="{ value }">
            {{ formatDate(value) }}
          </template>
          <template #cell-deliveredAt="{ value }">
            {{ formatDate(value) }}
          </template>
          <template #cell-status="{ value }">
            <StatusBadge :status="value" />
          </template>
        </DataTable>
      </div>
    </section>
  </div>
</template>
