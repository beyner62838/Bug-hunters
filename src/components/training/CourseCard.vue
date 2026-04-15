<script setup>
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  course: {
    type: Object,
    required: true
  },
  enrolled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['enroll'])
</script>

<template>
  <article class="panel-surface flex h-full flex-col p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-semibold text-brand-700">{{ props.course.category }}</p>
        <h3 class="mt-1 font-display text-xl font-semibold text-slate-950">
          {{ props.course.name }}
        </h3>
      </div>
      <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
        {{ props.course.level }}
      </span>
    </div>

    <p class="mt-4 flex-1 text-sm leading-6 text-slate-600">
      {{ props.course.description }}
    </p>

    <div class="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-600">
      <div class="rounded-2xl bg-slate-50 px-4 py-3">
        <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Duración</p>
        <p class="mt-1 font-semibold text-slate-900">{{ props.course.duration }}</p>
      </div>
      <div class="rounded-2xl bg-slate-50 px-4 py-3">
        <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Modalidad</p>
        <p class="mt-1 font-semibold text-slate-900">{{ props.course.modality }}</p>
      </div>
    </div>

    <div class="mt-5 flex items-center justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-slate-500">Disponibilidad</p>
        <p class="text-sm font-semibold text-slate-900">{{ props.course.availability }}</p>
      </div>
      <BaseButton
        :variant="props.enrolled ? 'secondary' : 'primary'"
        :disabled="props.enrolled"
        @click="emit('enroll', props.course.id)"
      >
        {{ props.enrolled ? 'Inscripción activa' : 'Inscribirme' }}
      </BaseButton>
    </div>
  </article>
</template>
