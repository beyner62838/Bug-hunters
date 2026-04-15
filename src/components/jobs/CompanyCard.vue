<script setup>
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  company: {
    type: Object,
    required: true
  },
  appliedVacancyIds: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['apply'])

function isApplied(vacancyId) {
  return props.appliedVacancyIds.includes(vacancyId)
}
</script>

<template>
  <article class="panel-surface overflow-hidden p-5">
    <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <p class="text-sm font-semibold text-brand-700">{{ props.company.sector }}</p>
        <h3 class="mt-1 font-display text-2xl font-semibold text-slate-950">
          {{ props.company.name }}
        </h3>
        <p class="mt-2 text-sm text-slate-500">
          {{ props.company.location }} · {{ props.company.impactLine }}
        </p>
      </div>
      <div class="rounded-2xl bg-ocean-50 px-4 py-3 text-sm font-medium text-ocean-700">
        {{ props.company.vacancies.length }} vacantes simuladas
      </div>
    </div>

    <div class="mt-6 grid gap-4 lg:grid-cols-2">
      <div
        v-for="vacancy in props.company.vacancies"
        :key="vacancy.id"
        class="rounded-3xl border border-slate-200 bg-slate-50/80 p-4"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="font-semibold text-slate-950">{{ vacancy.title }}</p>
            <p class="mt-1 text-sm text-slate-500">{{ vacancy.mode }}</p>
          </div>
          <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {{ props.company.sector }}
          </span>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="profile in vacancy.profiles"
            :key="profile"
            class="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600"
          >
            {{ profile }}
          </span>
        </div>

        <div class="mt-5">
          <BaseButton
            block
            :variant="isApplied(vacancy.id) ? 'secondary' : 'primary'"
            :disabled="isApplied(vacancy.id)"
            @click="emit('apply', props.company.id, vacancy.id)"
          >
            {{ isApplied(vacancy.id) ? 'Postulación enviada' : 'Postularme' }}
          </BaseButton>
        </div>
      </div>
    </div>
  </article>
</template>
