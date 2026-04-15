import { createRouter, createWebHashHistory } from 'vue-router'
import pinia from '@/stores'
import { useAuthStore } from '@/stores/authStore'
import MainLayout from '@/layouts/MainLayout.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import DonorsView from '@/views/DonorsView.vue'
import DonationCreateView from '@/views/DonationCreateView.vue'
import ReceiversView from '@/views/ReceiversView.vue'
import RequestsView from '@/views/RequestsView.vue'
import MapView from '@/views/MapView.vue'
import TraceabilityView from '@/views/TraceabilityView.vue'
import TrainingView from '@/views/TrainingView.vue'
import CompaniesView from '@/views/CompaniesView.vue'
import AdminView from '@/views/AdminView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Acceso demo',
      public: true,
      guestOnly: true
    }
  },
  {
    path: '/',
    component: MainLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: {
          title: 'Inicio',
          roles: ['donor', 'beneficiary']
        }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: {
          title: 'Dashboard',
          roles: ['donor', 'beneficiary']
        }
      },
      {
        path: 'donations',
        name: 'donors',
        component: DonorsView,
        meta: {
          title: 'Donaciones',
          roles: ['donor']
        }
      },
      {
        path: 'donations/new',
        name: 'donation-create',
        component: DonationCreateView,
        meta: {
          title: 'Nueva donación',
          roles: ['donor']
        }
      },
      {
        path: 'receivers',
        name: 'receivers',
        component: ReceiversView,
        meta: {
          title: 'Receptores',
          roles: ['donor']
        }
      },
      {
        path: 'requests',
        name: 'requests',
        component: RequestsView,
        meta: {
          title: 'Solicitudes',
          roles: ['donor']
        }
      },
      {
        path: 'map',
        name: 'map',
        component: MapView,
        meta: {
          title: 'Mapa operacional',
          roles: ['donor']
        }
      },
      {
        path: 'traceability',
        name: 'traceability',
        component: TraceabilityView,
        meta: {
          title: 'Trazabilidad',
          roles: ['donor']
        }
      },
      {
        path: 'training',
        name: 'training',
        component: TrainingView,
        meta: {
          title: 'Formación',
          roles: ['donor', 'beneficiary']
        }
      },
      {
        path: 'companies',
        name: 'companies',
        component: CompaniesView,
        meta: {
          title: 'Empresas aliadas',
          roles: ['donor', 'beneficiary']
        }
      },
      {
        path: 'admin',
        name: 'admin',
        component: AdminView,
        meta: {
          title: 'Administración',
          roles: ['donor']
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore(pinia)

  if (to.meta?.guestOnly && authStore.isAuthenticated) {
    return authStore.getDefaultRoute()
  }

  if (to.meta?.public) {
    return true
  }

  if (to.matched.some((record) => record.meta?.requiresAuth) && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  const allowedRoles = to.meta?.roles ?? []
  if (allowedRoles.length && !authStore.canAccess(allowedRoles)) {
    return authStore.getDefaultRoute()
  }

  return true
})

router.afterEach((to) => {
  document.title = to.meta?.title ? `${to.meta.title} | RedAlimenta` : 'RedAlimenta'
})

export default router
