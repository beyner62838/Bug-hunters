<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="block space-y-2">
    <span v-if="props.label" class="text-sm font-semibold text-slate-700">
      {{ props.label }}
    </span>
    <select
      :value="props.modelValue"
      :required="props.required"
      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-soft outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
      @change="emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>
