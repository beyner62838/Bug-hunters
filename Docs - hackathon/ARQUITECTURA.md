# Arquitectura del Sistema - Plataforma de Distribución de Alimentos y Oportunidades

## 1. Visión General

**Nombre del Proyecto:** Plataforma de Distribución de Alimentos y Oportunidades  
**Tipo de Solución:** Prototipo Funcional de Alta Fidelidad (MVP Visual Navegable)  
**Ámbito:** Frontend - Prototipo Interactivo con Datos Simulados  
**Justificación de Propuesta:** Se desarrolló un prototipo funcional centrado en la experiencia del usuario, validación del flujo operativo y visualización del modelo de solución. Para la hackathon se priorizó el MVP navegable, dejando la integración backend como siguiente fase de escalamiento.

---

## 2. Architectura General del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN (Vue 3)                 │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Módulo      │  │  Módulo      │  │  Módulo      │          │
│  │  Donantes    │  │  Solicitudes │  │  Mapa        │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Módulo      │  │  Módulo      │  │  Panel Admin │          │
│  │  Cursos      │  │  Beneficiarios│  │  (Trazabil) │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└──────────────────────────────┬──────────────────────────────────┘
                                 │
                    Vue Router (Enrutamiento)
                                 │
┌────────────────────────────────┴──────────────────────────────┐
│                 CAPA DE ESTADO (Pinia Store)                  │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐        │
│  │ Store Users  │  │ Store Foods  │  │ Store Orders│        │
│  │ (Donantes,   │  │ (Alimentos   │  │ (Solicitudes│        │
│  │  Beneficiarios│  │  disponibles)│  │  de ayuda)  │        │
│  └──────────────┘  └──────────────┘  └─────────────┘        │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐        │
│  │ Store Courses│  │ Store Deliveries│ Store GeoData│       │
│  └──────────────┘  └──────────────┘  └─────────────┘        │
└────────────────────────────────┬───────────────────────────────┘
                                 │
┌────────────────────────────────┴──────────────────────────────┐
│              CAPA DE DATOS SIMULADOS (Mocks)                  │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐        │
│  │ JSON Local   │  │ LocalStorage │  │ Service     │        │
│  │ (Datos       │  │ (Persistencia)│  │ Layer       │        │
│  │  iniciales)  │  │              │  │ (Simulación)│        │
│  └──────────────┘  └──────────────┘  └─────────────┘        │
└───────────────────────────────────────────────────────────────┘
```

---

## 3. Componentes Principales

### 3.1 Capa de Presentación (Vue 3 Components)

| Componente | Responsabilidad | Estado |
|----------|-----------------|--------|
| `HomeView` | Página de inicio, hero, resumen de sistema | Pública |
| `DonorDashboard` | Panel de donantes, publicar alimentos | Autenticado |
| `RecipientDashboard` | Panel de receptores, solicitar ayuda | Autenticado |
| `MapView` | Visualización de zonas, puntos de distribución | Público |
| `CoursesModule` | Catálogo y registro en cursos | Público |
| `OrgPanel` | Panel de organizaciones, alianzas | Autenticado |
| `AdminPanel` | Trazabilidad, reportes, moderación | Admin |
| `AuthForms` | Registro y login (simulados) | Público |
| `Common` | Header, Footer, NavBar, Cards | Global |

### 3.2 Capa de Estado (Pinia Stores)

```javascript
// Estructura de Stores recomendada

1. authStore
   - currentUser
   - isAuthenticated
   - userRole (donor, recipient, admin, org)
   - loginUser()
   - logoutUser()
   - registerUser()

2. foodStore
   - availableFoods (array de alimentos)
   - foodCategories
   - publishFood()
   - updateFood()
   - deletFood()

3. orderStore
   - orders (solicitudes activas)
   - orderHistory
   - createOrder()
   - confirmDelivery()

4. deliveryStore
   - deliveries (entregas en proceso)
   - trackingData
   - assignDelivery()
   - updateStatus()

5. courseStore
   - courses (catálogo)
   - enrollments (inscripciones del usuario)
   - searchCourses()
   - enrollCourse()

6. geoStore
   - zones (zonas vulnerable)
   - distributionPoints
   - mapData

7. orgStore
   - organizations
   - partnerships
   - vacancies
```

### 3.3 Capa de Datos Simulados

- **Archivos JSON**: `src/data/mock-foods.json`, `src/data/mock-users.json`, `src/data/mock-courses.json`
- **LocalStorage**: Persistencia de registros de usuario, alimentos publicados, solicitudes
- **Service Layer**: `src/services/foodService.ts`, `src/services/orderService.ts`, etc.

---

## 4. Flujo de Datos

```
Usuario Interactúa
       ↓
     Vista (Component)
       ↓
Dispone Acción (Action)
       ↓
Pinia Store procesa
       ↓
Actualiza State
       ↓
Component se re-renderiza
       ↓
LocalStorage persiste (si aplica)
```

---

## 5. Módulos Principales

### 5.1 Módulo de Donantes
- Perfil de donante
- Publicar alimentos (categoría, cantidad, fecha)
- Historial de donaciones
- Ver entregas asignadas
- Calificaciones/Impacto

### 5.2 Módulo de Solicitudes
- Crear solicitud de ayuda
- Filtrar por categoría, zona, urgencia
- Estado de solicitud
- Historial de recepciones

### 5.3 Módulo de Mapa
- Visualización de zonas vulnerables
- Puntos de recolección
- Puntos de distribución
- Filtros por tipo de necesidad

### 5.4 Módulo de Beneficiarios/Organizaciones
- Directorio de organizaciones
- Ver programas disponibles
- Contacto y ubicación

### 5.5 Módulo de Cursos y Formación
- Catálogo de cursos
- Áreas: emprendimiento, capacitación laboral, habilidades digitales
- Inscripción y seguimiento
- Certificados simulados

### 5.6 Empresas Aliadas
- Listado de alianzas
- Oportunidades laborales
- Contacto directo

### 5.7 Panel Administrador
- Trazabilidad de entregas
- Reportes de distribución
- Moderación de contenido
- Métricas y estadísticas

---

## 6. Tecnologías Clave

| Capa | Tecnología | Propósito |
|-----|-----------|---------|
| Framework | Vue 3 (Composition API) | Desarrollo UI interactivo |
| Build Tool | Vite | Compilación rápida |
| Enrutamiento | Vue Router | Navegación entre módulos |
| Estado | Pinia | Manejo centralizado de estado |
| Estilos | Tailwind CSS | Diseño moderno y consistente |
| Maps | Leaflet + OpenStreetMap | Geolocalización visual |
| Persistencia | LocalStorage + JSON | Datos simulados |
| Lenguaje | TypeScript | Tipado estático |

---

## 7. Estructura de Carpetas Recomendada

```
src/
├── components/
│   ├── common/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── Navbar.vue
│   ├── donor/
│   │   ├── PublishFoodForm.vue
│   │   ├── DonationHistory.vue
│   ├── recipient/
│   │   ├── RequestForm.vue
│   │   ├── AvailableFoods.vue
│   ├── map/
│   │   ├── MapViewer.vue
│   │   ├── ZoneFilter.vue
│   ├── courses/
│   │   ├── CourseCard.vue
│   │   ├── CourseDetail.vue
│   ├── admin/
│   │   ├── TrackingDashboard.vue
│   │   ├── ReportsPanel.vue
├── views/
│   ├── HomeView.vue
│   ├── DonorDashboardView.vue
│   ├── RecipientDashboardView.vue
│   ├── MapView.vue
│   ├── CoursesView.vue
│   ├── AdminView.vue
│   ├── LoginView.vue
├── stores/
│   ├── authStore.ts
│   ├── foodStore.ts
│   ├── orderStore.ts
│   ├── deliveryStore.ts
│   ├── courseStore.ts
│   ├── geoStore.ts
│   ├── orgStore.ts
├── services/
│   ├── foodService.ts
│   ├── orderService.ts
│   ├── deliveryService.ts
│   ├── authService.ts
├── data/
│   ├── mock-foods.json
│   ├── mock-users.json
│   ├── mock-courses.json
│   ├── mock-zones.json
├── router/
│   ├── index.ts
├── App.vue
├── main.ts

```

---

## 8. Criterios de Éxito de la Demo

✅ **Funcional:**
- Navegación fluida entre todos los módulos
- Transiciones suave entre estados
- Datos persisten en LocalStorage

✅ **Visual:**
- Diseño consistente y profesional
- Responsive design (mobile-first)
- Identidad visual clara

✅ **Demostrativo:**
- Se puede simular un flujo completo: donación → asignación → entrega → educación
- Mapa interactivo con datos visuales
- Panel admin muestra trazabilidad en tiempo real

---

## 9. Fases de Implementación

| Fase | Duración | Entregables |
|-----|---------|------------|
| **1. Setup & Base** | 1-2 días | Proyecto Vue + Router + Pinia + Tailwind |
| **2. Módulo Core** | 1-2 días | Donantes + Solicitudes + Datos mock |
| **3. Módulo Visual** | 1 día | Mapa + Cursos |
| **4. Admin & Trazabilidad** | 1 día | Panel admin + Reportes |
| **5. Pulido & Deploy** | 0.5-1 día | Responsive, errores, deploy en Vercel/Netlify |

---

## 10. Notas Importantes

- **Sin Backend:** Todos los datos son simulados con JSON local y LocalStorage
- **Autenticación Simulada:** No implica validación real, solo sesión en LocalStorage
- **Escalabilidad:** Arquitectura preparada para integración backend en fase 2
- **Enfoque:** UX/UI y validación del concepto sobre completitud técnica
