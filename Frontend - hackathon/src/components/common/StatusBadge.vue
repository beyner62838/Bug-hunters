<script setup>
const props = defineProps({
  status: {
    type: String,
    default: 'available'
  }
})

const statusMap = {
  available: {
    label: 'Disponible',
    classes: 'bg-brand-50 text-brand-800 border-brand-100'
  },
  requested: {
    label: 'Solicitada',
    classes: 'bg-amber-50 text-amber-700 border-amber-100'
  },
  pending: {
    label: 'Pendiente',
    classes: 'bg-amber-50 text-amber-700 border-amber-100'
  },
  under_review: {
    label: 'En revisión',
    classes: 'bg-sky-50 text-sky-700 border-sky-100'
  },
  assigned: {
    label: 'Asignada',
    classes: 'bg-ocean-50 text-ocean-700 border-ocean-100'
  },
  in_route: {
    label: 'En ruta',
    classes: 'bg-violet-50 text-violet-700 border-violet-100'
  },
  delivered: {
    label: 'Entregada',
    classes: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  }
}

const current = statusMap[props.status] ?? {
  label: props.status,
  classes: 'bg-slate-100 text-slate-700 border-slate-200'
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]"
    :class="current.classes"
  >
    {{ current.label }}
  </span>
</template>
