<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  rows: {
    type: Array,
    default: () => []
  },
  rowKey: {
    type: String,
    default: 'id'
  },
  emptyText: {
    type: String,
    default: 'No hay información disponible.'
  }
})
</script>

<template>
  <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200 text-left">
        <thead class="bg-slate-50/80">
          <tr>
            <th
              v-for="column in props.columns"
              :key="column.key"
              class="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <template v-if="!props.rows.length">
            <tr>
              <td
                :colspan="props.columns.length"
                class="px-5 py-10 text-center text-sm text-slate-500"
              >
                {{ props.emptyText }}
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="row in props.rows"
              :key="row[props.rowKey]"
              class="transition hover:bg-slate-50/70"
            >
              <td
                v-for="column in props.columns"
                :key="column.key"
                class="px-5 py-4 align-top text-sm text-slate-700"
              >
                <slot
                  :name="`cell-${column.key}`"
                  :row="row"
                  :value="row[column.key]"
                >
                  {{ row[column.key] }}
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
