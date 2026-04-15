import { defineStore } from 'pinia'
import usersSeed from '@/data/users.json'
import { cloneData, loadState, saveState } from '@/utils/storage'

const STORAGE_KEY = 'redalimenta-auth'

function sanitizeUser(user) {
  if (!user) {
    return null
  }

  const { password, ...safeUser } = user
  return safeUser
}

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    users: cloneData(usersSeed),
    currentUser: loadState(STORAGE_KEY, null),
    lastError: ''
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.currentUser),
    role: (state) => state.currentUser?.role ?? 'guest',
    roleLabel() {
      return this.role === 'donor' ? 'Donante' : this.role === 'beneficiary' ? 'Formación' : 'Invitado'
    }
  },
  actions: {
    persistUser() {
      saveState(STORAGE_KEY, this.currentUser)
    },
    login(credentials) {
      const matchedUser = this.users.find(
        (user) =>
          user.email.toLowerCase() === credentials.email.trim().toLowerCase() &&
          user.password === credentials.password
      )

      if (!matchedUser) {
        this.lastError = 'Correo o contraseña inválidos para el acceso demo.'
        return false
      }

      this.currentUser = sanitizeUser(matchedUser)
      this.lastError = ''
      this.persistUser()
      return true
    },
    loginAs(role) {
      const matchedUser = this.users.find((user) => user.role === role)
      if (!matchedUser) {
        return false
      }

      this.currentUser = sanitizeUser(matchedUser)
      this.lastError = ''
      this.persistUser()
      return true
    },
    logout() {
      this.currentUser = null
      this.lastError = ''
      this.persistUser()
    },
    canAccess(allowedRoles = []) {
      if (!allowedRoles.length) {
        return true
      }

      return allowedRoles.includes(this.role)
    },
    getDefaultRoute() {
      return this.role === 'beneficiary' ? { name: 'training' } : { name: 'dashboard' }
    }
  }
})
