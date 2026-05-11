<!-- src/components/FiltroCatalogo.vue -->
<template>
  <q-card flat bordered class="q-pa-md">
    <div class="text-subtitle1 text-weight-bold q-mb-md">
      <q-icon name="filter_list" class="q-mr-xs" />
      Filtros
    </div>

    <!-- Búsqueda libre -->
    <q-input
      v-model="busqueda"
      outlined
      dense
      label="Buscar por denominación..."
      clearable
      class="q-mb-md"
      @update:model-value="onBuscar"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- Filtro Colección -->
    <q-select
      v-model="filtrosLocales.coleccion"
      :options="opcionesColeccion"
      :loading="cargandoOpciones"
      outlined
      dense
      clearable
      label="Colección"
      class="q-mb-sm"
      @update:model-value="(val) => emit('filtrar', 'coleccion', val || '')"
    />

    <!-- Filtro Área -->
    <q-select
      v-model="filtrosLocales.area"
      :options="opcionesArea"
      :loading="cargandoOpciones"
      outlined
      dense
      clearable
      label="Área"
      class="q-mb-sm"
      @update:model-value="(val) => emit('filtrar', 'area', val || '')"
    />

    <!-- Filtro Cultura -->
    <q-select
      v-model="filtrosLocales.cultura"
      :options="opcionesCultura"
      :loading="cargandoOpciones"
      outlined
      dense
      clearable
      label="Cultura"
      class="q-mb-sm"
      @update:model-value="(val) => emit('filtrar', 'cultura', val || '')"
    />

    <!-- Filtro Periodo -->
    <q-select
      v-model="filtrosLocales.periodo"
      :options="opcionesPeriodo"
      :loading="cargandoOpciones"
      outlined
      dense
      clearable
      label="Periodo"
      class="q-mb-md"
      @update:model-value="(val) => emit('filtrar', 'periodo', val || '')"
    />

    <!-- Botón limpiar -->
    <q-btn
      flat
      color="grey-7"
      label="Limpiar filtros"
      icon="clear_all"
      class="full-width"
      @click="limpiar"
    />
  </q-card>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { getEstadisticas } from 'src/services/api'

const emit = defineEmits(['filtrar', 'buscar', 'limpiar'])

const busqueda = ref('')
const cargandoOpciones = ref(false)

const filtrosLocales = reactive({
  coleccion: null,
  area: null,
  cultura: null,
  periodo: null,
})

// Opciones dinámicas desde el backend
const opcionesColeccion = ref([])
const opcionesArea = ref([])
const opcionesCultura = ref([])
const opcionesPeriodo = ref([])

// Convierte objeto { "Clave": 5, "Otra": 3 } → ['Clave', 'Otra'] ordenado por frecuencia
function objetoAOpciones(obj) {
  return Object.entries(obj)
    .filter(([key]) => key && key !== 'Sin clasificar')
    .sort((a, b) => b[1] - a[1]) // más frecuentes primero
    .map(([key]) => key)
}

async function cargarOpciones() {
  cargandoOpciones.value = true
  try {
    const stats = await getEstadisticas()
    opcionesColeccion.value = objetoAOpciones(stats.porColeccion || {})
    opcionesArea.value = objetoAOpciones(stats.porArea || {})
    opcionesCultura.value = objetoAOpciones(stats.porCultura || {})
    opcionesPeriodo.value = objetoAOpciones(stats.porPeriodo || {})
  } catch (e) {
    console.error('Error cargando opciones de filtro:', e)
  } finally {
    cargandoOpciones.value = false
  }
}

const onBuscar = useDebounceFn((valor) => {
  emit('buscar', valor || '')
}, 400)

function limpiar() {
  busqueda.value = ''
  filtrosLocales.coleccion = null
  filtrosLocales.area = null
  filtrosLocales.cultura = null
  filtrosLocales.periodo = null
  emit('limpiar')
}

onMounted(() => {
  cargarOpciones()
})
</script>
