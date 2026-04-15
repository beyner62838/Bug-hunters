<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const isSubmitting = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const demoProfiles = [
  {
    role: 'donor',
    title: 'Acceso donante',
    description: 'Publica lotes, sigue solicitudes, revisa trazabilidad y navega el módulo operativo.',
    email: 'donante@redalimenta.demo',
    password: 'Red2026!'
  },
  {
    role: 'beneficiary',
    title: 'Acceso formación',
    description: 'Explora cursos, inscríbete y postúlate a vacantes dentro del flujo de inclusión productiva.',
    email: 'talento@redalimenta.demo',
    password: 'Red2026!'
  }
]

function useProfile(profile) {
  form.email = profile.email
  form.password = profile.password
}

async function handleSubmit() {
  isSubmitting.value = true

  const result = authStore.login(form)
  if (result) {
    await router.push(authStore.getDefaultRoute())
  }

  isSubmitting.value = false
}

async function quickAccess(role) {
  const result = authStore.loginAs(role)
  if (result) {
    await router.push(authStore.getDefaultRoute())
  }
}
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-slate-950">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,192,144,0.26),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(20,150,240,0.24),transparent_24%),linear-gradient(160deg,#09111f,#0f1a2f_55%,#13253a)]"></div>
    <div class="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div class="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section class="flex flex-col justify-center">
          <div class="inline-flex w-fit rounded-full border border-brand-400/20 bg-brand-400/10 px-4 py-2 text-sm font-semibold text-brand-100">
            RedAlimenta 
          </div>
          <h1 class="mt-6 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Redistribución alimentaria con rutas reales de inclusión productiva
          </h1>
          <p class="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Ingresa como donante para gestionar operación y donaciones, o entra como perfil de formación para simular cursos y postulaciones laborales.
          </p>

          <div class="mt-8 grid gap-4 md:grid-cols-2">
            <article
              v-for="profile in demoProfiles"
              :key="profile.role"
              class="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-200">
                {{ profile.title }}
              </p>
              <p class="mt-3 text-sm leading-6 text-slate-300">
                {{ profile.description }}
              </p>
              <div class="mt-4 rounded-2xl bg-slate-950/40 px-4 py-3 text-sm text-slate-300">
                <p>{{ profile.email }}</p>
                <p class="mt-1">{{ profile.password }}</p>
              </div>
              <BaseButton class="mt-4" variant="secondary" @click="quickAccess(profile.role)">
                Entrar con este perfil
              </BaseButton>
            </article>
          </div>
        </section>

        <section class="panel-surface p-6 sm:p-8">
          <div class="mx-auto max-w-md">
            <div class="mb-8">
              <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
                Iniciar sesión
              </p>
              <h2 class="mt-2 font-display text-3xl font-semibold text-slate-950">
                Acceso mock para la demo
              </h2>
              <p class="mt-3 text-base leading-7 text-slate-600">
                Usa cualquiera de las credenciales quemadas o toma acceso rápido con un clic.
              </p>
            </div>

            <form class="space-y-5" @submit.prevent="handleSubmit">
              <BaseInput v-model="form.email" label="Correo" placeholder="usuario@redalimenta.demo" />
              <BaseInput v-model="form.password" type="password" label="Contraseña" placeholder="••••••••" />

              <div
                v-if="authStore.lastError"
                class="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              >
                {{ authStore.lastError }}
              </div>

              <BaseButton type="submit" size="lg" block :disabled="isSubmitting">
                {{ isSubmitting ? 'Ingresando...' : 'Entrar al sistema' }}
              </BaseButton>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
