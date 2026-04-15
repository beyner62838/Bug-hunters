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
      class="mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br"
      :class="accentMap[props.accent] ?? accentMap.brand"
    ></div>
    <p class="text-sm font-medium text-slate-500">{{ props.title }}</p>
    <p class="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-950">
      {{ displayValue }}
    </p>
    <p v-if="props.hint" class="mt-2 text-sm leading-6 text-slate-500">
      {{ props.hint }}
    </p>
  </article>
</template>
