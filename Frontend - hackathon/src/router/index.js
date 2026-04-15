import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
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
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: {
          title: 'Inicio'
        }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: {
          title: 'Dashboard'
        }
      },
      {
        path: 'donations',
        name: 'donors',
        component: DonorsView,
        meta: {
          title: 'Donaciones'
        }
      },
      {
        path: 'donations/new',
        name: 'donation-create',
        component: DonationCreateView,
        meta: {
          title: 'Nueva donación'
        }
      },
      {
        path: 'receivers',
        name: 'receivers',
        component: ReceiversView,
        meta: {
          title: 'Receptores'
        }
      },
      {
        path: 'requests',
        name: 'requests',
        component: RequestsView,
        meta: {
          title: 'Solicitudes'
        }
      },
      {
        path: 'map',
        name: 'map',
        component: MapView,
        meta: {
          title: 'Mapa operacional'
        }
      },
      {
        path: 'traceability',
        name: 'traceability',
        component: TraceabilityView,
        meta: {
          title: 'Trazabilidad'
        }
      },
      {
        path: 'training',
        name: 'training',
        component: TrainingView,
        meta: {
          title: 'Formación'
        }
      },
      {
        path: 'companies',
        name: 'companies',
        component: CompaniesView,
        meta: {
          title: 'Empresas aliadas'
        }
      },
      {
        path: 'admin',
        name: 'admin',
        component: AdminView,
        meta: {
          title: 'Administración'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
