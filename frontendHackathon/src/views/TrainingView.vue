<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseSelect from '@/components/common/BaseSelect.vue'
import StatCard from '@/components/common/StatCard.vue'
import CourseCard from '@/components/training/CourseCard.vue'
import { useTrainingStore } from '@/stores/trainingStore'

const trainingStore = useTrainingStore()
const selectedCategory = ref('all')
const feedback = ref('')

const categories = computed(() => [
  { label: 'Todas las rutas', value: 'all' },
  ...new Set(trainingStore.courses.map((course) => course.category))
].map((item) =>
  typeof item === 'string'
    ? {
        label: item,
        value: item
      }
    : item
))

const visibleCourses = computed(() =>
  trainingStore.courses.filter((course) =>
    selectedCategory.value === 'all' ? true : course.category === selectedCategory.value
  )
)

function handleEnroll(courseId) {
  const result = trainingStore.enroll(courseId)
  feedback.value = result
    ? 'Inscripción realizada correctamente. El siguiente paso del demo está en Empresas aliadas.'
    : 'La inscripción ya estaba registrada.'
}
</script>

<template>
  <div class="page-shell">
    <section class="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Cursos activos"
        :value="trainingStore.courses.length"
        hint="Oferta disponible para inclusión productiva"
        accent="brand"
      />
      <StatCard
        title="Inscripciones simuladas"
        :value="trainingStore.enrollmentCount"
        hint="Persistidas localmente para la demo"
        accent="ocean"
      />
      <StatCard
        title="Modalidades mixtas"
        :value="trainingStore.courses.filter((course) => course.modality.includes('Mixta')).length"
        hint="Opciones flexibles para participación"
        accent="amber"
      />
    </section>

    <section class="panel-surface p-6">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Formación</p>
          <h2 class="mt-2 section-title">Catálogo de cursos</h2>
          <p class="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            La plataforma no solo distribuye alimentos: también acompaña la transición hacia empleabilidad con formación básica accesible.
          </p>
        </div>
        <div class="w-full max-w-sm">
          <BaseSelect v-model="selectedCategory" :options="categories" label="Filtrar por ruta" />
        </div>
      </div>

      <div v-if="feedback" class="mt-6 rounded-3xl border border-brand-100 bg-brand-50 px-5 py-4 text-sm text-brand-900">
        {{ feedback }}
      </div>

      <div class="mt-6 grid gap-5 xl:grid-cols-2">
        <CourseCard
          v-for="course in visibleCourses"
          :key="course.id"
          :course="course"
          :enrolled="trainingStore.isEnrolled(course.id)"
          @enroll="handleEnroll"
        />
      </div>

      <RouterLink
        to="/companies"
        class="mt-6 inline-flex items-center rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-ocean-300 hover:text-ocean-700"
      >
        Continuar a empresas aliadas
      </RouterLink>
    </section>
  </div>
</template>
