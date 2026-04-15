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

const sections = [
  {
    title: 'Visión',
    items: [
      { name: 'Inicio', to: '/', badge: '01', roles: ['donor', 'beneficiary'] },
      { name: 'Dashboard', to: '/dashboard', badge: '02', roles: ['donor', 'beneficiary'] },
      { name: 'Mapa', to: '/map', badge: '03', roles: ['donor'] }
    ]
  },
  {
    title: 'Operación',
    items: [
      { name: 'Donaciones', to: '/donations', badge: '04', roles: ['donor'] },
      { name: 'Nueva donación', to: '/donations/new', badge: '05', roles: ['donor'] },
      { name: 'Receptores', to: '/receivers', badge: '06', roles: ['donor'] },
      { name: 'Solicitudes', to: '/requests', badge: '07', roles: ['donor'] },
      { name: 'Trazabilidad', to: '/traceability', badge: '08', roles: ['donor'] }
    ]
  },
  {
    title: 'Inclusión',
    items: [
      { name: 'Formación', to: '/training', badge: '09', roles: ['donor', 'beneficiary'] },
      { name: 'Empresas aliadas', to: '/companies', badge: '10', roles: ['donor', 'beneficiary'] },
      { name: 'Administración', to: '/admin', badge: '11', roles: ['donor'] }
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
      class="fixed inset-0 z-30 bg-slate-950/20 backdrop-blur-sm transition lg:hidden"
      :class="props.isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'"
      @click="closeSidebar"
    ></div>

    <aside
      class="fixed inset-y-0 left-0 z-40 flex w-80 max-w-[86vw] flex-col border-r border-slate-200 bg-slate-100 px-5 py-6 text-slate-900 shadow-2xl transition duration-300 lg:sticky lg:max-w-none"
      :class="drawerClasses"
    >
      <RouterLink to="/" class="mb-8 flex items-center gap-3" @click="closeSidebar">
        <div class="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 font-display text-lg font-bold text-white shadow-sm">
          <svg viewBox="0 0 24 24" class="h-7 w-7" fill="none" xmlns="https://img.icons8.com/?size=100&id=G9aQlVzIT6H5&format=png&color=000000">
            <circle cx="12" cy="11" r="6" fill="#ffffff" />
            <path d="M15 5.5c0 1.38-1.12 2.5-2.5 2.5S10 6.88 10 5.5" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" />
            <path d="M13.5 2.5c.5.2.9.7 1 1.3" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" />
            <path d="M16 3.5c0 .83-.67 1.5-1.5 1.5" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" />
            <path d="M8.5 17c.6 1.2 2.2 1.4 3.4.8 1.3-.6 1.8-2.1 1.2-3.4-.6-1.3-2.1-1.8-3.4-1.2-1.3.6-1.8 2.1-1.2 3.4Z" fill="#f0c1a0" />
            <path d="M9 15.2c1.1.5 2.4.2 3.1-.8" stroke="#1a1a1a" stroke-width="1.2" stroke-linecap="round" />
          </svg>
        </div>
        <div>
          <p class="font-display text-xl font-semibold tracking-tight text-slate-950">RedAlimenta</p>
          <p class="text-sm text-slate-600">Hackathon social urbana</p>
        </div>
      </RouterLink>

      <div class="mb-6 rounded-3xl border border-red-100 bg-red-50 p-4">
        <p class="text-xs uppercase tracking-[0.22em] text-red-700">Sesión activa</p>
        <p class="mt-2 text-base font-semibold text-slate-950">{{ authStore.currentUser?.name }}</p>
        <p class="mt-1 text-sm text-slate-600">
          {{ authStore.roleLabel }} · {{ authStore.currentUser?.organization }}
        </p>
      </div>

      <div class="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <p class="text-xs uppercase tracking-[0.22em] text-slate-600">Misión</p>
        <p class="mt-2 text-sm leading-6 text-slate-700">
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
              class="group sidebar-item flex items-center rounded-2xl px-3 py-3 text-sm transition"
              :class="
                isActive(item.to)
                  ? 'sidebar-item-active'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              "
              @click="closeSidebar"
            >
              <span class="flex-1 font-medium">{{ item.name }}</span>
              <span
                class="rounded-full px-2 py-1 text-xs font-semibold"
                :class="
                  isActive(item.to)
                    ? 'bg-red-100 text-red-800'
                    : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-700'
                "
              >
                {{ item.badge }}
              </span>
            </RouterLink>
          </div>
        </section>
      </nav>

      <div class="mt-6 space-y-3">
        <div class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <p class="text-sm font-semibold text-red-700">Demo con experiencia por rol</p>
          <p class="mt-1 text-sm text-slate-700">
            Navegación, permisos y acciones cambian según el perfil autenticado.
          </p>
        </div>
        <button
          type="button"
          class="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100"
          @click="handleLogout"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  </div>
</template>
