<script setup>
import { reactive, watch } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'

const props = defineProps({
  donorOptions: {
    type: Array,
    default: () => []
  },
  donors: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['submit'])

const categoryOptions = [
  { label: 'Selecciona una categoría', value: '' },
  { label: 'Panadería', value: 'Panadería' },
  { label: 'Frutas', value: 'Frutas' },
  { label: 'Verduras', value: 'Verduras' },
  { label: 'Lácteos', value: 'Lácteos' },
  { label: 'Preparados', value: 'Preparados' },
  { label: 'Abarrotes', value: 'Abarrotes' }
]

const unitOptions = [
  { label: 'kg', value: 'kg' },
  { label: 'unidades', value: 'unidades' },
  { label: 'porciones', value: 'porciones' }
]

const priorityOptions = [
  { label: 'Selecciona prioridad', value: '' },
  { label: 'Alta', value: 'alta' },
  { label: 'Media', value: 'media' },
  { label: 'Baja', value: 'baja' }
]

const statusOptions = [
  { label: 'Disponible', value: 'available' },
  { label: 'Solicitada', value: 'requested' },
  { label: 'Asignada', value: 'assigned' }
]

const donorSelectOptions = [{ label: 'Selecciona un comercio', value: '' }, ...props.donorOptions]

const form = reactive({
  donorId: '',
  foodType: '',
  category: '',
  quantity: '',
  unit: 'kg',
  expirationDate: '',
  location: '',
  priority: '',
  observations: '',
  status: 'available'
})

watch(
  () => form.donorId,
  (value) => {
    const donor = props.donors.find((item) => item.id === value)
    if (donor) {
      form.location = `${donor.address}, ${donor.neighborhood}`
    }
  }
)

function handleSubmit() {
  emit('submit', { ...form })

  form.donorId = ''
  form.foodType = ''
  form.category = ''
  form.quantity = ''
  form.unit = 'kg'
  form.expirationDate = ''
  form.location = ''
  form.priority = ''
  form.observations = ''
  form.status = 'available'
}
</script>

<template>
  <form class="panel-surface space-y-6 p-6" @submit.prevent="handleSubmit">
    <div class="grid gap-5 md:grid-cols-2">
      <BaseSelect v-model="form.donorId" :options="donorSelectOptions" label="Comercio" required />
      <BaseInput
        v-model="form.foodType"
        label="Tipo de alimento"
        placeholder="Ej. Canastilla de verduras"
        required
      />
      <BaseSelect v-model="form.category" :options="categoryOptions" label="Categoría" required />
      <div class="grid grid-cols-[1fr_140px] gap-3">
        <BaseInput
          v-model="form.quantity"
          type="number"
          min="1"
          label="Cantidad"
          placeholder="0"
          required
        />
        <BaseSelect v-model="form.unit" :options="unitOptions" label="Unidad" />
      </div>
      <BaseInput
        v-model="form.expirationDate"
        type="date"
        label="Fecha próxima de vencimiento"
        required
      />
      <BaseInput
        v-model="form.location"
        label="Ubicación"
        placeholder="Dirección o referencia"
        required
      />
      <BaseSelect v-model="form.priority" :options="priorityOptions" label="Prioridad" required />
      <BaseSelect v-model="form.status" :options="statusOptions" label="Estado inicial" />
    </div>

    <label class="block space-y-2">
      <span class="text-sm font-semibold text-slate-700">Observaciones</span>
      <textarea
        v-model="form.observations"
        rows="4"
        class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-soft outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
        placeholder="Condiciones del lote, horarios o recomendaciones logísticas"
      ></textarea>
    </label>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm text-slate-500">
        La información se guarda en Pinia y se persiste localmente para la demo.
      </p>
      <BaseButton type="submit" size="lg">Registrar donación</BaseButton>
    </div>
  </form>
</template>
