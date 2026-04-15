import { defineStore } from 'pinia'
import requestsSeed from '@/data/requests.json'
import traceabilitySeed from '@/data/traceability.json'
import { useDonationStore } from '@/stores/donationStore'
import { cloneData, createId, loadState, saveState } from '@/utils/storage'

const STORAGE_KEY = 'redalimenta-requests'
const flow = ['pending', 'under_review', 'assigned', 'in_route', 'delivered']

export const useRequestStore = defineStore('requestStore', {
  state: () => ({
    requests: loadState(STORAGE_KEY, requestsSeed),
    traceabilitySeed: cloneData(traceabilitySeed)
  }),
  getters: {
    enrichedRequests(state) {
      const donationStore = useDonationStore()

      return state.requests
        .map((request) => {
          const donation = donationStore.getDonationById(request.donationId)
          const receiver = donationStore.getReceiverById(request.receiverId)

          return {
            ...request,
            donationLabel: donation?.foodType ?? 'Donación referencial',
            donorName: donation?.donorName ?? 'Aliado histórico',
            receiverNeighborhood: receiver?.neighborhood ?? 'Sin zona'
          }
        })
        .sort((left, right) => new Date(right.requestedAt) - new Date(left.requestedAt))
    },
    requestsByStatus() {
      return flow.map((status) => ({
        status,
        total: this.requests.filter((request) => request.status === status).length
      }))
    },
    traceabilityRows(state) {
      const donationStore = useDonationStore()

      const dynamicRows = state.requests.map((request) => {
        const donation = donationStore.getDonationById(request.donationId)
        const receiver = donationStore.getReceiverById(request.receiverId)

        return {
          id: `trace-${request.id}`,
          donor: donation?.donorName ?? 'Aliado registrado',
          receiver: receiver?.name ?? request.receiverName,
          donation: donation?.foodType ?? 'Donación activa',
          publishedAt: donation?.publishedAt ?? request.requestedAt,
          assignedAt: request.assignedAt,
          deliveredAt: request.deliveredAt,
          status: request.status,
          observations: request.notes || donation?.observations || 'Seguimiento operativo.'
        }
      })

      return [...dynamicRows, ...state.traceabilitySeed].sort(
        (left, right) => new Date(right.publishedAt) - new Date(left.publishedAt)
      )
    }
  },
  actions: {
    persistRequests() {
      saveState(STORAGE_KEY, this.requests)
    },
    hasRequestForDonation(donationId) {
      return this.requests.some(
        (request) => request.donationId === donationId && request.status !== 'delivered'
      )
    },
    createRequest({ donationId, receiverId }) {
      const donationStore = useDonationStore()
      const donation = donationStore.getDonationById(donationId)
      const receiver = donationStore.getReceiverById(receiverId)

      if (!donation || !receiver || this.hasRequestForDonation(donationId)) {
        return null
      }

      const request = {
        id: createId('request'),
        donationId,
        receiverId,
        receiverName: receiver.name,
        quantity: donation.quantity,
        priority: donation.priority,
        status: 'pending',
        requestedAt: new Date().toISOString(),
        assignedAt: null,
        deliveredAt: null,
        notes: `Solicitud iniciada por ${receiver.name}.`
      }

      this.requests = [request, ...this.requests]
      donationStore.updateDonationStatus(donationId, 'requested')
      this.persistRequests()
      return request
    },
    updateRequestStatus(id, status) {
      const donationStore = useDonationStore()

      this.requests = this.requests.map((request) => {
        if (request.id !== id) {
          return request
        }

        const nextRequest = { ...request, status }

        if (status === 'assigned' && !nextRequest.assignedAt) {
          nextRequest.assignedAt = new Date().toISOString()
        }

        if (status === 'delivered' && !nextRequest.deliveredAt) {
          nextRequest.deliveredAt = new Date().toISOString()
        }

        return nextRequest
      })

      const target = this.requests.find((request) => request.id === id)
      if (target) {
        const donationStatusMap = {
          pending: 'requested',
          under_review: 'requested',
          assigned: 'assigned',
          in_route: 'in_route',
          delivered: 'delivered'
        }

        donationStore.updateDonationStatus(target.donationId, donationStatusMap[status])
      }

      this.persistRequests()
    },
    advanceRequest(id) {
      const current = this.requests.find((request) => request.id === id)
      if (!current) {
        return
      }

      const currentIndex = flow.indexOf(current.status)
      const nextStatus = flow[Math.min(currentIndex + 1, flow.length - 1)]

      if (nextStatus !== current.status) {
        this.updateRequestStatus(id, nextStatus)
      }
    }
  }
})
