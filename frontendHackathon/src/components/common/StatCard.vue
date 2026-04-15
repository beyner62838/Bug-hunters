<script setup>
import { computed } from 'vue'
import { formatNumber } from '@/utils/formatters'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  hint: {
    type: String,
    default: ''
  },
  accent: {
    type: String,
    default: 'brand'
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const accentMap = {
  brand: 'from-brand-400/30 to-brand-50',
  ocean: 'from-ocean-400/25 to-ocean-50',
  amber: 'from-amber-300/30 to-amber-50',
  slate: 'from-slate-300/25 to-slate-50'
}

const displayValue = computed(() =>
  typeof props.value === 'number' ? formatNumber(props.value, props.compact) : props.value
)
</script>

<template>
  <article class="panel-surface overflow-hidden p-5">
    <div
      class="stat-card-deco"
      :class="accentMap[props.accent] ?? accentMap.brand"
    >
      <span class="stat-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8h.01" />
          <path d="M12 11v4" />
        </svg>
      </span>
    </div>
    <p class="text-sm font-medium text-slate-300">{{ props.title }}</p>
    <p class="mt-2 font-display text-3xl font-semibold tracking-tight text-white">
      {{ displayValue }}
    </p>
    <p v-if="props.hint" class="mt-2 text-sm leading-6 text-slate-400">
      {{ props.hint }}
    </p>
  </article>
</template>
