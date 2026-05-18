<template>
  <q-page class="pieza-page">
    <!-- Fondo decorativo -->
    <div class="pieza-bg" aria-hidden="true" />

    <!-- ===== CARGANDO ===== -->
    <div v-if="cargando" class="pieza-layout">
      <div class="pieza-col-img">
        <div class="skeleton-img" />
        <div class="skeleton-caption" />
      </div>
      <div class="pieza-col-info">
        <div class="skeleton-line skeleton-line--short" />
        <div class="skeleton-line skeleton-line--title" />
        <div class="skeleton-line skeleton-line--sub" />
        <div v-for="n in 6" :key="n" class="skeleton-field" />
      </div>
    </div>

    <!-- ===== ERROR ===== -->
    <div v-else-if="error" class="pieza-empty">
      <q-icon name="error_outline" size="48px" style="color: rgba(255, 250, 244, 0.2)" />
      <p>{{ error }}</p>
      <router-link class="pieza-back-link" :to="{ name: 'catalogo' }">
        ← Volver al catálogo
      </router-link>
    </div>

    <!-- ===== CONTENIDO ===== -->
    <template v-else-if="pieza">
      <!-- Header de página -->
      <div class="pieza-header">
        <div class="pieza-header__left">
          <p class="pieza-eyebrow">FICHA DE LA PIEZA</p>
          <h1 class="pieza-page-title">Detalle del objeto</h1>
        </div>
        <button class="pieza-back-btn" @click="$router.push({ name: 'catalogo' })">
          ← Volver al catálogo
        </button>
      </div>

      <!-- Layout principal dos columnas -->
      <div class="pieza-layout">
        <!-- COL IZQUIERDA — imagen -->
        <div class="pieza-col-img">
          <div class="pieza-img-frame">
            <div class="pieza-img-lateral">
              {{ pieza.denominacion }} / {{ pieza.zonaArqueologica }} / {{ pieza.departamento }},
              {{ pieza.pais }} / {{ pieza.cronologia }} /
              {{ pieza.alto ? pieza.alto + ' cm' : '' }}
              {{ pieza.ancho ? '× ' + pieza.ancho + ' cm' : '' }}
            </div>
            <q-img
              :src="imagenes[imagenActiva]?.full || ''"
              :ratio="1"
              spinner-color="secondary"
              class="pieza-img"
              @error="imagenRota = true"
            >
              <template v-if="imagenRota" v-slot:default>
                <div class="pieza-no-img">
                  <q-icon name="image_not_supported" size="64px" />
                  <span>Sin fotografía disponible</span>
                </div>
              </template>
            </q-img>
          </div>

          <!-- Miniaturas si hay múltiples imágenes -->
          <div v-if="imagenes.length > 1" class="pieza-miniaturas">
            <div
              v-for="(img, i) in imagenes"
              :key="i"
              class="pieza-miniatura"
              :class="{ 'pieza-miniatura--activa': i === imagenActiva }"
              @click="imagenActiva = i"
            >
              <q-img :src="img.thumbnail" :ratio="1" />
            </div>
          </div>

          <!-- Caption inferior -->
          <div class="pieza-img-caption">
            <span class="pieza-img-caption__cod">COL · {{ pieza.numeroRegistro }}</span>
            <span class="pieza-img-caption__desc">Fotografía digital · MUUA</span>
          </div>
        </div>

        <!-- COL DERECHA — datos -->
        <div class="pieza-col-info">
          <p class="pieza-codigo">COL · {{ pieza.numeroRegistro }}</p>
          <h2 class="pieza-nombre">{{ pieza.denominacion || 'Sin denominación' }}</h2>
          <p class="pieza-sublinea">
            {{ [pieza.coleccion, pieza.grupoColeccion].filter(Boolean).join(' · ') }}
          </p>

          <div class="pieza-campos">
            <div class="campo">
              <p class="campo__label">TIPO DE MATERIAL</p>
              <p class="campo__valor">{{ pieza.materiales || '—' }}</p>
            </div>
            <div class="campo">
              <p class="campo__label">TIPO DE COLECCIÓN</p>
              <p class="campo__valor">{{ pieza.coleccion || '—' }}</p>
            </div>
            <div class="campo">
              <p class="campo__label">TÉCNICA DE MANUFACTURA</p>
              <p class="campo__valor">{{ pieza.tecnicaElaboracion || '—' }}</p>
            </div>
            <div class="campo">
              <p class="campo__label">TÉCNICA DE ACABADO</p>
              <p class="campo__valor">{{ pieza.tecnicaAcabado || '—' }}</p>
            </div>
            <div class="campo">
              <p class="campo__label">FECHA DE ELABORACIÓN</p>
              <p class="campo__valor">{{ pieza.cronologia || pieza.periodo || '—' }}</p>
            </div>
            <div class="campo">
              <p class="campo__label">UBICACIÓN GEOGRÁFICA</p>
              <p class="campo__valor">{{ pieza.zonaArqueologica || pieza.departamento || '—' }}</p>
            </div>
            <div class="campo">
              <p class="campo__label">MEDIDAS</p>
              <p class="campo__valor">
                <template v-if="pieza.alto || pieza.ancho">
                  {{ pieza.alto ? 'Alto: ' + pieza.alto + ' cm' : '' }}
                  {{ pieza.ancho ? ' · Ancho: ' + pieza.ancho + ' cm' : '' }}
                  {{ pieza.largo ? ' · Largo: ' + pieza.largo + ' cm' : '' }}
                </template>
                <template v-else>—</template>
              </p>
            </div>
            <div class="campo">
              <p class="campo__label">ESTADO DE CONSERVACIÓN</p>
              <p class="campo__valor">{{ pieza.categoria || '—' }}</p>
            </div>
          </div>

          <div v-if="pieza.observaciones" class="campo campo--full">
            <p class="campo__label campo__label--gold">OBSERVACIONES</p>
            <p class="campo__valor campo__valor--obs">{{ pieza.observaciones }}</p>
          </div>

          <div class="pieza-acciones">
            <button class="btn-reporte" @click="generarReporteIndividual">
              Generar reporte ICANH
            </button>
            <button class="btn-reporte btn-reporte--outline" @click="generarReportePdfIndividual">
              Reporte PDF
            </button>
          </div>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPieza, getImagenesPieza, generarReporte, generarReportePdf } from 'src/services/api'

const route = useRoute()
const pieza = ref(null)
const cargando = ref(false)
const error = ref(null)
const imagenRota = ref(false)
const imagenes = ref([])
const imagenActiva = ref(0)

async function cargarPieza() {
  cargando.value = true
  error.value = null
  try {
    const codigo = route.params.codigo
    pieza.value = await getPieza(codigo)
    imagenes.value = await getImagenesPieza(codigo)
    if (!imagenes.value.length) imagenRota.value = true
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

async function generarReportePdfIndividual() {
  if (!pieza.value) return
  await generarReportePdf([pieza.value.numeroRegistro])
}

onMounted(() => {
  cargarPieza()
})
</script>

<style scoped>
.pieza-page {
  background: #100e08;
  opacity: 0.98;
  min-height: 100vh;
  padding: 0;
  position: relative;
}

.pieza-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-image:
    radial-gradient(ellipse at 75% 25%, rgba(139, 90, 20, 0.12) 0%, transparent 55%),
    radial-gradient(ellipse at 15% 75%, rgba(80, 60, 10, 0.15) 0%, transparent 50%);
  pointer-events: none;
}

.pieza-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 3rem 120px 2rem;
}

.pieza-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 3px;
  color: #c9a84c;
  margin: 0 0 0.5rem;
}

.pieza-page-title {
  font-family: 'Playfair', serif;
  font-weight: 700;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  color: #fffaf4;
  margin: 0;
  line-height: 1;
}

.pieza-back-btn {
  font-family: 'Sagata', sans-serif;
  font-size: 0.82rem;
  color: rgba(255, 250, 244, 0.6);
  background: rgba(255, 250, 244, 0.04);
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 3px;
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.pieza-back-btn:hover {
  border-color: #c9a84c;
  color: #c9a84c;
}

.pieza-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 0 120px 4rem;
  align-items: start;
}

.pieza-col-img {
  display: flex;
  flex-direction: column;
}

.pieza-img-frame {
  position: relative;
  border: 1px solid rgba(201, 168, 76, 0.15);
  background: #fff;
  overflow: hidden;
}

.pieza-img {
  display: block;
}

.pieza-img-lateral {
  position: absolute;
  right: -1px;
  top: 0;
  bottom: 0;
  width: 22px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'Space Mono', monospace;
  font-size: 0.45rem;
  letter-spacing: 1px;
  color: #555;
  padding: 0.5rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pieza-no-img {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: #1a1810;
  color: rgba(255, 250, 244, 0.2);
  font-family: 'Sagata', sans-serif;
  font-size: 0.8rem;
}

.pieza-img-caption {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #1a1810;
  border: 1px solid rgba(201, 168, 76, 0.1);
  border-top: none;
}
.pieza-img-caption__cod {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: #c9a84c;
}
.pieza-img-caption__desc {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 1.5px;
  color: rgba(255, 250, 244, 0.3);
}

.pieza-col-info {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-top: 0.5rem;
}

.pieza-codigo {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 2.5px;
  color: #c9a84c;
  margin: 0 0 0.6rem;
}

.pieza-nombre {
  font-family: 'Playfair', serif;
  font-weight: 700;
  font-size: clamp(1.6rem, 2.5vw, 2.4rem);
  color: #fffaf4;
  margin: 0 0 0.5rem;
  line-height: 1.15;
}

.pieza-sublinea {
  font-family: 'Cormorant', serif;
  font-size: 0.95rem;
  color: rgba(255, 250, 244, 0.4);
  margin: 0 0 1.75rem;
  font-style: italic;
}

.pieza-campos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(201, 168, 76, 0.08);
  border: 1px solid rgba(201, 168, 76, 0.08);
  margin-bottom: 1px;
}

.campo {
  background: #100e08;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.campo--full {
  background: #100e08;
  border: 1px solid rgba(201, 168, 76, 0.08);
  border-top: none;
  padding: 0.85rem 1rem;
  margin-bottom: 1.75rem;
}

.campo__label {
  font-family: 'Space Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 2px;
  color: rgba(255, 250, 244, 0.35);
  margin: 0;
  text-transform: uppercase;
}
.campo__label--gold {
  color: #c9a84c;
}

.campo__valor {
  font-family: 'Cormorant', serif;
  font-weight: 600;
  font-size: 1rem;
  color: #fffaf4;
  margin: 0;
  line-height: 1.4;
}
.campo__valor--obs {
  font-weight: 400;
  font-size: 0.95rem;
  color: rgba(255, 250, 244, 0.75);
  line-height: 1.7;
}

.pieza-acciones {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-reporte {
  font-family: 'Sagata', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.5px;
  padding: 0.6rem 1.5rem;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
  background: #c9a84c;
  border: 1px solid #c9a84c;
  color: #1a1209;
  font-weight: 700;
}
.btn-reporte:hover {
  background: #b8963e;
  border-color: #b8963e;
}
.btn-reporte--outline {
  background: none;
  color: rgba(255, 250, 244, 0.65);
  border-color: rgba(201, 168, 76, 0.25);
  font-weight: 400;
}
.btn-reporte--outline:hover {
  border-color: #c9a84c;
  color: #c9a84c;
}

/* ── Skeleton ── */
.skeleton-img {
  aspect-ratio: 1;
  background: linear-gradient(90deg, #1a1810 25%, #231f14 50%, #1a1810 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
.skeleton-caption {
  height: 44px;
  background: #1a1810;
  margin-top: 1px;
}
.skeleton-line {
  height: 12px;
  border-radius: 2px;
  background: linear-gradient(90deg, #1a1810 25%, #231f14 50%, #1a1810 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  margin-bottom: 0.75rem;
  width: 100%;
}
.skeleton-line--short {
  width: 30%;
}
.skeleton-line--title {
  width: 80%;
  height: 32px;
}
.skeleton-line--sub {
  width: 55%;
}
.skeleton-field {
  height: 60px;
  border-radius: 2px;
  background: linear-gradient(90deg, #1a1810 25%, #231f14 50%, #1a1810 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  margin-bottom: 1px;
}
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* ── Empty/Error ── */
.pieza-empty {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
  font-family: 'Cormorant', serif;
  color: rgba(255, 250, 244, 0.4);
  font-size: 1.1rem;
}
.pieza-back-link {
  font-family: 'Sagata', sans-serif;
  font-size: 0.8rem;
  color: #c9a84c;
  text-decoration: none;
  border: 1px solid rgba(201, 168, 76, 0.3);
  padding: 0.4rem 1.2rem;
  border-radius: 3px;
  transition: border-color 0.2s;
}
.pieza-back-link:hover {
  border-color: #c9a84c;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .pieza-header,
  .pieza-layout {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  .pieza-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .pieza-img-lateral {
    display: none;
  }
}

/* Miniaturas */
.pieza-miniaturas {
  display: flex;
  gap: 6px;
  padding: 8px 0 0;
  flex-wrap: wrap;
}
.pieza-miniatura {
  width: 56px;
  height: 56px;
  cursor: pointer;
  border: 1px solid rgba(201,168,76,0.15);
  overflow: hidden;
  transition: border-color 0.2s;
}
.pieza-miniatura:hover {
  border-color: rgba(201,168,76,0.5);
}
.pieza-miniatura--activa {
  border-color: #C9A84C;
}
</style>
