<!-- src/components/FiltroCatalogo.vue -->
<template>
  <div class="filtro-wrap">

    <div class="filtro-grid">
      <!-- Colección -->
      <div class="filtro-field">
        <label class="filtro-label">Colección</label>
        <div class="filtro-select-wrap">
          <select
            v-model="filtrosLocales.coleccion"
            class="filtro-select"
            :disabled="cargandoOpciones"
            @change="(e) => emit('filtrar', 'coleccion', e.target.value)"
          >
            <option value="">Todas</option>
            <option v-for="op in opcionesColeccion" :key="op" :value="op">{{ op }}</option>
          </select>
          <q-icon name="expand_more" class="filtro-select-icon" />
        </div>
      </div>

      <!-- Área -->
      <div class="filtro-field">
        <label class="filtro-label">Área de material</label>
        <div class="filtro-select-wrap">
          <select
            v-model="filtrosLocales.area"
            class="filtro-select"
            :disabled="cargandoOpciones"
            @change="(e) => emit('filtrar', 'area', e.target.value)"
          >
            <option value="">Todas</option>
            <option v-for="op in opcionesArea" :key="op" :value="op">{{ op }}</option>
          </select>
          <q-icon name="expand_more" class="filtro-select-icon" />
        </div>
      </div>

      <!-- Cultura -->
      <div class="filtro-field">
        <label class="filtro-label">Cultura</label>
        <div class="filtro-select-wrap">
          <select
            v-model="filtrosLocales.cultura"
            class="filtro-select"
            :disabled="cargandoOpciones"
            @change="(e) => emit('filtrar', 'cultura', e.target.value)"
          >
            <option value="">Todas</option>
            <option v-for="op in opcionesCultura" :key="op" :value="op">{{ op }}</option>
          </select>
          <q-icon name="expand_more" class="filtro-select-icon" />
        </div>
      </div>

      <!-- Periodo -->
      <div class="filtro-field">
        <label class="filtro-label">Periodo histórico</label>
        <div class="filtro-select-wrap">
          <select
            v-model="filtrosLocales.periodo"
            class="filtro-select"
            :disabled="cargandoOpciones"
            @change="(e) => emit('filtrar', 'periodo', e.target.value)"
          >
            <option value="">Todos</option>
            <option v-for="op in opcionesPeriodo" :key="op" :value="op">{{ op }}</option>
          </select>
          <q-icon name="expand_more" class="filtro-select-icon" />
        </div>
      </div>
    </div>

    <!-- Limpiar -->
    <button class="filtro-limpiar" @click="limpiar">
      <q-icon name="close" size="14px" />
      Limpiar filtros
    </button>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { getEstadisticas } from 'src/services/api'

const emit = defineEmits(['filtrar', 'buscar', 'limpiar'])

const cargandoOpciones = ref(false)
const filtrosLocales = reactive({ coleccion: '', area: '', cultura: '', periodo: '' })

const opcionesColeccion = ref([])
const opcionesArea      = ref([])
const opcionesCultura   = ref([])
const opcionesPeriodo   = ref([])

function objetoAOpciones(obj) {
  return Object.entries(obj)
    .filter(([key]) => key && key !== 'Sin clasificar')
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)
}

async function cargarOpciones() {
  cargandoOpciones.value = true
  try {
    const stats = await getEstadisticas()
    opcionesColeccion.value = objetoAOpciones(stats.porColeccion || {})
    opcionesArea.value      = objetoAOpciones(stats.porArea      || {})
    opcionesCultura.value   = objetoAOpciones(stats.porCultura   || {})
    opcionesPeriodo.value   = objetoAOpciones(stats.porPeriodo   || {})
  } catch (e) {
    console.error('Error cargando opciones de filtro:', e)
  } finally {
    cargandoOpciones.value = false
  }
}

function limpiar() {
  filtrosLocales.coleccion = ''
  filtrosLocales.area      = ''
  filtrosLocales.cultura   = ''
  filtrosLocales.periodo   = ''
  emit('limpiar')
}

onMounted(() => { cargarOpciones() })
</script>

<style scoped>
.filtro-wrap {
  background: rgba(255,250,244,0.03);
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: 4px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.filtro-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.filtro-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filtro-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 2px;
  color: rgba(255,250,244,0.35);
  text-transform: uppercase;
}

.filtro-select-wrap {
  position: relative;
}

.filtro-select {
  width: 100%;
  appearance: none;
  background: rgba(255,250,244,0.04);
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 3px;
  padding: 0.45rem 2rem 0.45rem 0.75rem;
  font-family: 'Sagata', sans-serif;
  font-size: 0.82rem;
  color: rgba(255,250,244,0.7);
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}
.filtro-select:focus {
  border-color: rgba(201,168,76,0.5);
}
.filtro-select:disabled {
  opacity: 0.4;
  cursor: default;
}
.filtro-select option {
  background: #1a1810;
  color: #FFFAF4;
}

.filtro-select-icon {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(201,168,76,0.4);
  font-size: 16px;
  pointer-events: none;
}

.filtro-limpiar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Sagata', sans-serif;
  font-size: 0.75rem;
  color: rgba(255,250,244,0.3);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
  align-self: flex-start;
}
.filtro-limpiar:hover { color: #C9A84C; }

@media (max-width: 768px) {
  .filtro-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .filtro-grid { grid-template-columns: 1fr; }
}
</style>
