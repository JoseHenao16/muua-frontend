<!-- src/pages/CatalogoPage.vue -->
<template>
  <q-page class="q-pa-md">

    <!-- Encabezado del catálogo -->
    <div class="row items-center q-mb-lg">
      <div class="col">
        <div class="text-h5 text-weight-bold">Catálogo Virtual</div>
        <div class="text-caption text-grey-6">
          {{ total.toLocaleString('es-CO') }} piezas registradas · Hoja ICANH
        </div>
      </div>
    </div>

    <div class="row q-col-gutter-md">

      <!-- Panel de filtros — columna izquierda -->
      <div class="col-12 col-md-3">
        <FiltroCatalogo
          @filtrar="store.setFiltro"
          @buscar="store.buscar"
          @limpiar="store.limpiarFiltros"
        />
      </div>

      <!-- Grilla de piezas — columna derecha -->
      <div class="col-12 col-md-9">

        <!-- Estado de carga -->
        <div v-if="cargando" class="row q-col-gutter-md">
          <div
            v-for="n in 12"
            :key="n"
            class="col-12 col-sm-6 col-lg-4"
          >
            <q-card flat bordered>
              <q-skeleton height="180px" square />
              <q-card-section>
                <q-skeleton type="text" width="60%" />
                <q-skeleton type="text" class="q-mt-xs" />
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Estado de error -->
        <div v-else-if="error" class="column items-center q-py-xl text-grey-6">
          <q-icon name="wifi_off" size="64px" class="q-mb-md" />
          <div class="text-subtitle1">{{ error }}</div>
          <q-btn
            flat
            color="primary"
            label="Reintentar"
            class="q-mt-md"
            @click="store.cargarPiezas"
          />
        </div>

        <!-- Sin resultados -->
        <div
          v-else-if="piezas.length === 0"
          class="column items-center q-py-xl text-grey-6"
        >
          <q-icon name="search_off" size="64px" class="q-mb-md" />
          <div class="text-subtitle1">No se encontraron piezas</div>
          <div class="text-caption">Intenta con otros filtros</div>
        </div>

        <!-- Grilla de tarjetas -->
        <div v-else class="row q-col-gutter-md">
          <div
            v-for="pieza in piezas"
            :key="pieza.numeroRegistro"
            class="col-12 col-sm-6 col-lg-4"
          >
            <TarjetaPieza :pieza="pieza" />
          </div>
        </div>

        <!-- Paginación -->
        <div
          v-if="totalPaginas > 1"
          class="row justify-center q-mt-lg"
        >
          <q-pagination
            v-model="paginaActual"
            :max="totalPaginas"
            :max-pages="7"
            boundary-numbers
            color="primary"
            @update:model-value="cambiarPagina"
          />
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCatalogoStore } from 'src/stores/catalogo'
import TarjetaPieza from 'src/components/TarjetaPieza.vue'
import FiltroCatalogo from 'src/components/FiltroCatalogo.vue'

const store = useCatalogoStore()
const { piezas, total, cargando, error, filtros } = storeToRefs(store)

// Página actual ligada al store
const paginaActual = computed({
  get: () => filtros.value.page,
  set: (val) => { filtros.value.page = val }
})

// Total de páginas calculado
const totalPaginas = computed(() => {
  return Math.ceil(total.value / filtros.value.limit)
})

function cambiarPagina(pagina) {
  store.setFiltro('page', pagina)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Cargar al montar la página
onMounted(() => {
  store.cargarPiezas()
})
</script>
