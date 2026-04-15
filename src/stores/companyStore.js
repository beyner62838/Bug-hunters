import { defineStore } from 'pinia'
import companiesSeed from '@/data/companies.json'
import { cloneData, loadState, saveState } from '@/utils/storage'

const STORAGE_KEY = 'redalimenta-company-applications'

export const useCompanyStore = defineStore('companyStore', {
  state: () => ({
    companies: cloneData(companiesSeed),
    applications: loadState(STORAGE_KEY, [])
  }),
  getters: {
    totalVacancies: (state) =>
      state.companies.reduce((total, company) => total + company.vacancies.length, 0),
    appliedVacancyIds: (state) => state.applications.map((item) => item.vacancyId)
  },
  actions: {
    persistApplications() {
      saveState(STORAGE_KEY, this.applications)
    },
    hasApplied(vacancyId) {
      return this.applications.some((item) => item.vacancyId === vacancyId)
    },
    applyToVacancy(companyId, vacancyId) {
      if (this.hasApplied(vacancyId)) {
        return false
      }

      this.applications = [
        {
          companyId,
          vacancyId,
          appliedAt: new Date().toISOString()
        },
        ...this.applications
      ]
      this.persistApplications()
      return true
    }
  }
})
