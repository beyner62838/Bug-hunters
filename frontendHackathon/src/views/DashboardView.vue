<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import DataTable from '@/components/common/DataTable.vue'
import StatCard from '@/components/common/StatCard.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import { useAuthStore } from '@/stores/authStore'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useDonationStore } from '@/stores/donationStore'
import { useRequestStore } from '@/stores/requestStore'
import { formatDate } from '@/utils/formatters'

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const donationStore = useDonationStore()
const requestStore = useRequestStore()

const recentDonations = computed(() => donationStore.donations.slice(0, 5))
const recentRequests = computed(() => requestStore.enrichedRequests.slice(0, 5))
const isBeneficiary = computed(() => authStore.role === 'beneficiary')

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

    <section v-if="!isBeneficiary" class="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
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

    <section v-else class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article class="panel-surface p-6">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
          Ruta personal
        </p>
        <h2 class="mt-2 section-title">Tu recorrido dentro de la plataforma</h2>
        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <div class="rounded-3xl bg-brand-50 p-5">
            <p class="text-sm font-semibold text-brand-800">1. Formación</p>
            <p class="mt-2 text-sm leading-6 text-brand-900">
              Revisa el catálogo y activa tu inscripción en los cursos base.
            </p>
          </div>
          <div class="rounded-3xl bg-ocean-50 p-5">
            <p class="text-sm font-semibold text-ocean-800">2. Preparación</p>
            <p class="mt-2 text-sm leading-6 text-ocean-900">
              Identifica habilidades útiles para logística, atención o soporte.
            </p>
          </div>
          <div class="rounded-3xl bg-slate-50 p-5">
            <p class="text-sm font-semibold text-slate-800">3. Postulación</p>
            <p class="mt-2 text-sm leading-6 text-slate-700">
              Navega empresas aliadas y envía tu interés a las vacantes disponibles.
            </p>
          </div>
        </div>
      </article>

      <article class="panel-surface p-6">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-ocean-700">
          Próximos pasos
        </p>
        <h2 class="mt-2 section-title">Acciones sugeridas</h2>
        <div class="mt-6 space-y-4">
          <RouterLink
            to="/training"
            class="block rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-brand-300"
          >
            <p class="font-semibold text-slate-950">Ir a cursos</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Inscríbete en formación básica y fortalece tu perfil.
            </p>
          </RouterLink>
          <RouterLink
            to="/companies"
            class="block rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-ocean-300"
          >
            <p class="font-semibold text-slate-950">Explorar vacantes</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Busca oportunidades alineadas con tus nuevas habilidades.
            </p>
          </RouterLink>
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
          <RouterLink v-if="!isBeneficiary" to="/donations" class="text-sm font-semibold text-brand-700">
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
        <h2 class="mt-2 section-title">{{ isBeneficiary ? 'Ruta de inclusión' : 'Flujos listos para demo' }}</h2>

        <div class="mt-6 space-y-4">
          <div class="rounded-3xl bg-brand-50 p-5">
            <p class="text-sm font-semibold text-brand-800">
              {{ isBeneficiary ? 'Cursos para arrancar' : 'Flujo 1 · Donación a trazabilidad' }}
            </p>
            <p class="mt-2 text-sm leading-6 text-brand-900">
              {{
                isBeneficiary
                  ? 'Inicia por los cursos de manipulación, habilidades digitales o logística básica.'
                  : 'Publica un lote, solicítalo desde receptores, avanza su estado y verifica el registro final en trazabilidad.'
              }}
            </p>
          </div>
          <div class="rounded-3xl bg-ocean-50 p-5">
            <p class="text-sm font-semibold text-ocean-800">
              {{ isBeneficiary ? 'Salida laboral' : 'Flujo 2 · Formación a empleo' }}
            </p>
            <p class="mt-2 text-sm leading-6 text-ocean-900">
              {{
                isBeneficiary
                  ? 'Después de inscribirte, explora empresas aliadas y simula tu postulación.'
                  : 'Inscribe a una persona en cursos básicos y postúlala a una vacante aliada desde el mismo ecosistema.'
              }}
            </p>
          </div>
        </div>

        <div class="mt-6 grid gap-3 sm:grid-cols-2">
          <RouterLink
            :to="isBeneficiary ? '/training' : '/receivers'"
            class="rounded-2xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
          >
            {{ isBeneficiary ? 'Ir a cursos' : 'Solicitar alimentos' }}
          </RouterLink>
          <RouterLink
            to="/companies"
            class="rounded-2xl border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-ocean-300 hover:text-ocean-700"
          >
            {{ isBeneficiary ? 'Ver vacantes' : 'Revisar vacantes' }}
          </RouterLink>
        </div>
      </article>
    </section>
  </div>
</template>
