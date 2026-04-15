<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DonationCard from '@/components/donors/DonationCard.vue'
import StatCard from '@/components/common/StatCard.vue'
import { useDonationStore } from '@/stores/donationStore'
import { formatDate } from '@/utils/formatters'

const route = useRoute()
const donationStore = useDonationStore()

const sortedDonations = computed(() =>
  [...donationStore.donations].sort((left, right) => new Date(right.publishedAt) - new Date(left.publishedAt))
)

const highlightedId = computed(() => route.query.highlight)

const stats = computed(() => [
  {
    title: 'Disponibles',
    value: donationStore.availableDonations.length,
    hint: 'Lotes listos para solicitud',
    accent: 'brand'
  },
  {
    title: 'Alta prioridad',
    value: donationStore.donations.filter((item) => item.priority === 'alta').length,
    hint: 'Vencimiento cercano o alta necesidad',
    accent: 'amber'
  },
  {
    title: 'Entregadas',
    value: donationStore.donations.filter((item) => item.status === 'delivered').length,
    hint: 'Cierres de ciclo en la red',
    accent: 'ocean'
  }
])
</script>

<template>
  <div class="page-shell">
    <section class="grid gap-4 md:grid-cols-3">
      <StatCard
        v-for="item in stats"
        :key="item.title"
        :title="item.title"
        :value="item.value"
        :hint="item.hint"
        :accent="item.accent"
      />
    </section>

    <section class="panel-surface p-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Red de comercios</p>
          <h2 class="mt-2 section-title">Donaciones publicadas</h2>
        </div>
        <p class="text-sm text-slate-500">
          {{ sortedDonations.length }} registros visibles para operación y seguimiento.
        </p>
      </div>

      <div class="mt-6 grid gap-5 xl:grid-cols-2">
        <DonationCard
          v-for="donation in sortedDonations"
          :key="donation.id"
          :donation="donation"
          :highlight="highlightedId === donation.id"
        >
          <template #footer>
            <span class="text-xs uppercase tracking-[0.18em] text-slate-400">
              {{ formatDate(donation.expirationDate) }}
            </span>
          </template>
        </DonationCard>
      </div>
    </section>
  </div>
</template>
