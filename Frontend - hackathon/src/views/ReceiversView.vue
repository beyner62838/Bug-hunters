<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import DonationCard from '@/components/donors/DonationCard.vue'
import { useDonationStore } from '@/stores/donationStore'
import { useRequestStore } from '@/stores/requestStore'
import { distanceInKm, formatDistance } from '@/utils/geo'

const donationStore = useDonationStore()
const requestStore = useRequestStore()

const selectedReceiverId = ref(donationStore.receivers[0]?.id ?? '')
const selectedCategory = ref('all')
const selectedPriority = ref('all')
const selectedDistance = ref('all')
const feedback = ref('')

const receiverOptions = computed(() => [
  { label: 'Selecciona organización', value: '' },
  ...donationStore.receiverOptions
])

const categoryOptions = computed(() => [
  { label: 'Todas las categorías', value: 'all' },
  ...donationStore.categories.map((category) => ({ label: category, value: category }))
])

const priorityOptions = [
  { label: 'Todas las prioridades', value: 'all' },
  { label: 'Alta', value: 'alta' },
  { label: 'Media', value: 'media' },
  { label: 'Baja', value: 'baja' }
]

const distanceOptions = [
  { label: 'Sin filtro de cercanía', value: 'all' },
  { label: 'Hasta 2 km', value: '2' },
  { label: 'Hasta 5 km', value: '5' },
  { label: 'Hasta 8 km', value: '8' }
]

const activeReceiver = computed(() =>
  donationStore.getReceiverById(selectedReceiverId.value) ?? donationStore.receivers[0]
)

const availableDonations = computed(() =>
  donationStore.donations
    .filter((donation) => donation.status === 'available')
    .map((donation) => {
      const donor = donationStore.getDonorById(donation.donorId)
      const distance = donor && activeReceiver.value ? distanceInKm(donor, activeReceiver.value) : null

      return {
        ...donation,
        distance
      }
    })
    .filter((donation) =>
      selectedCategory.value === 'all' ? true : donation.category === selectedCategory.value
    )
    .filter((donation) =>
      selectedPriority.value === 'all' ? true : donation.priority === selectedPriority.value
    )
    .filter((donation) =>
      selectedDistance.value === 'all' || donation.distance === null
        ? true
        : donation.distance <= Number(selectedDistance.value)
    )
    .sort((left, right) => (left.distance ?? 999) - (right.distance ?? 999))
)

function requestDonation(donationId) {
  if (!selectedReceiverId.value) {
    feedback.value = 'Selecciona primero una organización receptora.'
    return
  }

  const result = requestStore.createRequest({
    donationId,
    receiverId: selectedReceiverId.value
  })

  feedback.value = result
    ? 'Solicitud registrada correctamente. Ya puedes seguirla en el panel de solicitudes.'
    : 'Esta donación ya tiene una solicitud activa o no está disponible.'
}
</script>

<template>
  <div class="page-shell">
    <section class="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <article class="panel-surface p-6 sm:p-7">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Organización activa</p>
        <h2 class="mt-2 section-title">{{ activeReceiver?.name }}</h2>
        <p class="mt-4 text-base leading-7 text-slate-600">
          Filtra alimentos por categoría, prioridad y cercanía para simular el proceso de solicitud desde la comunidad receptora.
        </p>

        <div class="mt-6 space-y-4">
          <BaseSelect v-model="selectedReceiverId" :options="receiverOptions" label="Organización receptora" />
          <div class="grid gap-4 md:grid-cols-3">
            <BaseSelect v-model="selectedCategory" :options="categoryOptions" label="Categoría" />
            <BaseSelect v-model="selectedPriority" :options="priorityOptions" label="Prioridad" />
            <BaseSelect v-model="selectedDistance" :options="distanceOptions" label="Cercanía" />
          </div>
        </div>

        <div v-if="activeReceiver" class="mt-6 rounded-3xl bg-slate-50 p-5">
          <p class="text-sm font-medium text-slate-500">{{ activeReceiver.type }}</p>
          <p class="mt-1 font-semibold text-slate-950">{{ activeReceiver.address }}</p>
          <p class="mt-2 text-sm text-slate-600">
            Beneficiarios estimados: {{ activeReceiver.beneficiaries }} · Prioridad {{ activeReceiver.priorityLevel }}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="need in activeReceiver.needs"
              :key="need"
              class="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600"
            >
              {{ need }}
            </span>
          </div>
        </div>

        <div v-if="feedback" class="mt-6 rounded-3xl border border-brand-100 bg-brand-50 px-5 py-4 text-sm text-brand-900">
          {{ feedback }}
        </div>

        <RouterLink
          to="/requests"
          class="mt-6 inline-flex items-center rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
        >
          Ir a solicitudes
        </RouterLink>
      </article>

      <article class="space-y-5">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-ocean-700">Alimentos disponibles</p>
            <h2 class="mt-2 section-title">Inventario visible para solicitar</h2>
          </div>
          <p class="text-sm text-slate-500">{{ availableDonations.length }} resultados</p>
        </div>

        <DonationCard
          v-for="donation in availableDonations"
          :key="donation.id"
          :donation="donation"
          :distance-label="donation.distance !== null ? formatDistance(donation.distance) : ''"
        >
          <template #footer>
            <BaseButton size="sm" @click="requestDonation(donation.id)">Solicitar donación</BaseButton>
          </template>
        </DonationCard>
      </article>
    </section>
  </div>
</template>
