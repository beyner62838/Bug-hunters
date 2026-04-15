<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const route = useRoute()

const sections = [
  {
    title: 'Visión',
    items: [
      { name: 'Inicio', to: '/', badge: '01' },
      { name: 'Dashboard', to: '/dashboard', badge: '02' },
      { name: 'Mapa', to: '/map', badge: '03' }
    ]
  },
  {
    title: 'Operación',
    items: [
      { name: 'Donaciones', to: '/donations', badge: '04' },
      { name: 'Nueva donación', to: '/donations/new', badge: '05' },
      { name: 'Receptores', to: '/receivers', badge: '06' },
      { name: 'Solicitudes', to: '/requests', badge: '07' },
      { name: 'Trazabilidad', to: '/traceability', badge: '08' }
    ]
  },
  {
    title: 'Inclusión',
    items: [
      { name: 'Formación', to: '/training', badge: '09' },
      { name: 'Empresas aliadas', to: '/companies', badge: '10' },
      { name: 'Administración', to: '/admin', badge: '11' }
    ]
  }
]

const drawerClasses = computed(() =>
  props.isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100'
)

function closeSidebar() {
  emit('close')
}

function isActive(path) {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(path)
}
</script>

<template>
  <div>
    <div
      class="fixed inset-0 z-30 bg-slate-950/35 backdrop-blur-sm transition lg:hidden"
      :class="props.isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'"
      @click="closeSidebar"
    ></div>

    <aside
      class="fixed inset-y-0 left-0 z-40 flex w-80 max-w-[86vw] flex-col border-r border-white/70 bg-slate-950 px-5 py-6 text-slate-100 shadow-2xl transition duration-300 lg:sticky lg:max-w-none"
      :class="drawerClasses"
    >
      <RouterLink to="/" class="mb-8 flex items-center gap-3" @click="closeSidebar">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-ocean-500 font-display text-lg font-bold text-white">
          RA
        </div>
        <div>
          <p class="font-display text-xl font-semibold tracking-tight text-white">RedAlimenta</p>
          <p class="text-sm text-slate-400">Hackathon social urbana</p>
        </div>
      </RouterLink>

      <div class="mb-6 rounded-3xl border border-white/10 bg-white/5 p-4">
        <p class="text-xs uppercase tracking-[0.22em] text-brand-200">Misión</p>
        <p class="mt-2 text-sm leading-6 text-slate-300">
          Reducir desperdicio, acelerar distribución segura y abrir rutas de empleabilidad.
        </p>
      </div>

      <nav class="flex-1 space-y-6 overflow-y-auto pr-2">
        <section v-for="section in sections" :key="section.title">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {{ section.title }}
          </p>
          <div class="space-y-1.5">
            <RouterLink
              v-for="item in section.items"
              :key="item.to"
              :to="item.to"
              class="group flex items-center justify-between rounded-2xl px-3 py-3 text-sm transition"
              :class="
                isActive(item.to)
                  ? 'bg-white text-slate-950 shadow-soft'
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              "
              @click="closeSidebar"
            >
              <span class="font-medium">{{ item.name }}</span>
              <span
                class="rounded-full px-2 py-1 text-xs font-semibold"
                :class="
                  isActive(item.to)
                    ? 'bg-brand-100 text-brand-800'
                    : 'bg-white/10 text-slate-400 group-hover:bg-white/15 group-hover:text-white'
                "
              >
                {{ item.badge }}
              </span>
            </RouterLink>
          </div>
        </section>
      </nav>

      <div class="mt-6 rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/20 to-ocean-500/10 p-4">
        <p class="text-sm font-semibold text-white">Impacto medible desde el primer demo</p>
        <p class="mt-1 text-sm text-slate-300">
          Flujos conectados para donación, distribución, formación y postulación laboral.
        </p>
      </div>
    </aside>
  </div>
</template>
