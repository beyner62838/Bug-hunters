# FAQ - Preguntas Frecuentes sobre la Arquitectura

## Índice de Preguntas

1. [Decisiones de Stack](#decisiones)
2. [Firebase/Backend](#backend)
3. [Datos Simulados](#datos)
4. [Performance](#performance)
5. [Escalabilidad & Fase 2](#escalabilidad)
6. [Equipo & Recursos](#equipo)
7. [Demo & Presentación](#demo)
8. [Problemas Técnicos](#problemas)

---

## Decisiones de Stack {#decisiones}

### P1: ¿Por qué Vue y no React o Angular?

**RTA:** Tres razones clave:

1. **Curva de Aprendizaje:** Vue es más accesible. Si tu equipo tiene devs con experiencia variable, Vue les permitirá contribuir más rápido.

2. **Setup Inicial:** Con `npm create vite@latest tu-proyecto -- --template vue-ts`. Listo en 2 minutos. React necesita más configuración (Webpack, babel). Angular es excesivo para un MVP.

3. **Tamaño Final:** Vue ~34KB gzip (incluye router + pinia). React ~42KB. Angular ~130KB+. En una hackathon, cada KB importa.

4. **Documentación:** Vue tiene excelente documentación en español. React comunidad es mayor pero más fragmentada.

 **Veredicto:** Vue es la opción correcta para velocidad.

---

### P2: ¿Debería usar Nuxt en lugar de Vue + Vite?

**RTA:** NO. Por estas razones:

 **Nuxt agrega:**
- Config adicional (nitro, nuxt.config.ts)
- Conceptos nuevos (middleware, layouts automáticas)
- Carpetas convencionales que confunden
- SSR setup (innecesario para demo frontend)

 **Para esta hackathon:** Vue + Vite es más directo.

**Solo usa Nuxt si:**
- Necesitas SSR (no es el caso)
- Quieres API routes (ya tenemos frontend puro)
- Tienes equipo muy junior que necesita mucha magia

---

### P3: ¿Por qué Pinia y no Vuex o useState?

**RTA:** 

| Opción | Setup | Boilerplate | Learning | Estado Global |
|--------|-------|------------|----------|---------------|
| **Pinia** | 5min | Mínimo | Fácil |  Excelente |
| Vuex | 15min | Mucho | Medio |  Excelente |
| useState | N/A | 0 | Fácil |  Prop drilling |
| Context + useReducer | 10min | Bastante | Medio |  Funciona |

 **Pinia:** Setup fácil, docs claras, comunidad activa, es el futuro de Vue.

---

### P4: ¿TypeScript es obligatorio?

**RTA:** NO es obligatorio, pero **SÍ recomendado**.

**Razones:**
- IDE autocompletion mejor
- Catch errors antes de runtime
- Refactoring más seguro

**Si NO sabes TypeScript:**
- Puedes usar JavaScript puro (quita `.ts` extensiones)
- Vue 3 Composition API es fácil incluso sin tipos

**Recomendación:** Usa TypeScript. No agrega complejidad significativa.

---

### P5: ¿Necesito testing con Vitest/Jest para la hackathon?

**RTA:** **NO es crítico.** Manual testing es suficiente.

**Testing recomendado si:**
- Tienes dev experimentado (+ 30 min overhead)
- Quieres validar lógica store específica

**Para hackathon:** Focus en visual + UX testing.

---

## Backend & Firebase 

### P6: ¿Por qué no usar Firebase en lugar de mock?

**RTA:** Firebase agrega complejidad:

```
 Firebase:
- Auth setup (+ 20 min)
- Firestore collections (+ 30 min)
- Security rules (+ 30 min)
- Conexión errores (+ debugging)
= Total: 80+ min, sin validación del concepto

 LocalStorage Mock:
- JSON arrays (5 min)
- Pinia stores (10 min)
- Lógica simulada (15 min)
= Total: 30 min, concepto validado
```

**Además:** Firebase funciona aunque el concepto sea malo. Mock te fuerza a entender tu datos.

---

### P7: ¿Y si después necesitamos backend?

**RTA:** Arquitectura está diseñada para eso.

**Fase 1 (Ahora):**
```
Component → Pinia Store → LocalStorage
```

**Fase 2 (Post-Hackathon):**
```
Component → Pinia Store → Axios API → Backend
```

**El cambio es trivial:** Reemplaza `loadFromLocalStorage()` con `await api.get()`.

---

### P8: ¿Debería usar un JSON Server local en lugar de mock?

**RTA:** Depende:

**JSON Server sí si:**
- Quieres REST APIs simulado
- Backend dev quiere practicar integración
- Tienes equipo con experiencia Node.js

**JSON Server no si:**
- Solo 1 frontend dev
- Quieres máxima velocidad
- No sabes Node.js

**Recomendación:** Mantén mock simple. JSON Server es overhead.

---

## Datos Simulados {#datos}

### P9: ¿Cuántos registros mock necesito?

**RTA:** Al menos estos iniciales:

| Archivo | Registros | Razón |
|---------|-----------|-------|
| mock-users.json | 6+ | 3 roles × 2 usuarios cada uno |
| mock-foods.json | 15+ | Variedad en categorías/estados |
| mock-courses.json | 10+ | Grid se ve completo |
| mock-orders.json | 8+ | Historial no vacío |
| mock-zones.json | 5 | Mapa no se ve vacío |
| mock-orgs.json | 6+ | Directorio funcional |

**Total:** ~50 registros iniciales para demo robusta.

---

### P10: ¿Cómo manejo datos dinámicos entre roles?

**RTA:** Ejemplo: Donante publica, Receptor recibe.

```javascript
// EN PublishFoodForm.vue (Donante)
const publishFood = (foodData) => {
  const food = {
    id: Date.now(),
    ...foodData,
    publishedBy: currentUser.id,
    status: 'available',
    createdAt: new Date()
  }
  
  foodStore.addFood(food)
  // LocalStorage auto-actualiza
}

// EN AvailableFoodsGrid.vue (Receptor)
// Pinia store reactivo llamó productos
const foods = computed(() => foodStore.getAvailableFoods())
// Se ven automáticamente!
```

**Clave:** Pinia hace sync automática entre componentes.

---

### P11: ¿Los datos persisten entre sesiones?

**RTA:** **SÍ**, si trabajas con LocalStorage correctamente.

```javascript
// EN foodStore.ts
const addFood = (food) => {
  foods.value.push(food)
  saveToLocalStorage() // Guardar después
}

const loadFromLocalStorage = () => {
  const stored = localStorage.getItem('app:foods')
  if (stored) foods.value = JSON.parse(stored)
}

// AL inicializar app
onMounted(() => {
  foodStore.loadFromLocalStorage()
})
```

**Resultado:** Usuario publica alimento, recarga, sigue viendo.

---

### P12: ¿Y si quiero que los datos cambien en "tiempo real"?

**RTA:** Simula con Pinia watchers:

```javascript
// Cuando receptor solicita, actualiza status
watch(() => orderStore.orders, (newOrders) => {
  newOrders.forEach(order => {
    if (order.status === 'pending' && Date.now() - order.createdAt > 3000) {
      // Simula que pasaron 3 segundos, cambiar a 'assigned'
      order.status = 'assigned'
    }
  })
}, { deep: true })
```

Esto simula entregas "en tránsito" sin backend real.

---

## Performance {#performance}

### P13: ¿Cuál será el tamaño final del bundle?

**RTA:** estimate para production:

```
Vue 3:              ~35 KB
Vue Router:         ~12 KB
Pinia:              ~8 KB
Tailwind CSS:       ~40 KB (after purge)
Leaflet:            ~40 KB
Chart.js:           ~50 KB
Utils (axios, etc): ~15 KB
─────────────────
TOTAL:             ~200 KB

Gzipped:            ~60 KB
```

Descarga: Instant en 4G. 

---

### P14: ¿Será lenta la app con 50 registros mock?

**RTA:** NO. 50 registros es trivial.

**Localización:** ¿Cuándo empieza a lentificarse?
- 1K registros: Rápido
- 10K registros: Todavía rápido
- 100K registros: Empieza a notar (necesitarías paginación)

**Para hackathon:** Sin problema.

---

### P15: ¿Qué tal Leaflet con 5 zonas en el mapa?

**RTA:** Ultra rápido.

**Leaflet renderiza eficientemente:**
- 5 capas poligonales: < 50ms
- 20 marcadores: < 20ms
- Zooming/panning: Smooth 60fps

**Límite antes de lag:**
- 1000+ marcadores sin clustering
- 100+ polígonos complejos

**Para tu demo:** Sin problema.

---

## Escalabilidad & Fase 2 {#escalabilidad}

### P16: ¿Qué pasa cuando ganan la hackathon?

**RTA:** Propuesta de Fase 2:

```
FASE 1 (Hackathon - Ahora)
 Frontend Vue puro + mock
 Validación UX/concepto
 Demo funcionando

FASE 2 (30 días post-hackathon)
 Backend Node.js + Express/Fastify
 PostgreSQL database
 JWT autenticación real
 REST APIs (CRUD)
 Deployment real

FASE 3 (60+ días)
 App móvil (React Native)
 Infraestructura (AWS/GCP)
 Inteligencia Artificial (matching de donantes)
 Analytics avanzado
```

**Estimado Fase 2:** 200-300 horas de dev.

---

### P17: ¿Será fácil migrar de mock a backend?

**RTA:** SÍ, muy fácil.** La arquitectura está preparada.

**Paso 1:** Crear `services/api.ts`

```typescript
// ANTES (mock)
const foods = await foodStore.getFoodsFromLocal()

// DESPUÉS (backend)
const foods = await api.foods.getAll()
```

**Paso 2:** Actualizar stores

```typescript
// En foodStore.ts
const fetch = async () => {
  foods.value = await api.foods.getAll() // cambio
}
```

Resultado: 30 min de refactor, todo funciona.

---

### P18: ¿Qué pasa con autenticación?

**RTA:** AuthStore prepara para JWT.

**Mock (Ahora):**
```javascript
auth.login = (email, password) => {
  currentUser.value = { email, role: 'donor' }
  localStorage.token = 'mock-token'
}
```

**Real (Luego):**
```javascript
auth.login = async (email, password) => {
  const { token, user } = await api.auth.login(email, password)
  currentUser.value = user
  localStorage.token = token
}
```

**Cambio:** 2 líneas. 

---

## Equipo & Recursos {#equipo}

### P19: ¿Cuál es el equipo mínimo?

**RTA:**

**Escenario 1 (Lean - Recomendado)**
- 1 Frontend Developer (full-time)
- Tiempo: 3-4 días dedicados
- Resultado: MVP funcional

**Escenario 2 (Optimal)**
- 1 Frontend Dev
- 1 Designer (UX/UI)
- Tiempo: 2-3 días
- Resultado: MVP pulido + profesional

**Escenario 3 (Overkill)**
- 2 Frontend Devs
- 1 Backend Dev (prep para Fase 2)
- 1 Designer
- Tiempo: 2 días
- Resultado: MVP robusto + roadmap backend

---

### P20: ¿Qué habilidades tiene que tener el dev?

**RTA:** Mínimo:

-  JavaScript/TypeScript básico
-  HTML & CSS fundamentals
-  Componentes Vue (no experto)
-  Git basics

**Bonificador (no requerido):**
- Pinia (fácil de aprender)
- Tailwind (documentación excelente)
- API REST (mínimo para luego)

---

### P21: ¿Dónde encuentro recursos?

**RTA:**

**Tutoriales (Gratis)**
- Vue 3: https://vuejs.org/ (oficial)
- Vite: https://vitejs.dev/ (oficial)
- Tailwind: https://tailwindcss.com/ (oficial)
- Pinia: https://pinia.vuejs.org/ (oficial)

**Comunidades**
- r/vuejs (Reddit)
- Vue Discord Community
- Stackoverflow (tag: vue.js)

**Videos**
- Vue 3 Composition API Crash Course (YouTube)
- Vite + Vue 3 Project Setup (YouTube)

---

## Demo & Presentación {#demo}

### P22: ¿Cuánto tiempo toma demostrar?

**RTA:** 20 minutos es el estándar.

**Breakdown sugerido:**

```
1. Portada & Problema (2 min)
   "En X país, Y personas..."
   
2. Solución Conceptual (2 min)
   "Conexión donantes ↔ receptores"
   
3. Flujo 1: Donación (6 min)
   Live: Publicar alimento → Receptor recibe
   
4. Flujo 2: Capacitación (4 min)
   Live: Inscribir a curso → Ver lecciones
   
5. Flujo 3: Admin (4 min)
   Live: Mapa, gráficos, trazabilidad
   
6. Conclusión & Next Steps (2 min)
   "Fase 2: Backend..."
```

---

### P23: ¿Cómo presento sin internet?

**RTA:** Copia local en laptop + fallback.

```
 Host en localhost:5173 (Vite dev server)
 Usa WiFi local si necesitas

 NO dependa de Vercel en vivo (puede caer)
```

**Pro tip:** Deploy en Vercel de todas formas. Tienes respaldo.

---

### P24: ¿Debería grabar un video?

**RTA:** Opcional pero recomendado.

**Por qué:**
- Backup si hay problemas técnicos en vivo
- Enviar a sponsors/inversionistas después
- Prueba de funcionalidad

**Tiempo de grabación:** 30 min (demo + práctica).

---

## Problemas Técnicos {#problemas}

### P25: ¿Qué pasa si Leaflet no carga?

**RTA:** Fallback rápido:

```javascript
// Si Leaflet falla
const MapView = () => {
  return <div className="bg-gray-200 h-96">Mapa aquí (no cargó)</div>
}
```

O:
```javascript
// Usar imagen estática
<img src="/mockmap.png" alt="Zona de distribución" />
```

**Solución Real:** Usa CDN como respaldo:
```html
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

---

### P26: ¿Qué pasa si LocalStorage falla?

**RTA:** Session en memoria (degradación elegante).

```javascript
try {
  localStorage.setItem('key', JSON.stringify(data))
} catch (e) {
  // LocalStorage lleno o en incognito
  // Mantén en memoria de todas formas
  sessionData.value = data
}
```

App sigue funcionando, solo no persiste.

---

### P27: ¿Error de CORS al consumir APIs?

**RTA:** Como no consumes APIs externas (todo es local), NO hay CORS.

**Si luego necesitas:**
```javascript
// Solución backend (Fase 2)
app.use(cors({
  origin: ['http://localhost:5173', 'https://app.com']
}))
```

---

### P28: ¿Cómo debuguear Pinia?

**RTA:** Devtools oficial:

```bash
npm install @pinia/devtools
```

En `main.ts`:
```javascript
import { createPinia } from 'pinia'
import { createPiniaDevtools } from '@pinia/devtools'

const pinia = createPinia()
app.use(createPiniaDevtools())
```

Browser devtools → Vue → Pinia tab → Inspecciona stores.

---

### P29: ¿El app se congela con muchos datos?

**RTA:** No deberías, pero si passa:

**Culpritos comunes:**
1. Watchers no optimizados → Usar `computed`
2. Loops sin break → Agregar condicionales
3. Renderizar 1000+ items sin virtualización

**Solución:**
```javascript
// Mala 
watch(foods, () => {
  // Recalcula TODO
}, { deep: true })

// Buena 
const filteredFoods = computed(() => 
  foods.value.filter(f => f.status === 'active')
)
```

---

### P30: ¿Responsive no funciona en mobile?

**RTA:** Verifica Tailwind breakpoints.

```html
<!-- Mala -->
<div class="w-96">Siempre 384px</div>

<!-- Buena  -->
<div class="w-full md:w-96">Full mobile, 384px en desktop</div>
```

Test en Chrome DevTools (F12 → Responsive mode).

---

##  Resumen Final

**35 preguntas. 1 respuesta simple:**

> Con Vue 3 + Vite + Pinia + Tailwind + mock data, puedes construir un MVP navegable en 3-4 días, demostrar en 20 minutos ohne backend, y escalar a producción en Fase 2 con arquitectura preparada.



