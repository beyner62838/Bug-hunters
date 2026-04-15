# Módulos y Pantallas - Especificación Detallada

## 1. Mapeo de Módulos → Vistas → Componentes

```
App/
├── HomeView (Página Pública)
│   ├── Hero Section
│   ├── Resumen del Sistema
│   ├── Call-to-Action (Login/Registro)
│
├── AuthFlow (Público)
│   ├── LoginView
│   ├── RegisterView
│   └── SelectRoleView
│
├── DonorModule (Autenticado - Rol: donor)
│   ├── DonorDashboardView
│   │   ├── ProfileCard
│   │   ├── PublishFoodForm (component)
│   │   ├── DonationHistoryTable
│   │   └── DeliveryStatusWidget
│
├── RecipientModule (Autenticado - Rol: recipient)
│   ├── RecipientDashboardView
│   │   ├── RequestHelpForm (component)
│   │   ├── AvailableFoodsGrid
│   │   ├── RequestHistoryTable
│   │   └── OrgsNearbyCard
│
├── MapModule (Público/Autenticado híbrido)
│   ├── MapView
│   │   ├── MapViewer (component - Leaflet)
│   │   ├── ZoneFilter (component)
│   │   ├── DistributionPointsList
│   │   └── LegendPanel
│
├── CoursesModule (Público)
│   ├── CoursesListView
│   │   ├── CourseSearchBar
│   │   ├── CategoryFilter
│   │   ├── CourseGrid (múltiples CourseCards)
│   │   └── CourseDetailModal
│   │
│   └── CourseDetailView
│       ├── CourseHero
│       ├── CourseInfo
│       ├── EnrollButton
│       └── ReviewsSection
│
├── OrgsModule (Público)
│   └── OrganizationsView
│       ├── OrgSearchBar
│       ├── OrgGrid (múltiples OrgCards)
│       ├── PartnershipsSection
│       └── VacanciesSection
│
└── AdminModule (Autenticado - Rol: admin)
    ├── AdminDashboardView
    │   ├── TrackingDashboard (component)
    │   ├── DeliveryMap (mini-mapa)
    │   ├── MetricsCards
    │   │
    │   ├── ReportsPanel (component)
    │   │   ├── FoodsDistributedChart
    │   │   ├── PeopleHelpedChart
    │   │   ├── CoursesEnrolledChart
    │   │   └── ZoneVulnerabilityChart
    │   │
    │   ├── ModerationPanel (component)
    │   │   ├── PendingApprovalsTable
    │   │   └── ReportedContentList
    │   │
    │   └── TraceabilityLog
    │       └── DetailedEventTimeline
```

---

## 2. Módulo 1: Home & Autenticación

### 2.1 HomeView

**Ruta:** `/`  
**Autenticación:** Pública

**Secciones:**
1. **Hero Banner**
   - Título: "Conectando Donantes, Receptores y Oportunidades"
   - Subtítulo: "Una plataforma para redistribuir alimentos y capacitar a nuestras comunidades"
   - 2 botones: "Como Donante" | "Como Receptor"
   - Imagen: Ícono animado o ilustración

2. **Problema-Solución**
   - 3 cards describiendo el problema
   - 3 cards describiendo la solución

3. **Flujo del Sistema (Visual)**
   ```
   Donante Publica → Sistema Asigna → Org Recibe → Seguimiento
   ```

4. **Estadísticas Simuladas** (counters animados)
   - Alimentos Donados: 2,450 kg
   - Personas Ayudadas: 1,200
   - Entregas Exitosas: 98%
   - Cursos Disponibles: 45

5. **CTA (Call-to-Action)**
   - Botones: Registrarse | Inicia Sesión

6. **Footer**
   - Links a módulos
   - Redes sociales simuladas

---

### 2.2 LoginView

**Ruta:** `/login`  
**Autenticación:** Pública

**Elementos:**
- Logo centrado
- Formulario con email y contraseña
- "Recordarme" checkbox
- Botón "Iniciar Sesión"
- Link "¿No tienes cuenta?" → RegisterView
- Link olvidé contraseña (simulado)

**Lógica:**
```
Email: donor@example.com  → Rol: donor
Email: recipient@example.com → Rol: recipient
Email: admin@example.com  → Rol: admin
Contraseña: (cualquiera, para demo)
```

---

### 2.3 RegisterView

**Ruta:** `/register`  
**Autenticación:** Pública

**Formulario:**
```
1. Email
2. Nombre Completo
3. Teléfono
4. Rol (dropdown: Donante | Receptor | Organizacion | Admin)
5. Contraseña
6. Confirmar Contraseña
7. Términos y Condiciones (checkbox)
8. Botón Registrarse
```

**Validaciones:**
- Email formato válido
- Constraseña mín. 6 caracteres
- Términos aceptados

---

## 3. Módulo 2: Donantes

### 3.1 DonorDashboardView

**Ruta:** `/donor/dashboard`  
**Autenticación:** Requerida (Rol: donor)

**Secciones:**

#### 3.1.1 Header Personalizado
```
Bienvenido, [NombreDonante]!
Email: [email]
Impacto: Has donado 350kg | Ayudado a 85 personas
```

#### 3.1.2 Tarjeta de Perfil (ProfileCard)
- Foto (avatar placeholder)
- Nombre, email, teléfono
- Botón editar perfil
- Badges: "Donante Frecuente" si cumple condiciones

#### 3.1.3 Formulario Publicar Alimento (PublishFoodForm - Componente)

**Campos:**
```
1. Categoría (dropdown)
   - Frutas & Vegetales
   - Lácteos & Derivados
   - Granos & Carbohidratos
   - Enlatados & Preservados
   - Bebidas
   - Otros

2. Descripción (textarea)
   - Ej: "Manzanas rojas, frescas, sin plagas"

3. Cantidad (select + unit)
   - Cantidad: 10
   - Unidad: kg | cajas | unidades

4. Fecha de Caducidad (date picker)

5. Ubicación (texto o seleccionar de mapa)

6. Fotos (upload simulado - aceptar 1-3 JPG)

7. Notas adicionales (textarea opcional)

8. Botones: Publicar | Cancelar
```

**Acción al Publicar:**
- Guardar en `foodStore` y LocalStorage
- Mostrar toast "¡Alimento publicado con éxito!"
- Agregar a historial

#### 3.1.4 Tabla: Historial de Donaciones (DonationHistoryTable)

**Columnas:**
| Fecha | Artículo | Cantidad | Categoría | Estado | Receptor | Acción |
|-------|----------|----------|-----------|--------|----------|---------|
| 2025-04-10 | Manzanas | 20kg | Frutas | Entregado | Org ABC | Ver |
| 2025-04-08 | Leche | 50L | Lácteos | En Tránsito | Org XYZ | Ver |

**Estados:** Publicado | Asignado | En Tránsito | Entregado | Cancelado

#### 3.1.5 Widget: Estado de Entregas Actuales

**Mostrar:**
- 2-3 entregas más recientes
- Mapa mini con ubicación
- Botón "Ver en Mapa"

---

## 4. Módulo 3: Receptores/Beneficiarios

### 4.1 RecipientDashboardView

**Ruta:** `/recipient/dashboard`  
**Autenticación:** Requerida (Rol: recipient)

**Secciones:**

#### 4.1.1 Header Personalizado
```
Hola, [NombreBeneficiario]!
Zona: [Zona Vulnerable]
Apoyo Disponible
```

#### 4.1.2 Formulario: Solicitar Ayuda (RequestHelpForm)

**Campos:**
```
1. Tipo de Necesidad (checkboxes múltiples)
   ☑ Alimentos
   ☐ Educación/Cursos
   ☐ Oportunidad Laboral
   ☐ Otro

2. Descripción detallada (textarea)
   - Ej: "Familia de 4 personas, necesitamos alimentos frescos"

3. Número de personas (number)

4. Ubicación (seleccionar de zonas cercanas)

5. Urgencia (radio buttons)
   ◯ Normal
   ◯ Moderada
   ◯ Alta

6. Preferencias de alimentos (checkboxes)
   ☑ Frutas & Vegetales
   ☑ Lácteos
   ☐ Granos
   ☐ Otros

7. Botones: Solicitar Ayuda | Limpiar
```

#### 4.1.3 Grid: Alimentos Disponibles (AvailableFoodsGrid)

**Cards con:**
- Imagen del alimento
- Categoría
- Cantidad disponible
- Donante (nombre org/persona)
- Fecha de caducidad
- Ubicación (distancia)
- Botón "Solicitar"

**Filtros:**
- Por categoría
- Por distancia
- Por urgencia

#### 4.1.4 Tabla: Mis Solicitudes

**Columnas:**
| Fecha | Necesidad | Cantidad | Estado | Receptor/Info | Acción |
|-------|-----------|----------|--------|---|---------|
| 2025-04-12 | Alimentos | 30kg | Esperando | Org ABC | Cancelar |
| 2025-04-10 | Alimentos | 50kg | Entregado | Org XYZ | Calificar |

#### 4.1.5 Section: Organizaciones Cercanas

- Card con logo/nombre
- Descripción breve
- Link "Ver Perfil"
- Botón "Contactar"

---

## 5. Módulo 4: Visualización en Mapa

### 5.1 MapView

**Ruta:** `/map`  
**Autenticación:** Pública (pero mejor con login)

**Componentes:**

#### 5.1.1 MapViewer (Leaflet integrado)

**Features:**
- Mapa centrado en ciudad/región
- Capas:
  1. **Zonas Vulnerables** (polígonos color rojo claro)
  2. **Puntos de Recolección** (marcadores verde oscuro)
  3. **Puntos de Distribución** (marcadores azul claro)
  4. **Donantes Activos** (marcadores naranja)

- Click en marcador: Pop-up con detalles

#### 5.1.2 ZoneFilter (component)

**Opciones:**
- [ ] Mostrar zonas vulnerables
- [ ] Mostrar recolecciones
- [ ] Mostrar distribuciones
- [ ] Mostrar donantes
- Slider: Radio de búsqueda (1-50 km)

#### 5.1.3 DistributionPointsList

**Tabla con:**
- Nombre del Punto
- Tipo (Recolección/Distribución)
- Dirección
- Horario
- Responsable
- Botón "Llamar" | "Más Info"

#### 5.1.4 LegendPanel

```
Leyenda del Mapa:
🔴 Zona Vulnerable
🟢 Punto de Recolección
🔵 Punto de Distribución
🟠 Donante Activo
```

#### 5.1.5 Métrica en tiempo real (simulada)
- Alimentos en Tránsito: 12 entregas
- Puntos Activos: 8
- Zonas Cubiertas: 5

---

## 6. Módulo 5: Cursos y Formación

### 6.1 CoursesListView

**Ruta:** `/courses`  
**Autenticación:** Pública

**Secciones:**

#### 6.1.1 Header
```
Formación y Oportunidades
"Desarrolla tus habilidades con nuestros cursos gratuitos"
```

#### 6.1.2 SearchBar + Filtros

**Búsqueda:** Campo texto con debounce

**Filtros:**
```
Categoría:
  ◉ Todas
  ○ Emprendimiento
  ○ Habilidades Digitales
  ○ Oficios
  ○ Idiomas

Nivel:
  ○ Principiante
  ○ Intermedio
  ○ Avanzado

Duración:
  ○ Menos de 10 horas
  ○ 10-40 horas
  ○ Más de 40 horas
```

#### 6.1.3 Grid de Cursos (CourseCard)

**Cada Card muestra:**
```
┌─────────────────────────┐
│  [Imagen placeholder]   │
├─────────────────────────┤
│ Título Curso            │
│ Categoría (badge)       │
│  4.5 (12 reviews)     │
│ Instructor: Nombre      │
│ Duración: 20 horas      │
│ Inscrito: 234 personas  │
│ [Ver Detalles] [+]      │
└─────────────────────────┘
```

**Cursos Mock Recomendados:**
1. Introducción al Emprendimiento
2. Excel Básico & Avanzado
3. Marketing Digital
4. Reparación de Electrodomésticos
5. Panadería y Repostería
6. Inglés Básico
7. Plomería Residencial
8. Diseño Básico con Canva
9. Atención al Cliente
10. Contabilidad Básica

---

### 6.2 CourseDetailView

**Ruta:** `/courses/:courseId`

**Secciones:**

#### 6.2.1 CourseHero
- Imagen grande (16:9)
- Título del curso
- Rating & Reviews
- Precio: Gratis

#### 6.2.2 CourseInfo (tabs)

**Tab 1: Descripción**
- Qué aprenderás
- Para quién es
- Requisitos previos

**Tab 2: Contenido (Módulos)**
```
Módulo 1: Fundamentos (4 horas)
  ├─ Video 1: Introducción (15 min)
  ├─ Video 2: Conceptos Clave (30 min)
  └─ Quiz: Evaluación (10 min)

Módulo 2: Práctico (8 horas)
  ├─ Proyecto: Tu Primera Idea
  └─ Taller: Presentación
```

**Tab 3: Instructor**
- Foto
- Bio
- Cursos dictados
- Rating

#### 6.2.3 EnrollButton (destacado)

**Si NO inscrito:**
```
[Inscribirse Ahora] 🎓
```

**Si inscrito:**
```
[Continuar Curso →] ✓
Progreso: 45%
```

#### 6.2.4 ReviewsSection

```
4.5  basado en 12 reviews

"Excelente curso, muy práctico"
- Juan G., 5, hace 2 días

"Me ayudó a empezar mi negocio"
- María L., 5, hace 1 semana
```

---

## 7. Módulo 6: Organizaciones & Alianzas

### 7.1 OrganizationsView

**Ruta:** `/organizations`  
**Autenticación:** Pública

**Secciones:**

#### 7.1.1 Header
```
Organizaciones Aliadas
"Instituciones trabajando por tu comunidad"
```

#### 7.1.2 OrgGrid (OrgCards)

**Cada Card:**
```
┌────────────────────────┐
│ [Logo Org]             │
├────────────────────────┤
│ Nombre Organización    │
│ Tipo: ONG | Empresa    │
│ Ubicación: Zona XYZ    │
│ Programas: 3           │
│  4.8 (45 reviews)    │
│ [Ver Perfil]           │
└────────────────────────┘
```

**Orgs Mock Recomendadas:**
1. Fundación Alimentos Compartidos
2. Red de Esperanza
3. Oportunidades Locales
4. Centro Comunitario San José
5. Empresa Sostenible SA
6. Red de Mujeres Emprendedoras

#### 7.1.3 PartnershipsSection

```
Empresas Aliadas:
[Logo Empresa 1]  [Logo Empresa 2]  [Logo Empresa 3]
"Ellas apoyan nuestro proyecto"
```

#### 7.1.4 VacanciesSection

**Tabla:**
| Puesto | Empresa | Tipo | Aplicar |
|--------|---------|------|---------|
| Asistente Administrativo | Empresa A | Tiempo Completo | 📝 |
| Técnico | Empresa B | Part-time | 📝 |
| Gerente de Proyecto | Empresa C | Remote | 📝 |

---

## 8. Módulo 7: Panel Administrador

### 8.1 AdminDashboardView

**Ruta:** `/admin`  
**Autenticación:** Requerida (Rol: admin)

**Secciones:**

#### 8.1.1 Admin Header
```
Panel Administrativo
Última actualización: Hace 2 minutos
[Refresh] [Reportes] [Exportar]
```

#### 8.1.2 TrackingDashboard (component)

**Métricas principales (4 cards):**
```
┌──────────────────┐ ┌──────────────────┐
│  Entregas Hoy  │ │  Personas Hoy  │
│       12         │ │       45          │
│    (↑ 5%)       │ │    (↑ 12%)       │
└──────────────────┘ └──────────────────┘

┌──────────────────┐ ┌──────────────────┐
│  Alimentos (kg)│ │  Zonas Activas │
│      1,245       │ │        8         │
│    (↑ 23%)      │ │    (→ 0%)        │
└──────────────────┘ └──────────────────┘
```

#### 8.1.3 Mini Mapa

- Visualización pequeña de entregas en tiempo real
- Colores: Verde (entregado) | Naranja (en tránsito) | Rojo (retrasado)
- Click: Expandir mapa completo

#### 8.1.4 ReportsPanel (component)

**Gráficos Chart.js:**

1. **Alimentos Distribuidos (Últimos 7 días)**
   - Gráfico: Línea
   - Series: Cantidad (kg)

2. **Personas Ayudadas (Por Categoría)**
   - Gráfico: Pie
   - Categorías: Alimentos, Cursos, Empleos

3. **Cursos Matriculados (Top 5)**
   - Gráfico: Barras
   - Cursos más populares

4. **Vulnerabilidad por Zona**
   - Gráfico: Barras
   - Zonas con mayor necesidad

#### 8.1.5 ModerationPanel (component)

**PendingApprovalsTable:**
```
| ID | Usuario | Acción | Tipo | Estado | Botones |
|----|---------+--------+------+--------+---------|
| 1  | John D. | Publica alimento | Food |  Pendiente |  Aprobar |  Rechazar |
```

**ReportedContentList:**
```
Contenido Reportado:
- Foto de alimento (User: xyz) - 3 reportes
  [Ver] [Eliminar] [Avisar]
```

#### 8.1.6 TraceabilityLog

**Timeline/Log de eventos:**
```
2025-04-15 14:30 - Donante Juan D. publicó 20kg de manzanas
2025-04-15 14:35 - Sistema asignó a Org ABC
2025-04-15 14:40 - Org ABC confirmó recepción
2025-04-15 15:00 - Entrega completada
2025-04-15 15:05 - Beneficiario confirmó satisfacción
```

---

## 9. Componentes Reutilizables (Common)

```
components/common/
├── Header.vue
│   - Logo
│   - Nav links
│   - Auth buttons / User menu
│
├── Footer.vue
│   - Links
│   - Redes sociales
│   - Copyright
│
├── Navbar.vue
│   - Aside menu
│   - Rol-based navigation
│
├── Cards/
│   ├── FoodCard.vue
│   ├── CourseCard.vue
│   ├── OrgCard.vue
│   ├── StatCard.vue
│
├── Forms/
│   ├── FormInput.vue
│   ├── FormSelect.vue
│   ├── FormTextarea.vue
│   ├── FileUpload.vue
│
├── Tables/
│   ├── DataTable.vue (genérico)
│   ├── SortableTable.vue
│
├── Modals/
│   ├── ConfirmModal.vue
│   ├── DetailsModal.vue
│
├── Notifications/
│   ├── Toast.vue
│   ├── Alert.vue
│
└── Loaders/
    ├── Skeleton.vue
    ├── Spinner.vue
```

---

## 10. Guía de Flujos Completos Demostrables

### Flujo 1: Donante Publica → Receptor Recibe

```
1. Donante inicia sesión
2. Va a Panel Donante
3. Publica 20kg de manzanas (urgencia alta)
4. Sistema notifica a Org cercana
5. Org ve en dashboard
6. Receptor solicita ayuda (su zona coincide)
7. Sistema asigna
8. Entrega confirmada
9. Admin ve en trazabilidad 
```

### Flujo 2: Beneficiario se Capacita

```
1. Usuario público ve catálogo de cursos
2. Se registra como receptor
3. Se inscribe en curso "Marketing Digital"
4. Accede a módulos y videos
5. Completa quiz
6. Obtiene certificado (simulado)
7. Datos en perfil (para empleadores) 
```

### Flujo 3: Admin Monitorea

```
1. Admin ingresa panel
2. Ve 3 gráficos de impacto
3. Ve entregas en mapa
4. Revisa trazabilidad de alimento específico
5. Exporta reporte PDF (simulado) 
```

---

## 11. Especificaciones de Datos Mock

Cada entidad debe tener al menos 10-15 registros iniciales en JSON para que la demo se vea robusta:
- `mock-foods.json`: 15 alimentos (variadas categorías, estados)
- `mock-users.json`: 20 usuarios (roles variados)
- `mock-courses.json`: 10 cursos
- `mock-orders.json`: 8 solicitudes
- `mock-organizations.json`: 6 organizaciones
- `mock-zones.json`: 5 zonas vulnerables

---

## 12. Métricas de Éxito de Pantallas

Cada pantalla debe cumplir:

**Responsividad**
- Mobile (320px)
- Tablet (768px)
- Desktop (1920px)

 **Performance**
- First Contentful Paint < 1.5s
- Time to Interactive < 3s

 **Accesibilidad**
- Contraste suficiente
- Labels en formularios
- Navegación por teclado

 **UX**
- CTA claros y visibles
- Validaciones de formulario útiles
- Feedback inmediato (toasts)

