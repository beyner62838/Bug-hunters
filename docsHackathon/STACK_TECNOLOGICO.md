# Stack Tecnológico Oficial - Plataforma de Distribución de Alimentos

## 1. Stack Recomendado

### Frontend Framework
- **Vue 3** (Composition API)
  - Razón: Rápido de aprender, excelente reactividad, perfecto para prototipado
  - Documentación: https://vuejs.org/
  - ¿Por qué NO React nor Angular?: Menos setup, más velocidad de desarrollo

### Build Tool
- **Vite**
  - Razón: HMR ultrarrápido, bundling optimizado, ideal para hackathons
  - Configuración: Mínima, lista para producción
  - Deploy: Compatible con Vercel, Netlify

### Enrutamiento
- **Vue Router 4**
  - Razón: Enrutamiento declarativo, ideal para SPA modular
  - Features: Lazy loading, guards, nested routes
  - Uso: Navegación entre 8 módulos principales

### Manejo de Estado
- **Pinia**
  - Razón: Más simple que Vuex, composable, perfecto para MVP
  - Setup: Minimal boilerplate
  - Alternativa descartada: VueX (más complejo)
  - Stores recomendados: 7 (auth, food, order, delivery, course, geo, org)

### Estilos & Design System
- **Tailwind CSS**
  - Razón: Desarrollo rápido, utility-first, responsive automático
  - Configuración: Preconfigurada en Vite
  - Alternativa descartada: SCSS puro (más lento)
  - Tailwind Plugins: considerar daisyUI para componentes pre-hechos

### Iconos
- **Heroicons** (por Tailwind Labs) o **FontAwesome**
  - Razón: Integración perfecta con Tailwind
  - Uso: Botones, navegación, indicadores

### Geolocalización y Mapas
- **Leaflet + OpenStreetMap**
  - Razón: Lightweight, sin API keys obligatorias, open source
  - Vue Plugin: `vue-leaflet` para integración directa
  - Alternativa descartada: Google Maps (API keys, costos)
  - Alternativa descartada: Mapbox (overengineered para MVP)

### Persistencia de Datos
- **LocalStorage**
  - Razón: Sin backend, persistencia en navegador
  - Datos persistidos: Registros de usuario, alimentos publik-ados, solicitudes
  - Plugin: Vue-use (useLocalStorage)
  - Datos iniciales: Cargados desde JSON mock

### TypeScript (Opcional pero Recomendado)
- **TypeScript 5+**
  - Razón: Catch errors early, mejor DX, facilita debugging
  - Setup: Automático con Vite + Vue

### Testing (Opcional para Hackathon)
- **Vitest** (ligero)
- **Vue Test Utils** (para testing components)
- Aplicable si hay tiempo, no crítico para demo

### Utilidades
- **Axios** o **Fetch API** (para simular llamadas a APIs)
- **date-fns** o **Day.js** (para manejo de fechas)
- **lodash-es** (solo si necesitan utilidades avanzadas)

---

## 2. Versiones Recomendadas

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.2.0",
    "pinia": "^2.1.0",
    "axios": "^1.6.0",
    "leaflet": "^1.9.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "latest",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "typescript": "^5.0.0",
    "@vue/test-utils": "^2.4.0",
    "vitest": "^0.34.0"
  }
}
```

---

## 3. Comparativa: ¿Por Qué Este Stack?

| Aspecto | Vue 3 + Vite | React | Angular |
|--------|-------------|-------|---------|
| Curva de aprendizaje | ⭐⭐ (Rápida) | ⭐⭐⭐ (Media) | ⭐⭐⭐⭐ (Lenta) |
| Setup inicial | ⭐⭐ (2 min) | ⭐⭐⭐ (10 min) | ⭐⭐⭐⭐⭐ (20+ min) |
| Velocidad dev | ⭐⭐ (HMR rápido) | ⭐⭐ (Rápido) | ⭐⭐⭐ (Medio) |
| Bundle size | ⭐ (34KB gzip) | ⭐⭐ (42KB) | ⭐⭐⭐ (130KB) |
| Ideal para MVP | ✅ | ✅ | ❌ |
| Hackathon | ✅✅✅ | ✅✅ | ❌ |
| Performance | ⭐ | ⭐ | ⭐⭐ |

---

## 4. Por Qué SIN Backend

### ❌ Backend Agrega Complejidad
- Setup de servidor (Node, Python, etc.)
- Base de datos (PostgreSQL, MongoDB)
- Conexiones y CORS
- Despliegue (Heroku deprecated, Railway, Render)
- Autenticación real (JWT, OAuth)
- **Tiempo perdido:** 30-50% del desarrollo

### ✅ Frontend Mock Agrega Velocidad
- Todo en el navegador
- Sin latencia de servidor
- Fácil de demo en local
- Sin costo de infraestructura
- **Ganancia de tiempo:** 50-70% más rapido

### 📊 Simulación Realista
Con JSON mock y LocalStorage, se puede simular perfectamente:
- Flujos completos (donación → entrega → capacitación)
- Errores y validaciones
- Permisos por rol
- Trazabilidad en tiempo "real"

---

## 5. Configuración Recomendada de Vite

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
})
```

---

## 6. Configuración Tailwind CSS

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981', // Verde para sostenibilidad/alimentos
        secondary: '#F59E0B', // Ámbar para urgencia
        danger: '#EF4444', // Rojo para alertas
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

---

## 7. Estructura de Configuración del Proyecto

```
proyecto-root/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── vitest.config.ts (optional)
├── .env.example
├── .gitignore
├── prettier.config.js (optional)
└── src/
    ├── main.ts
    ├── App.vue
    ├── vite-env.d.ts
    ├── ...
```

---

## 8. Scripts Recomendados en package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc --noEmit",
    "lint": "eslint src --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts",
    "format": "prettier --write src/",
    "test": "vitest"
  }
}
```

---

## 9. Librerías Auxiliares Opcionales

| Librería | Propósito | Necesidad |
|----------|----------|----------|
| `vueuse/core` | Composables reutilizables | Media |
| `daisyui` | Componentes Tailwind preconstruidos | Baja (si tiempo falta) |
| `chart.js` + `vue-chartjs` | Gráficos para panel admin | Media |
| `vue-toastification` | Notificaciones | Baja |
| `swiper` | Carruseles | Baja |

---

## 10. Alternativas Descartadas y Razones

### ❌ Nuxt 3 (Full-stack framework)
- **Razón:** Overkill para un prototipo sin backend. Agrega setup extra.

### ❌ React + Next.js
- **Razón:** Curva de aprendizaje más pronunciada, más setup inicial.

### ❌ Angular
- **Razón:** Muy pesado, orientado a proyectos grandes, no hackathons.

### ❌ Svelte
- **Razón:** Comunidad más pequeña, menos recursos, riesgo desconocido.

### ❌ Firebase/Supabase
- **Razón:** Innecesario para demo, complica infraestructura.

### ❌ AWS Amplify
- **Razón:** Mismo problema, además requiere cuenta AWS.

---

## 11. Deployment Recomendado

### ✅ Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```
- Tiempo: 1 minuto
- Costo: Gratis
- CI/CD automático

### ✅ Netlify (Alternativa)
```bash
npm install -g netlify-cli
netlify deploy --prod
```
- Tiempo: 1 minuto
- Costo: Gratis
- Preview automático

### ✅ GitHub Pages
- Tiempo: 2 minutos (si usa GitHub)
- Costo: Gratis
- No requiere CLI

---

## 12. Checklist de Setup Inicial

- [ ] `npm create vite@latest proyecto-name -- --template vue-ts`
- [ ] `cd proyecto-name && npm install`
- [ ] Instalar Tailwind: `npm install -D tailwindcss postcss autoprefixer`
- [ ] `npx tailwindcss init -p`
- [ ] Instalar dependencias: `npm install vue-router pinia leaflet axios date-fns`
- [ ] Crear carpetas: `src/{components,views,stores,services,data,router}`
- [ ] Configurar `router/index.ts`
- [ ] Configurar `stores/` (primeras 2-3 stores)
- [ ] Crear `data/mock-*.json`
- [ ] Arrancar con `npm run dev`

---

## 13. Notas Finales

✅ **Este stack es:**
- Moderno y probado en producción
- Rápido de desarrollar
- Perfecto para hackathons
- Escalable a backend posteriormente
- Profesional al presentar

❌ **NO es:**
- Para aplicaciones críticas sin backend
- Para empresas que necesitan soporte de nivel empresarial
- Para devs sin experiencia en frontend

