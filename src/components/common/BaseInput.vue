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
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  min: {
    type: [String, Number],
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="block space-y-2">
    <span v-if="props.label" class="text-sm font-semibold text-slate-700">
      {{ props.label }}
    </span>
    <input
      :value="props.modelValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :required="props.required"
      :min="props.min"
      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-soft outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>
