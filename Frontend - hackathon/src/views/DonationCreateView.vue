<script setup>
import { useRouter } from 'vue-router'
import DonationForm from '@/components/donors/DonationForm.vue'
import { useDonationStore } from '@/stores/donationStore'

const router = useRouter()
const donationStore = useDonationStore()

function handleCreateDonation(payload) {
  const newDonation = donationStore.createDonation(payload)

  router.push({
    name: 'donors',
    query: {
      highlight: newDonation.id
    }
  })
}
</script>

<template>
  <div class="page-shell">
    <section class="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <article class="panel-surface p-6 sm:p-7">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Publicación guiada</p>
        <h2 class="mt-2 section-title">Registrar nueva donación</h2>
        <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Este formulario alimenta el flujo completo del MVP. Al guardar, el lote aparece en la vista de donaciones y queda disponible para ser solicitado desde el módulo de receptores.
        </p>

        <div class="mt-6 space-y-4">
          <div class="rounded-3xl bg-brand-50 p-5">
            <p class="text-sm font-semibold text-brand-800">Qué se simula</p>
            <p class="mt-2 text-sm leading-6 text-brand-900">
              Publicación del lote, prioridad operativa, ubicación y persistencia local para continuar el recorrido sin backend.
            </p>
          </div>
          <div class="rounded-3xl bg-slate-50 p-5">
            <p class="text-sm font-semibold text-slate-700">Campos priorizados para demo</p>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              Comercio, tipo de alimento, categoría, cantidad, vencimiento, ubicación, observaciones y estado inicial.
            </p>
          </div>
        </div>
      </article>

      <DonationForm
        :donor-options="donationStore.donorOptions"
        :donors="donationStore.donors"
        @submit="handleCreateDonation"
      />
    </section>
  </div>
</template>
