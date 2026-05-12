<template>
  <q-page class="catalogo-page">

    <div class="catalogo-bg" aria-hidden="true" />

    <div class="catalogo-header">
      <div class="catalogo-header__left">
        <p class="catalogo-eyebrow">EXPLORAR COLECCIÓN</p>
        <h1 class="catalogo-title">Catálogo Virtual</h1>
      </div>
      <div class="catalogo-header__right">
        <span class="catalogo-meta">
          {{ total.toLocaleString('es-CO') }} piezas · Actualizado 2026
        </span>
      </div>
    </div>

    <div class="search-bar-wrap">
      <div class="search-bar">
        <q-icon name="search" class="search-icon" />
        <input
          v-model="busquedaLocal"
          class="search-input"
          placeholder="Búsqueda... Ingrese la información aquí"
          @input="onBuscar"
        />
      </div>
      <button class="search-filter-btn" @click="mostrarFiltros = !mostrarFiltros" aria-label="Filtros">
        <q-icon name="tune" size="20px" />
      </button>
    </div>

    <div class="filtros-chips">
      <button
        v-for="chip in chipsRapidos"
        :key="chip.value"
        class="chip"
        :class="{ 'chip--active': chipActivo === chip.value }"
        @click="toggleChip(chip)"
      >
        {{ chip.label }}
      </button>
    </div>

    <transition name="slide-down">
      <div v-if="mostrarFiltros" class="filtros-avanzados">
        <FiltroCatalogo
          @filtrar="store.setFiltro"
          @buscar="store.buscar"
          @limpiar="limpiarTodo"
        />
      </div>
    </transition>

    <div class="catalogo-grid-wrap">
      <div v-if="cargando" class="catalogo-grid">
        <div v-for="n in 9" :key="n" class="tarjeta-skeleton">
          <div class="skeleton-img" />
          <div class="skeleton-body">
            <div class="skeleton-line skeleton-line--short" />
            <div class="skeleton-line" />
            <div class="skeleton-line skeleton-line--chips" />
          </div>
        </div>
      </div>

      <div v-else-if="error" class="catalogo-empty">
        <q-icon name="wifi_off" size="48px" style="color: rgba(255,250,244,0.2)" />
        <p>{{ error }}</p>
        <button class="btn-reintentar" @click="store.cargarPiezas">Reintentar</button>
      </div>

      <div v-else-if="piezas.length === 0" class="catalogo-empty">
        <q-icon name="search_off" size="48px" style="color: rgba(255,250,244,0.2)" />
        <p>No se encontraron piezas</p>
        <span>Intenta con otros filtros</span>
      </div>

      <div v-else class="catalogo-grid">
        <TarjetaPieza
          v-for="pieza in piezas"
          :key="pieza.numeroRegistro"
          :pieza="pieza"
        />
      </div>
    </div>

    <div v-if="totalPaginas > 1" class="paginacion">
      <button class="pag-btn" :disabled="paginaActual <= 1" @click="cambiarPagina(paginaActual - 1)">‹</button>
      <template v-for="p in paginasVisibles" :key="p">
        <span v-if="p === '...'" class="pag-dots">…</span>
        <button
          v-else
          class="pag-btn pag-btn--num"
          :class="{ 'pag-btn--active': p === paginaActual }"
          @click="cambiarPagina(p)"
        >{{ p }}</button>
      </template>
      <button class="pag-btn" :disabled="paginaActual >= totalPaginas" @click="cambiarPagina(paginaActual + 1)">›</button>
    </div>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDebounceFn } from '@vueuse/core'
import { useCatalogoStore } from 'src/stores/catalogo'
import TarjetaPieza from 'src/components/TarjetaPieza.vue'
import FiltroCatalogo from 'src/components/FiltroCatalogo.vue'

const store = useCatalogoStore()
const { piezas, total, cargando, error, filtros } = storeToRefs(store)

const mostrarFiltros = ref(false)
const busquedaLocal  = ref('')
const chipActivo     = ref('todos')

const chipsRapidos = [
  { label: 'Todos',         value: 'todos',       filtro: null,        valor: '' },
  { label: 'Cerámica',      value: 'ceramica',    filtro: 'area',      valor: 'Cerámica' },
  { label: 'Lítico',        value: 'litico',      filtro: 'area',      valor: 'Lítico' },
  { label: 'Orfebrería',    value: 'orfebreria',  filtro: 'area',      valor: 'Orfebrería' },
  { label: 'Textil',        value: 'textil',      filtro: 'area',      valor: 'Textil' },
  { label: 'Antropomorfo',  value: 'antropomorfo',filtro: 'cultura',   valor: 'Antropomorfo' },
  { label: 'Zoomorfo',      value: 'zoomorfo',    filtro: 'cultura',   valor: 'Zoomorfo' },
  { label: 'Región Andina', value: 'andina',      filtro: 'coleccion', valor: 'Región Andina' },
  { label: 'Cauca Medio',   value: 'cauca',       filtro: 'coleccion', valor: 'Cauca Medio' },
  { label: '1800 – 1900',   value: 'periodo1800', filtro: 'periodo',   valor: '1800 – 1900' },
]

function toggleChip(chip) {
  if (chipActivo.value === chip.value) {
    chipActivo.value = 'todos'
    store.limpiarFiltros()
  } else {
    chipActivo.value = chip.value
    if (chip.filtro) store.setFiltro(chip.filtro, chip.valor)
    else store.limpiarFiltros()
  }
}

const onBuscar = useDebounceFn(() => { store.buscar(busquedaLocal.value) }, 400)

function limpiarTodo() {
  busquedaLocal.value = ''
  chipActivo.value = 'todos'
  store.limpiarFiltros()
}

const paginaActual = computed({
  get: () => filtros.value.page,
  set: (val) => { filtros.value.page = val }
})
const totalPaginas = computed(() => Math.ceil(total.value / filtros.value.limit))

function cambiarPagina(p) {
  store.setFiltro('page', p)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const paginasVisibles = computed(() => {
  const tot = totalPaginas.value
  const cur = paginaActual.value
  if (tot <= 7) return Array.from({ length: tot }, (_, i) => i + 1)
  const pages = [1]
  if (cur > 3) pages.push('...')
  for (let i = Math.max(2, cur - 1); i <= Math.min(tot - 1, cur + 1); i++) pages.push(i)
  if (cur < tot - 2) pages.push('...')
  pages.push(tot)
  return pages
})

onMounted(() => { store.cargarPiezas() })
</script>

<style scoped>
.catalogo-page {
  background: #100e08;
  opacity: 0.98;
  min-height: 100vh;
  padding: 0;
  position: relative;
}

.catalogo-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-image:
    radial-gradient(ellipse at 80% 20%, rgba(139,90,20,0.12) 0%, transparent 55%),
    radial-gradient(ellipse at 10% 80%, rgba(80,60,10,0.15) 0%, transparent 50%);
  pointer-events: none;
}

.catalogo-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 3rem 120px 1.5rem;
}
.catalogo-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 3px;
  color: #C9A84C;
  margin: 0 0 0.5rem;
}
.catalogo-title {
  font-family: 'Playfair', serif;
  font-weight: 700;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  color: #FFFAF4;
  margin: 0;
  line-height: 1;
}
.catalogo-meta {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: #C9A84C;
}

.search-bar-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 120px 1.25rem;
}
.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  background: rgba(255,250,244,0.05);
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 4px;
  padding: 0 1rem;
  height: 48px;
  transition: border-color 0.2s;
}
.search-bar:focus-within { border-color: rgba(201,168,76,0.5); }
.search-icon {
  color: rgba(255,250,244,0.3);
  margin-right: 0.75rem;
  flex-shrink: 0;
}
.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: 'Cormorant', serif;
  font-size: 1rem;
  color: #FFFAF4;
  caret-color: #C9A84C;
}
.search-input::placeholder { color: rgba(255,250,244,0.3); }
.search-filter-btn {
  width: 48px;
  height: 48px;
  background: rgba(255,250,244,0.05);
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 4px;
  color: rgba(255,250,244,0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.2s, color 0.2s;
}
.search-filter-btn:hover { border-color: #C9A84C; color: #C9A84C; }

.filtros-chips {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0 120px 1.75rem;
}
.chip {
  font-family: 'Sagata', sans-serif;
  font-size: 0.8rem;
  padding: 0.35rem 1rem;
  border-radius: 3px;
  border: 1px solid rgba(201,168,76,0.25);
  background: rgba(255,250,244,0.04);
  color: rgba(255,250,244,0.6);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.chip:hover { border-color: rgba(201,168,76,0.5); color: #FFFAF4; }
.chip--active { background: #C9A84C; border-color: #C9A84C; color: #1a1209; font-weight: 700; }

.filtros-avanzados {
  position: relative;
  z-index: 1;
  padding: 0 120px 1.5rem;
  overflow: hidden;
}
.slide-down-enter-active,
.slide-down-leave-active { transition: max-height 0.35s ease, opacity 0.35s ease; max-height: 500px; }
.slide-down-enter-from,
.slide-down-leave-to    { max-height: 0; opacity: 0; }

.catalogo-grid-wrap {
  position: relative;
  z-index: 1;
  padding: 0 120px;
}
.catalogo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.08);
}

.tarjeta-skeleton { background: #100e08; }
.skeleton-img {
  width: 100%;
  aspect-ratio: 4/3;
  background: linear-gradient(90deg, #1a1810 25%, #231f14 50%, #1a1810 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
.skeleton-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
.skeleton-line {
  height: 12px;
  border-radius: 2px;
  background: linear-gradient(90deg, #1a1810 25%, #231f14 50%, #1a1810 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  width: 100%;
}
.skeleton-line--short { width: 40%; }
.skeleton-line--chips { width: 65%; height: 22px; }
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.catalogo-empty {
  text-align: center;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Cormorant', serif;
  color: rgba(255,250,244,0.4);
  font-size: 1.1rem;
}
.btn-reintentar {
  margin-top: 0.5rem;
  font-family: 'Sagata', sans-serif;
  font-size: 0.8rem;
  padding: 0.4rem 1.2rem;
  border: 1px solid rgba(201,168,76,0.3);
  background: none;
  color: #C9A84C;
  border-radius: 3px;
  cursor: pointer;
}

.paginacion {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 2.5rem 120px;
  border-top: 1px solid rgba(201,168,76,0.08);
}
.pag-btn {
  width: 36px;
  height: 36px;
  border-radius: 3px;
  border: 1px solid rgba(201,168,76,0.2);
  background: none;
  color: rgba(255,250,244,0.5);
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.pag-btn:hover:not(:disabled) { border-color: #C9A84C; color: #C9A84C; }
.pag-btn:disabled { opacity: 0.25; cursor: default; }
.pag-btn--active {
  background: #C9A84C !important;
  border-color: #C9A84C !important;
  color: #1a1209 !important;
  font-weight: 700;
}
.pag-dots {
  color: rgba(255,250,244,0.25);
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  padding: 0 0.25rem;
}

@media (max-width: 900px) {
  .catalogo-header,
  .search-bar-wrap,
  .filtros-chips,
  .filtros-avanzados,
  .catalogo-grid-wrap,
  .paginacion { padding-left: 1.5rem; padding-right: 1.5rem; }
  .catalogo-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 540px) {
  .catalogo-grid { grid-template-columns: 1fr; }
}
</style>
