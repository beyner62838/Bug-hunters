# Roadmap de Implementación - Sprint Planning

## 📅 Visión General

**Duración total:** 3-4 días de desarrollo dedicado  
**Team recomendado:** 1-2 desarrolladores frontend + 1 designer (opcional)  
**Entregable:** Prototipo MVP navegable, deployado en Vercel/Netlify  
**Objetivo:** Demo de 20 minutos sin errores críticos

---

## 🗓️ Plan de Sprints

### SPRINT 0: Setup & Preparación (2-3 horas)

#### Tasks
- [ ] Crear proyecto Vite + Vue 3 + TypeScript
- [ ] Instalar y configurar Vue Router
- [ ] Instalar y configurar Pinia
- [ ] Instalar Tailwind CSS + PostCSS
- [ ] Instalar librerías necesarias (Axios, Leaflet, Chart.js, etc.)
- [ ] Crear estructura de carpetas
- [ ] Git init + primer commit
- [ ] Setup eslint + prettier (opcional)

#### Deliverable
✅ Proyecto base listo para desarrollo  
✅ `npm run dev` funciona sin errores

#### Tiempo estimado
⏱️ 2-3 horas (1 dev)

---

### SPRINT 1: Autenticación & Dashboard Base (4 horas)

#### Tasks
- [ ] Crear `authStore` (Pinia)
- [ ] Crear `LoginView.vue`
- [ ] Crear `RegisterView.vue`
- [ ] Crear `SelectRoleView.vue`
- [ ] Crear `Header.vue` y `Navbar.vue` (componentes comunes)
- [ ] Crear `HomeView.vue` (Hero + CTA)
- [ ] Implementar protección de rutas (guards en Router)
- [ ] Setup LocalStorage para autenticación

#### Deliverable
✅ Sistema autenticación funcional  
✅ 3 roles diferenciados  
✅ Datos persisten en LocalStorage  
✅ Navegación entre vistas

#### Tiempo estimado
⏱️ 4 horas (1 dev)

---

### SPRINT 2: Flujo Donante (5 horas)

#### Tasks
- [ ] Crear `foodStore` (Pinia)
- [ ] Crear `foodData/mock-foods.json` (10-15 items)
- [ ] Crear `DonorDashboardView.vue`
- [ ] Crear componente `ProfileCard.vue`
- [ ] Crear componente `PublishFoodForm.vue`
  - [ ] Validación de formulario
  - [ ] Upload simulado de imágenes
  - [ ] Guardar en store + localStorage
- [ ] Crear componente `DonationHistoryTable.vue`
- [ ] Crear componente `DeliveryStatusWidget.vue`
- [ ] Estilos con Tailwind

#### Deliverable
✅ Donante puede publicar alimentos  
✅ Historial visible  
✅ Datos persisten  
✅ Interfaz responsive

#### Tiempo estimado
⏱️ 5 horas (1-2 devs)

---

### SPRINT 3: Flujo Receptor & Órdenes (5 horas)

#### Tasks
- [ ] Crear `orderStore` (Pinia)
- [ ] Crear `mock-users.json` (usuarios beneficiarios)
- [ ] Crear `RecipientDashboardView.vue`
- [ ] Crear componente `RequestHelpForm.vue`
  - [ ] Validación
  - [ ] Conexión a stores
- [ ] Crear componente `AvailableFoodsGrid.vue`
  - [ ] Filtros por categoría
  - [ ] Filtros por distancia
- [ ] Crear componente `RequestHistoryTable.vue`
- [ ] Crear componente `OrgsNearbyCard.vue`
- [ ] Lógica: Asignación automática de alimentos al receptor

#### Deliverable
✅ Receptor ve alimentos disponibles  
✅ Puede solicitar ayuda  
✅ Sistema asigna automáticamente  
✅ Historial de solicitudes

#### Tiempo estimado
⏱️ 5 horas (1-2 devs)

---

### SPRINT 4: Panel Administrador (4 horas)

#### Tasks
- [ ] Crear `deliveryStore` (Pinia)
- [ ] Crear `AdminDashboardView.vue`
- [ ] Crear componente `TrackingDashboard.vue`
  - [ ] 4 métricas principales
  - [ ] Datos en tiempo real desde stores
- [ ] Crear componente `ReportsPanel.vue`
  - [ ] Integración Chart.js
  - [ ] 4 gráficos funcionando
  - [ ] Datos simulados
- [ ] Crear componente `TraceabilityLog.vue`
  - [ ] Timeline de eventos
  - [ ] Filtros por fecha/usuario
- [ ] Crear componente `ModerationPanel.vue`
  - [ ] Tabla de aprobaciones
  - [ ] Lista de reportes

#### Deliverable
✅ Dashboard administrativo completo  
✅ Métricas actualizadas en tiempo real  
✅ Reportes visuales  
✅ Trazabilidad completa

#### Tiempo estimado
⏱️ 4 horas (1-2 devs)

---

### SPRINT 5: Mapa & Geolocalización (3 horas)

#### Tasks
- [ ] Crear `geoStore` (Pinia)
- [ ] Crear `mock-zones.json` (5 zonas)
- [ ] Crear `MapView.vue`
- [ ] Integrar Leaflet + OpenStreetMap
- [ ] Crear componente `MapViewer.vue`
  - [ ] Cargar capas de zonas
  - [ ] Marcadores de puntos
  - [ ] Pop-ups informativos
- [ ] Crear componente `ZoneFilter.vue`
  - [ ] Checkboxes para capas
  - [ ] Slider de radio
- [ ] Crear componente `DistributionPointsList.vue`
- [ ] Crear componente `LegendPanel.vue`

#### Deliverable
✅ Mapa interactivo funcional  
✅ Múltiples capas  
✅ Filtros activos  
✅ Vista responsive

#### Tiempo estimado
⏱️ 3 horas (1 dev)

---

### SPRINT 6: Módulo de Cursos (3 horas)

#### Tasks
- [ ] Crear `courseStore` (Pinia)
- [ ] Crear `mock-courses.json` (10 cursos)
- [ ] Crear `CoursesListView.vue`
- [ ] Crear componente `CourseSearchBar.vue`
  - [ ] Búsqueda con debounce
- [ ] Crear componente `CategoryFilter.vue`
- [ ] Crear `CourseCard.vue` (Grid)
- [ ] Crear `CourseDetailView.vue`
  - [ ] Tabs: Descripción, Contenido, Instructor
  - [ ] Módulos expandibles
  - [ ] Botón inscribirse/continuar
- [ ] Crear componente `ReviewsSection.vue`
- [ ] Lógica de inscripción en localStorage

#### Deliverable
✅ Catálogo de cursos funcional  
✅ Detalle de cursos con contenido  
✅ Sistema de inscripción  
✅ Progreso del usuario persistente

#### Tiempo estimado
⏱️ 3 horas (1-2 devs)

---

### SPRINT 7: Organizaciones & Alianzas (2 horas)

#### Tasks
- [ ] Crear `orgStore` (Pinia)
- [ ] Crear `mock-organizations.json` (6 orgs)
- [ ] Crear `OrganizationsView.vue`
- [ ] Crear componente `OrgCard.vue` (Grid)
- [ ] Crear sección `PartnershipsSection.vue`
- [ ] Crear sección `VacanciesSection.vue`
  - [ ] Tabla de empleos
  - [ ] Botón "Solicitar"
- [ ] MockUp de OrgDetailView (modal básico)

#### Deliverable
✅ Directorio de organizaciones  
✅ Alianzas visibilizadas  
✅ Empleos listados  
✅ Contacto disponible

#### Tiempo estimado
⏱️ 2 horas (1 dev)

---

### SPRINT 8: Componentes Comunes & Reutilizables (2 horas)

#### Tasks
- [ ] Crear `Footer.vue`
- [ ] Crear componentes de form reutilizables
  - [ ] FormInput.vue
  - [ ] FormSelect.vue
  - [ ] FormTextarea.vue
- [ ] Crear componentes de UI
  - [ ] Modal.vue (genérico)
  - [ ] Toast.vue (notificaciones)
  - [ ] Loader.vue
  - [ ] Badge.vue (para categorías)
- [ ] Crear utilidades de estilos (Tailwind constants)

#### Deliverable
✅ Biblioteca de componentes  
✅ Consistencia visual  
✅ Reutilización facilitada

#### Tiempo estimado
⏱️ 2 horas (1 dev)

---

### SPRINT 9: Responsividad & Pulido Visual (2 horas)

#### Tasks
- [ ] Auditoría responsividad (mobile 320px - desktop 1920px)
  - [ ] Revisar todas las vistas principales
  - [ ] Ajustar breakpoints
- [ ] Mejorar accesibilidad
  - [ ] Labels en formularios
  - [ ] Contraste de colores
  - [ ] Navegación por teclado
- [ ] Optimizar imágenes/placeholders
- [ ] Revisar y aplicar consistent color scheme
- [ ] Testing de flujos completos

#### Deliverable
✅ Aplicación responsiva  
✅ Accesible  
✅ Pulida visualmente  
✅ Sin warnings críticos

#### Tiempo estimado
⏱️ 2 horas (1-2 devs)

---

### SPRINT 10: Testing & QA (1.5 horas)

#### Tasks
- [ ] Test manual de Flujo A (Donación → Entrega)
  - [ ] Paso a paso validado
  - [ ] Sin errores JS
  - [ ] Datos persisten
- [ ] Test manual de Flujo B (Capacitación)
- [ ] Test manual de Flujo C (Admin)
- [ ] Test en diferentes navegadores
- [ ] Test responsividad en mobile real
- [ ] Validación de performance (Lighthouse)
  - [ ] FCP < 1.5s
  - [ ] LCP < 3s
  - [ ] CLS < 0.1
- [ ] Fix bugs encontrados

#### Deliverable
✅ Todos los flujos sin errores  
✅ Performance aceptable  
✅ Responsividad validada  
✅ Lista para presentar

#### Tiempo estimado
⏱️ 1.5 horas (1 QA dev)

---

### SPRINT 11: Deploy & Documentación Final (1 hora)

#### Tasks
- [ ] Build para producción: `npm run build`
- [ ] Upload a Vercel o Netlify
- [ ] Validar deploy sin errores
- [ ] Crear `.env.example`
- [ ] Actualizar `README.md` con instrucciones
- [ ] Documentar credenciales de demo
  - [ ] Email donante: donor@example.com
  - [ ] Email receptor: recipient@example.com
  - [ ] Email admin: admin@example.com
- [ ] Grabar demostración en video (opcional)

#### Deliverable
✅ App en vivo y accesible  
✅ Documentación lista  
✅ Credenciales resguardadas  
✅ URL compartible

#### Tiempo estimado
⏱️ 1 hora (1 dev)

---

## ⏲️ Resumen de Tiempos

| Sprint | Tarea | Horas | Dev(s) |
|--------|-------|-------|--------|
| 0 | Setup | 2.5 | 1 |
| 1 | Auth | 4 | 1 |
| 2 | Donante | 5 | 1-2 |
| 3 | Receptor | 5 | 1-2 |
| 4 | Admin | 4 | 1-2 |
| 5 | Mapa | 3 | 1 |
| 6 | Cursos | 3 | 1-2 |
| 7 | Orgs | 2 | 1 |
| 8 | Componentes | 2 | 1 |
| 9 | Responsividad | 2 | 1-2 |
| 10 | Testing | 1.5 | 1 |
| 11 | Deploy | 1 | 1 |
| **TOTAL** | | **35 horas** | **1-2 devs** |

### 📊 Escenarios de Tiempo

**Escenario 1: 1 Developer Dedicado**
- 35 horas de trabajo = 5 días (8 horas/día)
- **Timeline: Miércoles - Domingo**

**Escenario 2: 2 Developers Paralelos**
- Pueden splitear sprints
- Sprint 2-3-4 en paralelo
- Sprint 5-6-7 en paralelo
- **Timeline: Miércoles - Viernes**

**Escenario 3: 1 Dev Dedicado + 1 Designer**
- Dev hace sprints técnicos
- Designer hace UI/UX en paralelo
- Mejor pulido visual
- **Timeline: Miércoles - Viernes (más pulido)**

---

## 🎯 Prioridades por Sprint

### 🔴 CRÍTICOS (DEBEN estar 100%)
- Sprint 0: Setup
- Sprint 1: Auth (roles + guards)
- Sprint 2: Flujo Donante completo
- Sprint 3: Flujo Receptor + órdenes
- Sprint 4: Admin Dashboard

### 🟠 ALTOS (DEBEN estar 80%+)
- Sprint 5: Mapa (al menos funcional, puede faltar styling)
- Sprint 6: Cursos (al menos grid + detail básico)
- Sprint 9: Responsividad (especialmente mobile)

### 🟡 MEDIOS (PUEDEN estar 60%+)
- Sprint 7: Orgs (funcional, diseño secundario)
- Sprint 8: Componentes (reutilización)
- Sprint 10: Testing (lo básico)

### 🟢 BAJOS (NICE-TO-HAVE)
- Video de demo
- Análisis detallado de performance
- Temas alternativos

---

## 📋 Dependency Graph

```
Sprint 0 (Setup)
    ↓
Sprint 1 (Auth)
    ↓
├─→ Sprint 2 (Donante)
├─→ Sprint 3 (Receptor)
├─→ Sprint 4 (Admin)
├─→ Sprint 5 (Mapa)
├─→ Sprint 6 (Cursos)
└─→ Sprint 7 (Orgs)
    ↓
Sprint 8 (Componentes - puede solaparse)
    ↓
Sprint 9 (Responsividad - puede solaparse)
    ↓
Sprint 10 (Testing)
    ↓
Sprint 11 (Deploy)
```

**KEY:** Sprints 2-7 pueden ejecutarse parcialmente en paralelo después de Sprint 1

---

## 🚨 Riesgos & Mitigaciones

### Riesgo 1: Alcance demasiado ambicioso
**Mitigación:** Mantener Sprints 2-4 como bloqueadores. Si se atrasan, cancelar Sprints 7 (Orgs) inmediatamente.

### Riesgo 2: Problemas de integración Tailwind + Vue
**Mitigación:** Validar en Sprint 0. Stack probado × 1000.

### Riesgo 3: Performance de mapa en LocalStorage
**Mitigación:** Mock de datos pequeño (5-8 zonas). Si lenta, simplificar.

### Riesgo 4: No hay tiempo para testing
**Mitigación:** Si en "fin de Sprint 9" hay atraso, skip Sprint 10, pero validar manualmente flujos A/B/C.

### Riesgo 5: Diseño visual deficiente
**Mitigación:** Usar Tailwind defaults. No hacer CSS custom hasta Sprint 9.

---

## ✅ Daily Standup Template

```
🎯 Qué hiciste hoy:
- [Task x] completada 100%
- [Task y] en progreso 70%

🚧 Qué harás mañana:
- [Task y] terminar
- [Task z] comenzar

🚨 Bloqueadores:
- Ninguno | [Describir]

📊 Progreso Sprint:
- X horas gastadas / Y horas estimadas
```

---

## 🏁 Definición de "Listo para Demo"

✅ **Sprint 2-4 Completados al 100%**
- Flujo A funciona end-to-end
- Sin errores JS críticos
- Datos persisten

✅ **Sprint 9 Completado al 90%**
- Responsive en mobile
- Sin layout breaks

✅ **Sprint 10 Sampling**
- Flujos A, B, C validados manualmente
- Screenshots listos

✅ **Sprint 11**
- URL publica disponible
- No requiere setup local
- Credenciales de demo documentadas

---

## 📸 Pre-Demo Checklist (24hs antes)

- [ ] Limpia LocalStorage en navegador
- [ ] App carga sin errores en console
- [ ] Login como donor@example.com → OK
- [ ] Publica alimento → OK
- [ ] Logout
- [ ] Login como recipient@example.com → OK
- [ ] Ve alimento publicado → OK
- [ ] Solicita → OK
- [ ] Logout
- [ ] Login como admin@example.com → OK
- [ ] Métricas actualizadas → OK
- [ ] Mapa carga → OK
- [ ] Logout
- [ ] Home se ve bien → OK
- [ ] Cursos cargan → OK
- [ ] Responsividad en mobile (simular en DevTools) → OK
- [ ] URL es pública y accesible → OK
- [ ] Recarga página → datos persisten → OK

**Si todo OK → ✅ Listo para demo**

---

## 🎉 Éxito Esperado

Con este plan:
- ✅ 35 horas máximo de desarrollo
- ✅ 2-3 devs pueden completarlo en 2-3 días
- ✅ Demo de 20 minutos sin hilos sueltos
- ✅ Validación completa del concepto
- ✅ Arquitectura escalable a backend (fase 2)

**Hackathon ganada. Siguiente fase: Backend + Base de Datos.** 🚀

