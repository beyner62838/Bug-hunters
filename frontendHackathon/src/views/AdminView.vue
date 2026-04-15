<script setup>
import DataTable from '@/components/common/DataTable.vue'
import StatCard from '@/components/common/StatCard.vue'
import { useCompanyStore } from '@/stores/companyStore'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useDonationStore } from '@/stores/donationStore'
import { useTrainingStore } from '@/stores/trainingStore'

const dashboardStore = useDashboardStore()
const donationStore = useDonationStore()
const trainingStore = useTrainingStore()
const companyStore = useCompanyStore()

const summaryColumns = [
  { key: 'label', label: 'Indicador' },
  { key: 'value', label: 'Valor' },
  { key: 'note', label: 'Lectura' }
]

const impactColumns = [
  { key: 'title', label: 'KPI' },
  { key: 'value', label: 'Valor' },
  { key: 'description', label: 'Interpretación' }
]
</script>

<template>
  <div class="page-shell">
    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Comercios activos"
        :value="donationStore.donors.length"
        hint="Aliados con capacidad de publicación"
        accent="brand"
      />
      <StatCard
        title="Receptores conectados"
        :value="donationStore.receivers.length"
        hint="Nodos comunitarios registrados"
        accent="ocean"
      />
      <StatCard
        title="Personas en formación"
        :value="trainingStore.enrollmentCount"
        hint="Inscripciones acumuladas"
        accent="amber"
      />
      <StatCard
        title="Postulaciones"
        :value="companyStore.applications.length"
        hint="Ruta laboral activada"
        accent="slate"
      />
    </section>

    <section class="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <article class="panel-surface p-6">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Distribución de estados</p>
        <h2 class="mt-2 section-title">Salud operativa del sistema</h2>
        <div class="mt-6 space-y-4">
          <div
            v-for="item in dashboardStore.statusDistribution"
            :key="item.status"
            class="space-y-2"
          >
            <div class="flex items-center justify-between text-sm text-slate-600">
              <span class="font-semibold capitalize">{{ item.status.replace('_', ' ') }}</span>
              <span>{{ item.total }} · {{ item.percentage }}%</span>
            </div>
            <div class="h-3 rounded-full bg-slate-100">
              <div
                class="h-3 rounded-full bg-gradient-to-r from-brand-500 to-ocean-500"
                :style="{ width: `${item.percentage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </article>

      <article class="panel-surface p-6">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-ocean-700">Indicadores de impacto</p>
        <h2 class="mt-2 section-title">Lectura ejecutiva para jurados y aliados</h2>
        <div class="mt-6 grid gap-4">
          <div
            v-for="item in dashboardStore.adminIndicators"
            :key="item.title"
            class="rounded-3xl bg-slate-50 p-5"
          >
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-sm font-medium text-slate-500">{{ item.title }}</p>
                <p class="mt-1 text-sm text-slate-600">{{ item.description }}</p>
              </div>
              <p class="font-display text-3xl font-semibold text-slate-950">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <article class="panel-surface p-6">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Resumen general</p>
        <h2 class="mt-2 section-title">Tabla consolidada</h2>
        <div class="mt-6">
          <DataTable :columns="summaryColumns" :rows="dashboardStore.summaryRows" />
        </div>
      </article>

      <article class="panel-surface p-6">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-ocean-700">KPIs estratégicos</p>
        <h2 class="mt-2 section-title">Escalabilidad del piloto</h2>
        <div class="mt-6">
          <DataTable :columns="impactColumns" :rows="dashboardStore.adminIndicators" row-key="title" />
        </div>
      </article>
    </section>
  </div>
</template>
