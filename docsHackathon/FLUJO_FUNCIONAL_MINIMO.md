# Flujo Funcional Mínimo - Prototipo Navegable

## 1. Visión General

Este documento especifica el **flujo mínimo funcional** que debe estar 100% operativo en la demo. No todas las pantallas necesitan estar completamente terminadas, pero los flujos core deben funcionar de punta a punta.

---

## 2. Flujos Críticos a Implementar

### Flujo A: "De la Donación a la Entrega" (Prioridad  MÁXIMA)

Este es el flujo "estrella" de la hackathon. Debe funcionar perfectamente.

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DONACIÓN → ENTREGA                      │
└─────────────────────────────────────────────────────────────────┘

PASO 1: Usuario inicia sesión como DONANTE
├─ Accede a Login
├─ Ingresa email: donor@example.com
└─ Entra a DonorDashboard 

PASO 2: Donante publica alimento
├─ Hace clic en "Publicar Alimento"
├─ Llena formulario:
│  ├─ Categoría: Frutas & Vegetales
│  ├─ Descripción: "Manzanas rojas, calidad A"
│  ├─ Cantidad: 20 kg
│  ├─ Caducidad: 5 días
│  ├─ Ubicación: Zona Centro
│  └─ Urgencia: Alta
├─ Hace clic "Publicar"
├─ Toast: "¡Alimento publicado!" 
└─ Datos persisten en LocalStorage 

PASO 3: Sistema asigna automáticamente
├─ En background (simulado), foodStore busca:
│  ├─ Organizaciones en esa zona
│  ├─ Solicitudes de ayuda activas
│  └─ Prioridades (urgencia, caducidad)
├─ Estado del alimento cambia a "Asignado" 
└─ Se registra en DeliveryStore 

PASO 4: Receptor ve alimento disponible
├─ Usuario inicia sesión como RECEPTOR
├─ Va a RecipientDashboard
├─ Ve "Alimentos Disponibles" grid
├─ Filtra por categoría "Frutas"
├─ Ve la oferta de manzanas 20kg 
├─ Información visible:
│  ├─ Foto (placeholder)
│  ├─ "Manzanas rojas"
│  ├─ Cantidad: 20 kg
│  ├─ Caducidad: 5 días
│  ├─ Distancia: 2.3 km
│  └─ Botón "Solicitar"
└─ Hace clic "Solicitar" 

PASO 5: Receptor confirma solicitud
├─ Abre modal de confirmación
├─ Especifica:
│  ├─ Cantidad que quiere: 10 kg (puede ser menos)
│  ├─ Zona de entrega: Zona Sur
│  └─ Notas: "Persona sola, disponible de 14-16hs"
├─ Hace clic "Confirmar Solicitud"
├─ Toast: "Solicitud enviada" 
└─ Datos en orderStore + LocalStorage 

PASO 6: Admin ve en tiempo real
├─ Admin accede a AdminkDashboard
├─ Ve métrica actualizada:
│  ├─ "Entregas Activas: 1"
│  ├─ "Personas beneficiadas hoy: +1"
│  └─ Mapa mini actualizado con pin 
├─ Haz clic en "Ver Trazabilidad Completa"
├─ Timeline muestra:
│  ├─ 14:30 - Donante Juan publicó
│  ├─ 14:35 - Sistema asignó a Org XYZ
│  ├─ 14:40 - Receptor María solicitó
│  └─ 14:45 - Estado: "En Transito" 
└─ Todo actualizado en tiempo real 

PASO 7: Entrega se marca como completada
├─ Receptor recibe (simulado)
├─ Hace clic "Confirmar que recibí"
├─ Completa Rating: ⭐⭐⭐⭐⭐
├─ Comentario: "Excelente, frutas muy frescas"
├─ Hace clic "Enviar Evaluación"
├─ Estado cambia a "Entregado" 
└─ Datos persistidos en LocalStorage 

RESULTADO FINAL: 
✓ Flujo completo demostrable en 3-5 minutos
✓ Trazabilidad perfecta en admin
✓ Datos persisten en navegador
✓ Impacto visible en métricas
✓ Validación del concepto probada
```

**Equipos en la demo pueden jugar los roles:**
- 1 persona = Donante
- 1 persona = Receptor
- 1 persona = Admin
- Todos ven estados actualizándose en tiempo real 

---

### Flujo B: "Beneficiario se Capacita" (Prioridad  ALTA)

```
┌──────────────────────────────────────────────────────────────────┐
│                    FLUJO CAPACITACIÓN                             │
└──────────────────────────────────────────────────────────────────┘

PASO 1: Usuario accede a Cursos (SIN login)
├─ Va a /courses
├─ Ve grid con 10 cursos
├─ Filtra por categoría "Emprendimiento"
├─ Busca por "Marketing" (debounce search) 
└─ Encuentra "Marketing Digital" 

PASO 2: Ve detalles del curso
├─ Haz clic en curso
├─ Va a /courses/marketing-digital
├─ Lee descripción completa
├─ Ve instructor, duración, reviews
├─ Todo precargado desde mock-courses.json 
└─ Botón destacado: "Inscribirse Ahora" 

PASO 3: Se registra e inscribe
├─ Hace clic "Inscribirse Ahora"
├─ Abre RegisterView (si no está logueado)
├─ Completa formulario rápido
├─ Selecciona rol "Beneficiario"
├─ Hace clic "Registrarse e Inscribirse"
├─ LocalStorage guarda sesión + inscripción 
└─ Redirecciona a CourseDetailView 

PASO 4: Accede al contenido del curso
├─ Botón cambia a "Continuar Curso →"
├─ Hace clic
├─ Ve Módulos (contenido expandible)
│  ├─ Módulo 1: Fundamentos (expandible)
│  │  ├─ Lección 1: Introducción al emprendimiento
│  │  │  └─ [▶ Video - 15 min] [✓ Marcado como visto]
│  │  ├─ Lección 2: Validación de idea
│  │  │  └─ [▶ Video - 30 min]
│  │  └─ Lección 3: Quiz de evaluación
│  │     └─ [ Quiz - 10 min] [ No completado aún]
│  │
│  └─ Módulo 2: Práctico (bloqueado hasta completar Módulo 1)
├─ Simula con localStorage
├─ Muestra progreso: "15% completado" 
└─ Puede marcar visto/no visto 

PASO 5: Completa y obtiene certificado
├─ Completa Módulo 1
├─ Intenta Módulo 2
├─ Completa Quiz final
├─ Sistema muestra:  "¡CURSO COMPLETADO!"
├─ Botón: "Descargar Certificado" (simulado)
├─ Email confirmación (simulado)
└─ Se guarda en LoggedUser.completedCourses 

RESULTADO FINAL: 
✓ Flujo de educación validado
✓ Inscripción → Contenido → Certificado
✓ Datos del usuario actualizados
✓ Muestra oportunidad de empleo post-educación
```

---

### Flujo C: "Monitoreo administrativo" (Prioridad  MEDIA-ALTA)

```
┌──────────────────────────────────────────────────────────────────┐
│                    FLUJO ADMINISTRACIÓN                           │
└──────────────────────────────────────────────────────────────────┘

PASO 1: Admin accede a panel
├─ Inicia sesión como email: admin@example.com
├─ Va a /admin
├─ Ve 4 grandes métricas actualizadas:
│  ├─ Entregas Hoy: 12 ↑5%
│  ├─ Personas Ayudadas: 45 ↑12%
│  ├─ Alimentos Distribuidos: 1,245 kg
│  └─ Zonas Activas: 8
├─ Métricas calculadas en tiempo real desde stores 
└─ Datos vienen de mock + LocalStorage 

PASO 2: Ve mapa de entregas en vivo
├─ Mini mapa Leaflet + OpenStreetMap
├─ Muestra pins coloreados:
│  ├─ 🟢 Verde = Completadas (10 pins)
│  ├─ 🟠 Naranja = En tránsito (2 pins)
│  └─ 🔴 Rojo = Retrasadas (0 pins)
├─ Cada pin tiene pop-up con:
│  ├─ Donante: "Juan D."
│  ├─ Alimento: "20kg Manzanas"
│  ├─ Receptor: "Familia González"
│  └─ Estado: "En tránsito"
├─ Clic en pin = detalle completo
└─ Mapa interactivo y responsive 

PASO 3: Genera reportes
├─ Section "Reportes" con 4 gráficos:
│  │
│  ├─ Gráfico 1: Línea - Alimentos distribuidos (últimos 7 días)
│  │  └─ Datos simulados con Chart.js
│  │
│  ├─ Gráfico 2: Pie - Distribución por categoría
│  │  ├─ Frutas & Vegetales: 45%
│  │  ├─ Lácteos: 25%
│  │  ├─ Granos: 20%
│  │  └─ Otros: 10%
│  │
│  ├─ Gráfico 3: Barras - Top 5 cursos
│  │  └─ Marketing Digital, Excel, Emprendimiento...
│  │
│  └─ Gráfico 4: Barras - Vulnerabilidad por zona
│     └─ Zona Centro, Zona Sur, Zona Este...
│
├─ Botón "Exportar PDF" (simulado, abre descarga mock)
└─ Todos los gráficos actualizables 

PASO 4: Ve trazabilidad completa
├─ Section "Trazabilidad" con timeline
├─ Filtra por:
│  ├─ Rango de fechas
│  ├─ Tipo de acción (donación, asignación, etc.)
│  └─ Usuario/organización
├─ Ve eventos en orden cronológico inverso:
│  ├─ [15:45] Entrega completada - Familia González ⭐⭐⭐⭐⭐
│  ├─ [15:30] Dona confirmó recepción - Org XYZ
│  ├─ [15:15] Alimento en tránsito
│  ├─ [15:00] Orden asignada a Receptor María
│  └─ [14:30] Donante Juan publicó "20kg Manzanas"
├─ Clic en evento = detalles popup
└─ Log completamente simulado en localStorage 

PASO 5: Moderación de contenido
├─ Section "Moderación" con 2 subsecciones:
│  │
│  ├─ Pendientes de Aprobación (tabla)
│  │  ├─ ID | Usuario | Acción | Tipo | [Aprobar] [Rechazar]
│  │  └─ 3 registros simulados
│  │
│  └─ Contenido Reportado (lista)
│     ├─ "Foto de alimentos reportada - 3 reportes"
│     ├─ [Ver] [Eliminar] [Avisar Usuario]
│     └─ 2 reportes simulados
│
└─ Botones funcionales (confirman en toast) 

RESULTADO FINAL: 
✓ Dashboard administrativo completo
✓ Métricas en tiempo real
✓ Mapa interactivo
✓ Reportes visuales
✓ Trazabilidad auditable
✓ Validación de sistema robusto
```

---

## 3. Pantallas Opcionales (Nice-to-Have)

Las siguientes pantallas pueden estar incompletas o simplificadas sin afectar la demo:

### 🟡 Pantallas Media Prioridad
- **ProfileView** - Perfil de usuario (puede ser modal reducido)
- **OrganizationsView** - Listado de orgs (puede ser grid básico sin muchos detalles)
- **MapView** - Mapa (funcional pero sin todas las capas)

### 🟢 Pantallas Baja Prioridad
- **OrgDetailView** - Detalle de organización individual
- **JobListingView** - Listado de empleos
- **SearchResultsView** - Búsqueda avanzada

---

## 4. Datos Iniciales Requeridos (Mock)

Cada archivo JSON debe tener estos registros iniciales:

### mock-foods.json (Mínimo 8, ideal 15)
```json
[
  {
    "id": 1,
    "title": "Manzanas rojas",
    "category": "Frutas & Vegetales",
    "quantity": 20,
    "unit": "kg",
    "expiryDate": "2025-04-20",
    "publishedBy": "Juan Donante",
    "location": "Zona Centro",
    "status": "available",
    "urgency": "high",
    "createdAt": "2025-04-15"
  },
  // ... más items
]
```

### mock-users.json (Mínimo 6, ideal 15)
```json
[
  {
    "id": 1,
    "email": "donor@example.com",
    "name": "Juan Donante",
    "role": "donor",
    "zone": "Zona Centro"
  },
  {
    "id": 2,
    "email": "recipient@example.com",
    "name": "María Receptor",
    "role": "recipient",
    "zone": "Zona Sur"
  },
  {
    "id": 3,
    "email": "admin@example.com",
    "name": "Admin System",
    "role": "admin"
  }
  // ... más usuarios
]
```

### mock-courses.json (Mínimo 8, ideal 10)
```json
[
  {
    "id": 1,
    "title": "Marketing Digital",
    "category": "Emprendimiento",
    "instructor": "Carlos López",
    "duration": 20,
    "enrolled": 234,
    "rating": 4.5,
    "reviews": 12
  }
  // ... más cursos
]
```

### mock-orders.json (Mínimo 5, ideal 10)
```json
[
  {
    "id": 1,
    "foodId": 1,
    "recipientId": 2,
    "status": "in_transit",
    "requestedAt": "2025-04-15T14:40:00Z",
    "quantity": 10
  }
  // ... más órdenes
]
```

### mock-zones.json (Mínimo 5)
```json
[
  {
    "id": 1,
    "name": "Zona Centro",
    "coordinates": [lat, lng],
    "vulnerabilityIndex": 8.5,
    "population": 5000
  }
  // ... más zonas
]
```

---

## 5. LocalStorage Schema

Después de interacción, LocalStorage debe persistir:

```javascript
// Estructura en localStorage

localStorage = {
  // Autenticación
  'app:currentUser': {
    id: 1,
    email: 'donor@example.com',
    role: 'donor',
    token: 'mock-token-xyz'
  },

  // Estado de aplicación
  'app:foods': [
    { id: 1, title: 'Manzanas', status: 'assigned', ... },
    // ... más alimentos
  ],

  'app:orders': [
    { id: 1, foodId: 1, status: 'in_transit', ... },
    // ... más órdenes
  ],

  'app:enrollments': [
    { userId: 2, courseId: 1, progress: 45, ... },
    // ... más inscripciones
  ],

  // Historial de interacciones
  'app:deliveryLog': [
    { timestamp: 'T14:30:00Z', action: 'published', foodId: 1 },
    // ... más eventos
  ]
}
```

---

## 6. Checklist: ¿Qué Demostrar en la Hackathon?

###  Demostración Mínima (20 minutos)

**Acto 1: Setup (1 min)**
```
"Tenemos una plataforma web con 3 roles: Donante, Receptor y Admin"
[Muestra Home →]
```

**Acto 2: Flujo Donación (10 min)**
```
Paso 1: [Juan inicia sesión como Donante]
        "Publicamos 20kg de manzanas"
        → Publica alimento

Paso 2: [María inicia sesión como Receptor]
        "La plataforma inmediatamente mostraba la oferta"
        → Ve alimentos disponibles
        → Solicita ayuda

Paso 3: [Admin ve en tiempo real]
        "Y aquí ven que el sistema registra la asignación"
        → Mapa actualizado
        → Métrica: +1 persona ayudada
        → Timeline completo
```

**Acto 3: Capacitación (5 min)**
```
"Además de alimentos, ofrecemos capacitación"
[Usuario público ve cursos sin login]
→ Se configura como Beneficiario
→ Se inscribe en curso
→ Ve contenido (módulos, videos, quiz)
→ Obtiene certificado
```

**Acto 4: Admin Dashboard (4 min)**
```
"Sistema de monitoreo en tiempo real"
→ Métricas actualizadas
→ Gráficos impactantes
→ Trazabilidad auditable
→ Moderation ready
```

###  Puntos Destacables

- ✨ "Sin backend, todo en el navegador"
- ✨ "Datos persisten entre sesiones"
- ✨ "Flujo completo visible en tiempo real"
- ✨ "Roles diferenciados con permisos"
- ✨ "Reportes automáticos"
- ✨ "Mapa interactivo con Leaflet"

---

## 7. Validaciones Funcionales Clave

Estas validaciones DEBEN estar implementadas:

### Campo "Email" en Login
-  Detecta si es donante, receptor o admin
-  No permite entrar sin email válido (formato)

### Formulario "Publicar Alimento"
-  Validación de campos obligatorios
-  Cantidad > 0
-  Fecha caducidad > hoy
-  Guarda y persiste en LocalStorage

### Solicitud de Ayuda
-  Cantidad solicitada ≤ cantidad disponible
-  Zona válida
-  Urgencia registrada

### Flujo Admin
-  Solo admin@example.com accede
-  Métricas actualizan en tiempo real
-  Filtros funcionan
-  Exportar genera archivo simulado

---

## 8. Errores Comunes a Evitar

 **NO hacer:**
- Pantallas sin datos (mostrará vacío, rompe demo)
- Botones que no funcionan (genera dudas)
- Formularios que no guardan (demo frágil)
- Responsividad rota en mobile (ambiente imprevisible)

 **SÍ hacer:**
- Llenar con datos mock iniciales
- Todos los botones funcionales (aunque sea simulado)
- LocalStorage funcionando siempre
- Responsive-first design

---

## 9. Testing del Flujo Antes de Demo

**Script de Validación (ejecutar 24hs antes):**

```
1. Limpia LocalStorage
2. Carga app
3. Home > Belleza visual?
4. Login como donor@example.com
5. Publica alimento > ¿Persiste?
6. Login como recipient@example.com
7. Ve alimento > ¿Aparece?
8. Solicita > ¿Datos guardados?
9. LogIn as admin > ¿Dashboard lleno?
10. Recarga página > ¿Datos persisten?
11. Cambia de role > ¿Componentes cambian?
12. Mapa > ¿Carga sin errores?
13. Cursos > ¿Grid muestra bien?
14. Todo responsive en mobile? 
```

 Si todo funciona → Demo exitosa garantizada

---

## 10. Timeline de Implementación Sugerido

| Fase | Duración | Qué Hacer | Resultado |
|------|----------|---------|-----------|
| **Setup** | 2 horas | Vite + Vue + Router + Pinia + Tailwind | Base lista |
| **Mockups** | 2 horas | CreateJSON files + stores básicos | Datos listos |
| **Flujo A** | 4 horas | Login + DonorDash + RecipientDash + Admin | Core funcional |
| **Flujo B** | 2 horas | CoursesView + CourseDetail | Educación lista |
| **Pulido** | 2 horas | Responsive + Estilos + Toast | Presentable |
| **Testing** | 1 hora | Validar flujos + Performance | Confianza |
| **Deploy** | 0.5 horas | Vercel/Netlify | URL vivo |

**Total: ~13.5 horas de desarrollo **

Con 1-2 devs trabajando dedicados = **2-3 días máximo**

---

## 11. Resumen: La Venta Final

> **"Creamos un prototipo funcional navegable que simula un sistema real de redistribucón de alimentos y capacitación. Sin backend, enfocados en la experiencia del usuario y validación del modelo. Todo funciona en el navegador, persiste en LocalStorage, y validaría perfectamente con una API real en la siguiente fase."**



