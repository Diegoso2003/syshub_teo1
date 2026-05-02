<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  totalItems: number
  itemsPorPagina?: number
  paginaActual?: number
}>(), {
  itemsPorPagina: 20,
  paginaActual: 1
})

const emit = defineEmits<{
  'update:paginaActual': [pagina: number]
  'pagCambio': [pagina: number]
}>()

const totalPaginas = computed(() => Math.ceil(props.totalItems / props.itemsPorPagina))

const paginasVisibles = computed(() => {
  const paginas: number[] = []
  const inicio = Math.max(1, props.paginaActual - 2)
  const fin = Math.min(totalPaginas.value, props.paginaActual + 2)

  for (let i = inicio; i <= fin; i++) {
    paginas.push(i)
  }

  return paginas
})

function irAPagina(page: number) {
  if (page < 1 || page > totalPaginas.value) return
  emit('update:paginaActual', page)
  emit('pagCambio', page)
}
</script>
<template>
  <ul v-if="totalPaginas > 1" class="flex justify-center gap-1">
    <li>
      <button @click="irAPagina(paginaActual - 1)" :disabled="paginaActual === 1"
        class="grid size-8 place-content-center rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
        ◀
      </button>
    </li>

    <li v-if="paginaActual > 3">
      <button @click="irAPagina(1)" class="block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium hover:bg-gray-50">
        1
      </button>
    </li>

    <li v-if="paginaActual > 4" class="grid size-8 place-content-center text-gray-400">
      ...
    </li>

    <li v-for="pagina in paginasVisibles" :key="pagina">
      <button
        v-if="pagina === paginaActual"
        class="block size-8 rounded border border-indigo-600 bg-indigo-600 text-center text-sm/8 font-medium text-white"
      >
        {{ pagina }}
      </button>
      
      <button
        v-else
        @click="irAPagina(pagina)"
        class="block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium hover:bg-gray-50"
      >
        {{ pagina }}
      </button>
    </li>

    <li v-if="paginaActual < totalPaginas - 3" class="grid size-8 place-content-center text-gray-400">
      ...
    </li>

    <li v-if="paginaActual < totalPaginas - 2">
      <button @click="irAPagina(totalPaginas)" class="block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium hover:bg-gray-50">
        {{ totalPaginas }}
      </button>
    </li>

    <li>
      <button @click="irAPagina(paginaActual + 1)" :disabled="paginaActual === totalPaginas"
        class="grid size-8 place-content-center rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
        ▶
      </button>
    </li>
  </ul>
</template>