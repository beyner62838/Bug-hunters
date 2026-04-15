import { defineStore } from 'pinia'
import donorsSeed from '@/data/donors.json'
import donationsSeed from '@/data/donations.json'
import receiversSeed from '@/data/receivers.json'
import { cloneData, createId, loadState, saveState } from '@/utils/storage'

const STORAGE_KEY = 'redalimenta-donations'

export const useDonationStore = defineStore('donationStore', {
  state: () => ({
    donors: cloneData(donorsSeed),
    receivers: cloneData(receiversSeed),
    donations: loadState(STORAGE_KEY, donationsSeed)
  }),
  getters: {
    donorOptions: (state) =>
      state.donors.map((donor) => ({
        label: donor.name,
        value: donor.id
      })),
    receiverOptions: (state) =>
      state.receivers.map((receiver) => ({
        label: receiver.name,
        value: receiver.id
      })),
    categories: (state) => {
      const values = new Set(state.donations.map((donation) => donation.category))
      return [...values]
    },
    availableDonations: (state) =>
      state.donations.filter((donation) => donation.status === 'available'),
    activeDonations: (state) =>
      state.donations.filter((donation) => donation.status !== 'delivered'),
    totalRecoveredUnits: (state) =>
      state.donations.reduce((total, donation) => total + Number(donation.quantity || 0), 0)
  },
  actions: {
    persistDonations() {
      saveState(STORAGE_KEY, this.donations)
    },
    getDonationById(id) {
      return this.donations.find((donation) => donation.id === id)
    },
    getDonorById(id) {
      return this.donors.find((donor) => donor.id === id)
    },
    getReceiverById(id) {
      return this.receivers.find((receiver) => receiver.id === id)
    },
    createDonation(payload) {
      const donor = this.getDonorById(payload.donorId)

      const newDonation = {
        id: createId('donation'),
        donorId: payload.donorId,
        donorName: donor?.name ?? payload.commerce,
        foodType: payload.foodType,
        category: payload.category,
        quantity: Number(payload.quantity),
        unit: payload.unit,
        expirationDate: payload.expirationDate,
        location: payload.location || donor?.address || 'Ubicación pendiente',
        priority: payload.priority,
        status: payload.status,
        observations: payload.observations,
        publishedAt: new Date().toISOString()
      }

      this.donations = [newDonation, ...this.donations]
      this.persistDonations()
      return newDonation
    },
    updateDonationStatus(id, status) {
      this.donations = this.donations.map((donation) =>
        donation.id === id ? { ...donation, status } : donation
      )
      this.persistDonations()
    }
  }
})
