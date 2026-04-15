<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import DataTable from '@/components/common/DataTable.vue'
import StatCard from '@/components/common/StatCard.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useDonationStore } from '@/stores/donationStore'
import { useRequestStore } from '@/stores/requestStore'
import { formatDate } from '@/utils/formatters'

const dashboardStore = useDashboardStore()
const donationStore = useDonationStore()
const requestStore = useRequestStore()

const recentDonations = computed(() => donationStore.donations.slice(0, 5))
const recentRequests = computed(() => requestStore.enrichedRequests.slice(0, 5))

const requestColumns = [
  { key: 'receiverName', label: 'Organización' },
  { key: 'donationLabel', label: 'Alimento' },
  { key: 'priority', label: 'Prioridad' },
  { key: 'status', label: 'Estado' },
  { key: 'requestedAt', label: 'Fecha' }
]
</script>

<template>
  <div class="page-shell">
    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard
        v-for="item in dashboardStore.dashboardStats"
        :key="item.title"
        :title="item.title"
        :value="item.value"
        :hint="item.hint"
        compact
        :accent="item.accent"
      />
    </section>

    <section class="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <article class="panel-surface p-6">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
              Operación visible
            </p>
            <h2 class="mt-2 section-title">Últimas solicitudes y asignaciones</h2>
          </div>
          <RouterLink
            to="/requests"
            class="inline-flex items-center rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
          >
            Gestionar solicitudes
          </RouterLink>
        </div>

        <div class="mt-6">
          <DataTable :columns="requestColumns" :rows="recentRequests" empty-text="Sin solicitudes activas.">
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
          </DataTable>
        </div>
      </article>

      <article class="panel-surface p-6">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-ocean-700">
          Foco del día
        </p>
        <h2 class="mt-2 section-title">Resumen ejecutivo</h2>

        <div class="mt-6 space-y-4">
          <div
            v-for="item in dashboardStore.summaryRows"
            :key="item.id"
            class="rounded-3xl bg-slate-50 px-5 py-4"
          >
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-sm font-medium text-slate-500">{{ item.label }}</p>
                <p class="mt-1 text-sm text-slate-600">{{ item.note }}</p>
              </div>
              <p class="font-display text-3xl font-semibold text-slate-950">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="grid gap-6 lg:grid-cols-2">
      <article class="panel-surface p-6">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
              Donaciones recientes
            </p>
            <h2 class="mt-2 section-title">Lotes visibles en la red</h2>
          </div>
          <RouterLink to="/donations" class="text-sm font-semibold text-brand-700">
            Ver todo
          </RouterLink>
        </div>

        <div class="mt-5 space-y-4">
          <div
            v-for="donation in recentDonations"
            :key="donation.id"
            class="rounded-3xl border border-slate-200 p-4"
          >
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="text-sm font-medium text-slate-500">{{ donation.donorName }}</p>
                <p class="mt-1 font-semibold text-slate-950">{{ donation.foodType }}</p>
              </div>
              <StatusBadge :status="donation.status" />
            </div>
            <div class="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
              <span>{{ donation.category }}</span>
              <span>{{ donation.quantity }} {{ donation.unit }}</span>
              <span>{{ formatDate(donation.expirationDate) }}</span>
            </div>
          </div>
        </div>
      </article>

      <article class="panel-surface p-6">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-ocean-700">
          Próximos pasos
        </p>
        <h2 class="mt-2 section-title">Flujos listos para demo</h2>

        <div class="mt-6 space-y-4">
          <div class="rounded-3xl bg-brand-50 p-5">
            <p class="text-sm font-semibold text-brand-800">Flujo 1 · Donación a trazabilidad</p>
            <p class="mt-2 text-sm leading-6 text-brand-900">
              Publica un lote, solicítalo desde receptores, avanza su estado y verifica el registro final en trazabilidad.
            </p>
          </div>
          <div class="rounded-3xl bg-ocean-50 p-5">
            <p class="text-sm font-semibold text-ocean-800">Flujo 2 · Formación a empleo</p>
            <p class="mt-2 text-sm leading-6 text-ocean-900">
              Inscribe a una persona en cursos básicos y postúlala a una vacante aliada desde el mismo ecosistema.
            </p>
          </div>
        </div>

        <div class="mt-6 grid gap-3 sm:grid-cols-2">
          <RouterLink
            to="/receivers"
            class="rounded-2xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
          >
            Solicitar alimentos
          </RouterLink>
          <RouterLink
            to="/companies"
            class="rounded-2xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-ocean-300 hover:text-ocean-700"
          >
            Revisar vacantes
          </RouterLink>
        </div>
      </article>
    </section>
  </div>
</template>
