<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  title: {
    type: String,
    default: 'RedAlimenta'
  }
})

defineEmits(['toggle-sidebar'])

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const icons = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 7H20v11.5"/><path d="M8 6h8"/><path d="M8 10h8"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 16l-4-4 4-4"/><path d="M5 12h11"/><path d="M19 5v14"/></svg>'
}

const contextualText = computed(() => {
  if (authStore.role === 'beneficiary') {
    return 'Ruta de formación, inscripción y postulación laboral'
  }

  if (route.name === 'home') {
    return 'Red de redistribución alimentaria y oportunidades productivas'
  }

  return 'MVP navegable para operación, impacto y empleabilidad'
})

const primaryActionIcon = computed(() => (authStore.role === 'beneficiary' ? icons.book : icons.plus))

const primaryAction = computed(() =>
  authStore.role === 'beneficiary'
    ? {
        to: '/training',
        label: 'Explorar cursos'
      }
    : {
        to: '/donations/new',
        label: 'Publicar lote'
      }
)

async function handleLogout() {
  authStore.logout()
  await router.push({ name: 'login' })
}
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-red-100 bg-white/98 backdrop-blur-xl text-slate-900">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600 shadow-soft transition hover:border-red-400 hover:text-red-700 lg:hidden"
          @click="$emit('toggle-sidebar')"
          aria-label="Abrir menú"
        >
          <span class="inline-flex h-5 w-5" v-html="icons.menu"></span>
        </button>

        <div>
          <p class="font-display text-2xl font-semibold tracking-tight text-slate-950">
            {{ props.title }}
          </p>
          <p class="text-sm text-slate-600">
            {{ contextualText }}
          </p>
        </div>
      </div>

      <div class="hidden items-center gap-3 sm:flex">
        <div class="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
          {{ authStore.roleLabel }}
        </div>
        <div class="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
          {{ authStore.currentUser?.name }}
        </div>
        <RouterLink
          :to="primaryAction.to"
          class="inline-flex items-center rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <span class="mr-2 inline-flex h-5 w-5" v-html="primaryActionIcon"></span>
          {{ primaryAction.label }}
        </RouterLink>
        <button
          type="button"
          class="inline-flex items-center rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-600"
          @click="handleLogout"
        >
          <span class="mr-2 inline-flex h-5 w-5" v-html="icons.logout"></span>
          Salir
        </button>
      </div>
    </div>
  </header>
</template>
