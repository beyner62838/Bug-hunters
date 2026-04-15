<script setup>
import { RouterLink } from 'vue-router'
import StatCard from '@/components/common/StatCard.vue'
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardStore = useDashboardStore()
</script>

<template>
  <div class="page-shell">
    <section class="panel-surface overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
      <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div class="inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800">
            Hackathon universitaria · MVP de alta fidelidad
          </div>
          <h1 class="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {{ dashboardStore.homeContent.projectName }}
          </h1>
          <p class="mt-4 max-w-3xl text-xl leading-8 text-slate-600">
            {{ dashboardStore.homeContent.tagline }}
          </p>
          <p class="mt-5 max-w-3xl text-base leading-7 text-slate-600">
            {{ dashboardStore.homeContent.heroDescription }}
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <RouterLink
              to="/dashboard"
              class="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Explorar dashboard
            </RouterLink>
            <RouterLink
              to="/donations/new"
              class="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
            >
              Registrar donación
            </RouterLink>
            <RouterLink
              to="/training"
              class="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-ocean-300 hover:text-ocean-700"
            >
              Ver formación
            </RouterLink>
          </div>
        </div>

        <div class="grid gap-4">
          <StatCard
            v-for="item in dashboardStore.homeContent.impactHighlights"
            :key="item.title"
            :title="item.title"
            :value="item.value"
            :hint="item.hint"
            compact
            accent="brand"
          />
        </div>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-3">
      <article
        v-for="step in dashboardStore.homeContent.howItWorks"
        :key="step.title"
        class="panel-surface p-6"
      >
        <div class="mb-4 inline-flex rounded-full bg-ocean-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700">
          Cómo funciona
        </div>
        <h2 class="font-display text-2xl font-semibold text-slate-950">{{ step.title }}</h2>
        <p class="mt-3 text-base leading-7 text-slate-600">
          {{ step.description }}
        </p>
      </article>
    </section>

    <section class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article class="panel-surface p-6 sm:p-7">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Impacto</p>
        <h2 class="mt-3 font-display text-3xl font-semibold text-slate-950">
          Un sistema que responde hoy y abre oportunidades mañana
        </h2>
        <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          RedAlimenta combina gestión operativa de alimentos con trayectorias de formación y conexión a empresas aliadas, para atacar la urgencia alimentaria sin perder de vista la movilidad social.
        </p>

        <div class="mt-8 grid gap-4 sm:grid-cols-3">
          <div class="rounded-3xl bg-slate-50 p-5">
            <p class="text-sm font-medium text-slate-500">Redistribución urbana</p>
            <p class="mt-2 font-display text-3xl font-semibold text-slate-950">24/7</p>
            <p class="mt-2 text-sm text-slate-600">Visibilidad de lotes y estados en tiempo real.</p>
          </div>
          <div class="rounded-3xl bg-slate-50 p-5">
            <p class="text-sm font-medium text-slate-500">Cobertura</p>
            <p class="mt-2 font-display text-3xl font-semibold text-slate-950">18 barrios</p>
            <p class="mt-2 text-sm text-slate-600">Priorización de zonas con mayor vulnerabilidad.</p>
          </div>
          <div class="rounded-3xl bg-slate-50 p-5">
            <p class="text-sm font-medium text-slate-500">Inserción productiva</p>
            <p class="mt-2 font-display text-3xl font-semibold text-slate-950">7 vacantes</p>
            <p class="mt-2 text-sm text-slate-600">Ruta demostrativa hacia empleo aliado.</p>
          </div>
        </div>
      </article>

      <article class="panel-surface p-6 sm:p-7">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-ocean-700">Aliados</p>
        <h2 class="mt-3 font-display text-3xl font-semibold text-slate-950">
          Ecosistema para escalar el piloto
        </h2>
        <div class="mt-6 space-y-3">
          <div
            v-for="ally in dashboardStore.homeContent.allies"
            :key="ally"
            class="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-700"
          >
            {{ ally }}
          </div>
        </div>
      </article>
    </section>
  </div>
</template>
