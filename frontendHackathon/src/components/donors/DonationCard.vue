<script setup>
import StatusBadge from '@/components/common/StatusBadge.vue'
import { formatDate, formatRelativeUrgency } from '@/utils/formatters'

const props = defineProps({
  donation: {
    type: Object,
    required: true
  },
  highlight: {
    type: Boolean,
    default: false
  },
  distanceLabel: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <article
    class="panel-surface h-full overflow-hidden p-5 transition duration-200"
    :class="props.highlight ? 'ring-2 ring-brand-300' : 'hover:-translate-y-1'"
  >
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-brand-700">{{ props.donation.donorName }}</p>
        <h3 class="mt-1 font-display text-xl font-semibold text-slate-950">
          {{ props.donation.foodType }}
        </h3>
      </div>
      <StatusBadge :status="props.donation.status" />
    </div>

    <div class="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
      <div>
        <p class="font-semibold text-slate-500">Categoría</p>
        <p class="mt-1 text-slate-900">{{ props.donation.category }}</p>
      </div>
      <div>
        <p class="font-semibold text-slate-500">Cantidad</p>
        <p class="mt-1 text-slate-900">
          {{ props.donation.quantity }} {{ props.donation.unit }}
        </p>
      </div>
      <div>
        <p class="font-semibold text-slate-500">Vencimiento</p>
        <p class="mt-1 text-slate-900">{{ formatDate(props.donation.expirationDate) }}</p>
      </div>
      <div>
        <p class="font-semibold text-slate-500">Urgencia</p>
        <p class="mt-1 text-slate-900">{{ formatRelativeUrgency(props.donation.expirationDate) }}</p>
      </div>
    </div>

    <div class="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
      <p class="font-semibold text-slate-500">Ubicación</p>
      <p class="mt-1">{{ props.donation.location }}</p>
      <p v-if="props.distanceLabel" class="mt-2 font-medium text-ocean-700">
        Cercanía estimada: {{ props.distanceLabel }}
      </p>
    </div>

    <p class="mt-4 text-sm leading-6 text-slate-600">
      {{ props.donation.observations }}
    </p>

    <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
      <p class="text-xs uppercase tracking-[0.18em] text-slate-400">
        Publicada {{ formatDate(props.donation.publishedAt) }}
      </p>
      <slot name="footer" />
    </div>
  </article>
</template>
