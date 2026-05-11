<!-- src/pages/PiezaPage.vue -->
<template>
  <q-page class="q-pa-md">

    <!-- Cargando -->
    <div v-if="cargando" class="row q-col-gutter-md">
      <div class="col-12 col-md-5">
        <q-skeleton height="400px" />
      </div>
      <div class="col-12 col-md-7">
        <q-skeleton type="text" width="40%" class="q-mb-sm" />
        <q-skeleton type="text" width="70%" class="q-mb-md" />
        <q-skeleton type="text" v-for="n in 8" :key="n" class="q-mb-sm" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="column items-center q-py-xl text-grey-6">
      <q-icon name="error_outline" size="64px" class="q-mb-md" />
      <div class="text-subtitle1">{{ error }}</div>
      <q-btn flat color="primary" label="Volver al catálogo" class="q-mt-md" :to="{ name: 'catalogo' }" />
    </div>

    <!-- Contenido -->
    <div v-else-if="pieza">

      <!-- Breadcrumb -->
      <div class="row items-center q-mb-md">
        <q-btn flat dense icon="arrow_back" label="Volver al catálogo" :to="{ name: 'catalogo' }" color="grey-7" />
      </div>

      <div class="row q-col-gutter-lg">

        <!-- Columna izquierda — imagen -->
        <div class="col-12 col-md-5">
          <q-card flat bordered>
            <q-img
              :src="imagenUrl"
              :ratio="1"
              spinner-color="primary"
            >
              <template v-if="imagenRota" v-slot:default>
                <div class="absolute-full flex flex-center bg-grey-2 text-grey-5 column">
                  <q-icon name="image_not_supported" size="80px" />
                  <div class="text-caption q-mt-sm">Sin fotografía disponible</div>
                </div>
              </template>
            </q-img>
            <q-card-section class="text-center text-caption text-grey-6">
              Reg. {{ pieza.numeroRegistro }} · Fotografía digital MUUA
            </q-card-section>
          </q-card>
        </div>

        <!-- Columna derecha — datos -->
        <div class="col-12 col-md-7">

          <!-- Encabezado -->
          <div class="text-caption text-grey-6 q-mb-xs">{{ pieza.numeroRegistro }}</div>
          <div class="text-h5 text-weight-bold q-mb-xs">{{ pieza.denominacion || 'Sin denominación' }}</div>
          <div class="text-subtitle2 text-grey-6 q-mb-md">{{ pieza.coleccion }} · {{ pieza.grupoColeccion }}</div>

          <!-- Chips de clasificación -->
          <div class="row q-gutter-xs q-mb-lg">
            <q-chip v-if="pieza.area" color="primary" text-color="white" icon="place" :label="pieza.area" />
            <q-chip v-if="pieza.subarea" outline color="primary" :label="pieza.subarea" />
            <q-chip v-if="pieza.cultura" color="secondary" text-color="white" icon="group" :label="pieza.cultura" />
            <q-chip v-if="pieza.periodo" outline color="secondary" :label="pieza.periodo" />
          </div>

          <!-- Sección: Descripción -->
          <div class="text-subtitle2 text-weight-bold q-mb-sm">Descripción</div>
          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-6"><CampoDetalle label="Forma" :valor="pieza.forma" /></div>
            <div class="col-6"><CampoDetalle label="Categoría conservación" :valor="pieza.categoria" /></div>
            <div class="col-12"><CampoDetalle label="Observaciones" :valor="pieza.observaciones" /></div>
          </div>

          <!-- Sección: Procedencia -->
          <div class="text-subtitle2 text-weight-bold q-mb-sm">Procedencia</div>
          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-6"><CampoDetalle label="Zona arqueológica" :valor="pieza.zonaArqueologica" /></div>
            <div class="col-6"><CampoDetalle label="Cultura" :valor="pieza.cultura" /></div>
            <div class="col-6"><CampoDetalle label="Periodo" :valor="pieza.periodo" /></div>
            <div class="col-6"><CampoDetalle label="Cronología" :valor="pieza.cronologia" /></div>
            <div class="col-6"><CampoDetalle label="Departamento" :valor="pieza.departamento" /></div>
            <div class="col-6"><CampoDetalle label="País" :valor="pieza.pais" /></div>
          </div>

          <!-- Sección: Materialidad -->
          <div class="text-subtitle2 text-weight-bold q-mb-sm">Materialidad</div>
          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-6"><CampoDetalle label="Materiales" :valor="pieza.materiales" /></div>
            <div class="col-6"><CampoDetalle label="Técnica elaboración" :valor="pieza.tecnicaElaboracion" /></div>
            <div class="col-6"><CampoDetalle label="Técnica decoración" :valor="pieza.tecnicaDecoracion" /></div>
            <div class="col-6"><CampoDetalle label="Técnica acabado" :valor="pieza.tecnicaAcabado" /></div>
          </div>

          <!-- Sección: Medidas -->
          <div class="text-subtitle2 text-weight-bold q-mb-sm">Medidas ({{ pieza.unidadMedida }})</div>
          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-4"><CampoDetalle label="Alto" :valor="pieza.alto" /></div>
            <div class="col-4"><CampoDetalle label="Ancho" :valor="pieza.ancho" /></div>
            <div class="col-4"><CampoDetalle label="Largo" :valor="pieza.largo" /></div>
            <div class="col-4"><CampoDetalle label="Profundidad" :valor="pieza.profundidad" /></div>
            <div class="col-4"><CampoDetalle label="Peso (g)" :valor="pieza.peso" /></div>
          </div>

          <!-- Botón reporte -->
          <q-btn
            color="primary"
            icon="download"
            label="Generar reporte ICANH"
            class="q-mt-sm"
            @click="generarReporteIndividual"
          />

        </div>
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPieza, getImagenUrl, generarReporte } from 'src/services/api'
import CampoDetalle from 'src/components/CampoDetalle.vue'

const route = useRoute()
const pieza = ref(null)
const cargando = ref(false)
const error = ref(null)
const imagenRota = ref(false)

const imagenUrl = computed(() => {
  if (!pieza.value) return ''
  return getImagenUrl(pieza.value.numeroRegistro)
})

async function cargarPieza() {
  cargando.value = true
  error.value = null
  try {
    const codigo = route.params.codigo
    pieza.value = await getPieza(codigo)
  } catch (e) {
    error.value = 'No se encontró la pieza solicitada.'
    console.error(e)
  } finally {
    cargando.value = false
  }
}

async function generarReporteIndividual() {
  if (!pieza.value) return
  await generarReporte([pieza.value.numeroRegistro])
}

onMounted(() => {
  cargarPieza()
})
</script>
