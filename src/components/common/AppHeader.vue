<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: 'RedAlimenta'
  }
})

defineEmits(['toggle-sidebar'])

const route = useRoute()

const contextualText = computed(() => {
  if (route.name === 'home') {
    return 'Red de redistribución alimentaria y oportunidades productivas'
  }

  return 'MVP navegable para operación, impacto y empleabilidad'
})
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-white/70 bg-white/80 backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-soft transition hover:border-brand-200 hover:text-brand-700 lg:hidden"
          @click="$emit('toggle-sidebar')"
        >
          <span class="text-lg font-semibold">≡</span>
        </button>

        <div>
          <p class="font-display text-2xl font-semibold tracking-tight text-slate-950">
            {{ props.title }}
          </p>
          <p class="text-sm text-slate-500">
            {{ contextualText }}
          </p>
        </div>
      </div>

      <div class="hidden items-center gap-3 sm:flex">
        <div class="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800">
          Demo universitaria
        </div>
        <RouterLink
          to="/donations/new"
          class="inline-flex items-center rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Publicar lote
        </RouterLink>
      </div>
    </div>
  </header>
</template>
