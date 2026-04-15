# 🌍 RedAlimenta – Plataforma de Rescate Alimentario e Inclusión Productiva

<p align="center">
  <img src="redAlimenta-logo.png" width="250"/>
</p>

## 🧠 Descripción

**RedAlimenta** es una plataforma digital desarrollada como prototipo funcional de alta fidelidad que busca combatir el hambre y la pobreza en zonas urbanas mediante el uso estratégico de la tecnología.

La solución conecta comercios que tienen excedentes de alimentos próximos a perecer (pero aptos para consumo) con organizaciones comunitarias y líderes sociales, facilitando su publicación, solicitud, asignación, distribución y trazabilidad.

Adicionalmente, integra un módulo de inclusión productiva que ofrece rutas de formación básica y conexión con empresas aliadas, promoviendo oportunidades de empleabilidad a mediano y largo plazo.

---

## 🎯 Objetivo

Demostrar cómo una solución tecnológica puede:

- Reducir el desperdicio de alimentos
- Mejorar la distribución de ayudas alimentarias
- Generar trazabilidad en donaciones
- Promover formación y acceso a empleo
- Escalar a una solución real en producción

---

## 👥 Población Objetivo

- 🏪 Comercios: supermercados, panaderías, restaurantes, fruterías
- 🏘️ Organizaciones: comedores comunitarios, fundaciones, líderes barriales
- 👤 Beneficiarios: personas en situación de vulnerabilidad
- 🏢 Empresas aliadas: organizaciones que ofrecen empleo o formación

---

## ⚙️ Tecnologías Utilizadas

- **Vue 3 (Composition API)**
- **Vite**
- **Vue Router**
- **Pinia**
- **Tailwind CSS**
- **Leaflet + OpenStreetMap**

---

## 🧩 Arquitectura del Proyecto
src/                                                                                                     
│                                                                                                        
├── components/ # Componentes reutilizables                                                              
│ ├── common/ # Botones, inputs, tablas, etc.                                                            
│ ├── maps/ # Componentes de mapas (Leaflet)                                                             
│ ├── donors/ # Donaciones y donantes                                                                    
│ ├── training/ # Cursos y formación                                                                     
│ └── jobs/ # Empresas y vacantes                                                                        
│                                                                                                        
├── views/ # Vistas principales (pages)                                                                  
├── router/ # Configuración de rutas (Vue Router)                                                        
├── stores/ # Estado global (Pinia)                                                                      
├── data/ # Datos mock (JSON)                                                                            
└── layouts/ # Layout principal (sidebar, header)                                                        


---

## 📦 Manejo de Datos

El proyecto utiliza **datos simulados (mock)** en archivos JSON:

- donors.json
- donations.json
- receivers.json
- requests.json
- courses.json
- companies.json
- traceability.json
- metrics.json

Se gestionan mediante:

- **Pinia (stores)**
- **localStorage (opcional)**

---

## 🗺️ Funcionalidades Principales

### 🔹 Módulo de Donaciones
- Registro de alimentos
- Visualización de donaciones
- Gestión de disponibilidad

### 🔹 Módulo de Solicitudes
- Solicitud de alimentos
- Gestión de estados:
  - Pendiente
  - En revisión
  - Asignada
  - En ruta
  - Entregada

### 🔹 Módulo de Distribución
- Asignación de donaciones
- Simulación de rutas

### 🔹 Módulo de Trazabilidad
- Seguimiento completo de donaciones
- Historial de entregas

### 🔹 Módulo de Formación
- Catálogo de cursos
- Inscripción a programas
- Seguimiento básico

### 🔹 Módulo de Empresas
- Empresas aliadas
- Vacantes simuladas
- Postulación

### 🔹 Módulo de Analítica
- Métricas clave
- KPIs del sistema

---

## 🔄 Flujos Principales

### 🔹 Flujo 1: Distribución de alimentos
1. Crear donación  
2. Visualizar donación  
3. Solicitar donación  
4. Cambiar estado  
5. Ver trazabilidad  

### 🔹 Flujo 2: Inclusión productiva
1. Ver cursos  
2. Inscribirse  
3. Ver empresas  
4. Postularse  

---

## 🖥️ Vistas del Sistema

- HomeView (Landing)
- DashboardView
- DonorsView
- DonationCreateView
- ReceiversView
- RequestsView
- MapView
- TraceabilityView
- TrainingView
- CompaniesView
- AdminView

---

## 🎨 Diseño

- UI moderna y profesional
- Responsive design
- Componentes reutilizables
- Paleta de colores:
  - Verde (impacto social)
  - Azul (tecnología)
  - Blanco y gris (limpieza visual)

---

## 🎯 Enfoque Técnico

- SPA (Single Page Application)
- Sin backend real
- Sin autenticación real
- Sin APIs externas obligatorias
- Lógica completamente simulada en frontend

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/beyner62838/Bug-hunters.git
```
```bash
cd Bug-hunters
```
### 2. Instalar dependencias
```bash
npm install
```
### 3. Ejecutar en desarrollo
```bash
npm run dev
```
### 4. Construir para producción
```bash
npm run build
```

## 📊 Impacto Esperado
- Reducción del desperdicio de alimentos
- Mejora en la distribución de ayudas
- Fortalecimiento de redes comunitarias
- Generación de oportunidades de formación
- Incremento en acceso a empleo
  
## 🔐 Consideraciones
- Datos simulados para demo
- No incluye backend ni persistencia real
- Escalable a integración futura con APIs reales

## 👨‍💻 Equipo
Proyecto desarrollado en la II Hackathon de Programación – Universidad Surcolombiana (2026)

## 📄 Licencia
Uso académico – Hackathon Universitaria

## 💡 Propuesta de Valor
“Convertimos excedentes alimentarios en ayuda inmediata y oportunidades laborales a futuro.”
