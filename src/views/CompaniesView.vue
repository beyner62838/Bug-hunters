<script setup>
import { computed, ref } from 'vue'
import StatCard from '@/components/common/StatCard.vue'
import CompanyCard from '@/components/jobs/CompanyCard.vue'
import { useCompanyStore } from '@/stores/companyStore'

const companyStore = useCompanyStore()
const feedback = ref('')

const stats = computed(() => [
  {
    title: 'Empresas aliadas',
    value: companyStore.companies.length,
    hint: 'Organizaciones conectadas a la red',
    accent: 'brand'
  },
  {
    title: 'Vacantes disponibles',
    value: companyStore.totalVacancies,
    hint: 'Oportunidades visibles en el MVP',
    accent: 'ocean'
  },
  {
    title: 'Postulaciones realizadas',
    value: companyStore.applications.length,
    hint: 'Persistidas localmente para demo',
    accent: 'amber'
  }
])

function handleApply(companyId, vacancyId) {
  const result = companyStore.applyToVacancy(companyId, vacancyId)
  feedback.value = result
    ? 'Postulación registrada. El flujo de inclusión productiva quedó completado.'
    : 'Esta vacante ya tiene una postulación simulada.'
}
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
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Empresas aliadas</p>
          <h2 class="mt-2 section-title">Oportunidades laborales simuladas</h2>
        </div>
        <p class="text-sm text-slate-500">
          Conecta a personas formadas con vacantes de entrada y roles operativos.
        </p>
      </div>

      <div v-if="feedback" class="mt-6 rounded-3xl border border-ocean-100 bg-ocean-50 px-5 py-4 text-sm text-ocean-900">
        {{ feedback }}
      </div>

      <div class="mt-6 space-y-5">
        <CompanyCard
          v-for="company in companyStore.companies"
          :key="company.id"
          :company="company"
          :applied-vacancy-ids="companyStore.appliedVacancyIds"
          @apply="handleApply"
        />
      </div>
    </section>
  </div>
</template>
