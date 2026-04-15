<script setup>
import { computed } from 'vue'
import DistributionMap from '@/components/maps/DistributionMap.vue'
import { vulnerableZones } from '@/data/mapData'
import { useDonationStore } from '@/stores/donationStore'
import { useRequestStore } from '@/stores/requestStore'

const donationStore = useDonationStore()
const requestStore = useRequestStore()

const mapRequests = computed(() =>
  requestStore.enrichedRequests.map((request) => ({
    ...request,
    donation: donationStore.getDonationById(request.donationId)
  }))
)
</script>

<template>
  <div class="page-shell">
    <section class="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <DistributionMap
        :donors="donationStore.donors"
        :receivers="donationStore.receivers"
        :requests="mapRequests"
        :zones="vulnerableZones"
      />

      <article class="panel-surface p-6">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Mapa operativo</p>
        <h2 class="mt-2 section-title">Cobertura y rutas simuladas</h2>
        <p class="mt-4 text-base leading-7 text-slate-600">
          Visualiza donantes, receptores, zonas vulnerables y recorridos activos. Cada marcador muestra detalles al hacer clic.
        </p>

        <div class="mt-6 space-y-4">
          <div class="rounded-3xl bg-brand-50 p-5">
            <p class="text-sm font-semibold text-brand-800">Leyenda</p>
            <div class="mt-3 space-y-2 text-sm text-brand-900">
              <p><span class="font-semibold">D</span> Donantes</p>
              <p><span class="font-semibold">R</span> Receptores</p>
              <p>Círculos azules: zonas prioritarias</p>
            </div>
          </div>

          <div class="rounded-3xl bg-slate-50 p-5">
            <p class="text-sm font-semibold text-slate-700">Rutas activas</p>
            <div class="mt-4 space-y-3">
              <div
                v-for="request in mapRequests.filter((item) => ['assigned', 'in_route', 'delivered'].includes(item.status))"
                :key="request.id"
                class="rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <p class="font-semibold text-slate-950">{{ request.donationLabel }}</p>
                <p class="mt-1 text-sm text-slate-600">{{ request.donorName }} → {{ request.receiverName }}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>
