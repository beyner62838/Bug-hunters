<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const icons = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M4 10.5v9.5h6v-6h4v6h6v-9.5"/></svg>',
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6v6H4z"/><path d="M14 4h6v3h-6z"/><path d="M14 11h6v9h-6z"/><path d="M4 14h6v7H4z"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20l-5-2V5l5 2 5-2 5 2v13l-5-2-5 2z"/><path d="M9 4.5V19.5"/><path d="M14 3.5V18.5"/></svg>',
  donations: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6c-.9-.9-2.3-.9-3.2 0l-.8.8-.8-.8c-.9-.9-2.3-.9-3.2 0-.9.9-.9 2.3 0 3.2l4 4 4-4c.9-.9.9-2.3 0-3.2z"/><path d="M4 17c0-3 2.5-5.5 5.5-5.5h1c3 0 5.5 2.5 5.5 5.5v1H4v-1z"/></svg>',
  newDonation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
  receivers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><path d="M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  requests: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h6"/><path d="M9 16h6"/><path d="M9 8h6"/><path d="M19 4H5a2 2 0 0 0-2 2v14l4-4h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/></svg>',
  traceability: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h5l2 3h7"/><path d="M20 18h-5l-2-3H6"/><path d="M12 3v18"/></svg>',
  training: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12l-10 6L2 12l10-6 10 6z"/><path d="M2 12l10 6 10-6"/><path d="M12 6v6"/></svg>',
  companies: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V8a2 2 0 0 1 2-2h5v15H3z"/><path d="M12 21V4h7a2 2 0 0 1 2 2v15h-9z"/><path d="M7 10h2"/><path d="M7 14h2"/><path d="M7 18h2"/></svg>',
  admin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l7 4v6c0 7-7 10-7 10S5 19 5 12V6l7-4z"/><path d="M9.5 9h5"/><path d="M12 12.5v5"/></svg>'
}

const sections = [
  {
    title: 'Visión',
    items: [
      { name: 'Inicio', to: '/', badge: '01', icon: 'home', roles: ['donor', 'beneficiary'] },
      { name: 'Dashboard', to: '/dashboard', badge: '02', icon: 'dashboard', roles: ['donor', 'beneficiary'] },
      { name: 'Mapa', to: '/map', badge: '03', icon: 'map', roles: ['donor'] }
    ]
  },
  {
    title: 'Operación',
    items: [
      { name: 'Donaciones', to: '/donations', badge: '04', icon: 'donations', roles: ['donor'] },
      { name: 'Nueva donación', to: '/donations/new', badge: '05', icon: 'newDonation', roles: ['donor'] },
      { name: 'Receptores', to: '/receivers', badge: '06', icon: 'receivers', roles: ['donor'] },
      { name: 'Solicitudes', to: '/requests', badge: '07', icon: 'requests', roles: ['donor'] },
      { name: 'Trazabilidad', to: '/traceability', badge: '08', icon: 'traceability', roles: ['donor'] }
    ]
  },
  {
    title: 'Inclusión',
    items: [
      { name: 'Formación', to: '/training', badge: '09', icon: 'training', roles: ['donor', 'beneficiary'] },
      { name: 'Empresas aliadas', to: '/companies', badge: '10', icon: 'companies', roles: ['donor', 'beneficiary'] },
      { name: 'Administración', to: '/admin', badge: '11', icon: 'admin', roles: ['donor'] }
    ]
  }
]

const availableSections = computed(() =>
  sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => authStore.canAccess(item.roles))
    }))
    .filter((section) => section.items.length > 0)
)

const drawerClasses = computed(() =>
  props.isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 lg:translate-x-0 lg:opacity-100'
)

const roleMission = computed(() =>
  authStore.role === 'beneficiary'
    ? 'Conectar personas con cursos útiles y vacantes aliadas para impulsar empleabilidad.'
    : 'Reducir desperdicio, acelerar distribución segura y abrir rutas de empleabilidad.'
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

async function handleLogout() {
  authStore.logout()
  closeSidebar()
  await router.push({ name: 'login' })
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
        <p class="text-xs uppercase tracking-[0.22em] text-brand-200">Sesión activa</p>
        <p class="mt-2 text-base font-semibold text-white">{{ authStore.currentUser?.name }}</p>
        <p class="mt-1 text-sm text-slate-400">
          {{ authStore.roleLabel }} · {{ authStore.currentUser?.organization }}
        </p>
      </div>

      <div class="mb-6 rounded-3xl border border-white/10 bg-white/5 p-4">
        <p class="text-xs uppercase tracking-[0.22em] text-brand-200">Misión</p>
        <p class="mt-2 text-sm leading-6 text-slate-300">
          {{ roleMission }}
        </p>
      </div>

      <nav class="flex-1 space-y-6 overflow-y-auto pr-2">
        <section v-for="section in availableSections" :key="section.title">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {{ section.title }}
          </p>
          <div class="space-y-1.5">
            <RouterLink
              v-for="item in section.items"
              :key="item.to"
              :to="item.to"
              class="group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition"
              :class="
                isActive(item.to)
                  ? 'bg-white text-slate-950 shadow-soft'
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              "
              @click="closeSidebar"
            >
              <span
                class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-slate-200 transition group-hover:bg-white/10 group-hover:text-white"
                v-html="icons[item.icon]"
              ></span>
              <span class="flex-1 font-medium">{{ item.name }}</span>
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

      <div class="mt-6 space-y-3">
        <div class="rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/20 to-ocean-500/10 p-4">
          <p class="text-sm font-semibold text-white">Demo con experiencia por rol</p>
          <p class="mt-1 text-sm text-slate-300">
            Navegación, permisos y acciones cambian según el perfil autenticado.
          </p>
        </div>
        <button
          type="button"
          class="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-rose-300/40 hover:bg-white/5 hover:text-white"
          @click="handleLogout"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  </div>
</template>
