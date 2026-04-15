<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  }
})

const variants = {
  primary: 'bg-slate-950 text-white hover:bg-brand-700 focus:ring-brand-300',
  secondary: 'bg-brand-50 text-brand-800 hover:bg-brand-100 focus:ring-brand-200',
  outline: 'border border-slate-300 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700 focus:ring-brand-200',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus:ring-slate-200'
}

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base'
}
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    class="inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50"
    :class="[variants[props.variant], sizes[props.size], props.block ? 'w-full' : '']"
  >
    <slot />
  </button>
</template>
