<!-- src/pages/IndexPage.vue -->
<template>
  <q-page>
    <!-- ===== HERO ===== -->
    <section class="hero-section">
      <div class="hero-overlay" />
      <div class="hero-content">
        <div class="row items-center full-width">
          <!-- Texto izquierda -->
          <div class="col-12 col-md-6 q-pa-xl">
            <div class="text-caption text-gold letter-spacing q-mb-sm">
              COLECCIÓN DIGITAL · MUUA
            </div>
            <h1 class="hero-title q-mb-md">
              COLECCIÓN DE<br />
              <span class="text-gold font-italic">ANTROPOLOGÍA</span>
            </h1>
            <p class="hero-subtitle q-mb-xl">
              Conectando conocimiento y patrimonio: una experiencia digital para descubrir, explorar
              y consultar la colección arqueológica del Museo Universitario de la Universidad de
              Antioquia.
            </p>
            <div class="row q-gutter-md">
              <q-btn
                color="primary"
                label="Acceder al catálogo"
                :to="{ name: 'catalogo' }"
                size="md"
                no-caps
              />
              <q-btn
                outline
                color="white"
                label="Acerca de nosotros"
                size="md"
                no-caps
                @click="scrollAcerca"
              />
            </div>
          </div>

          <!-- Estadísticas derecha -->
          <div class="col-12 col-md-6 q-pa-xl">
            <div class="row justify-end q-gutter-xl text-right">
              <div>
                <div class="stat-number">
                  {{ stats.total ? stats.total.toLocaleString('es-CO') : '758' }}
                </div>
                <div class="stat-label">PIEZAS REGISTRADAS</div>
              </div>
              <div>
                <div class="stat-number">{{ anioMasAntiguo }}</div>
                <div class="stat-label">AÑO MÁS ANTIGUO</div>
              </div>
              <div>
                <div class="stat-number">{{ totalColecciones }}</div>
                <div class="stat-label">COLECCIONES</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SECCIÓN ACERCA ===== -->
    <section ref="acercaRef" class="acerca-section">
      <div class="row items-center" style="min-height: 60vh">
        <!-- Imagen izquierda -->
        <div class="col-12 col-md-5">
          <div class="muua-logo-block flex flex-center q-pa-xl">
            <div class="text-center">
              <div class="text-h1 text-weight-bold text-white muua-big">MUUA</div>
              <div class="text-caption text-grey-4 q-mt-sm">
                Museo Universitario Universidad de Antioquia
              </div>
            </div>
          </div>
        </div>

        <!-- Texto derecha -->
        <div class="col-12 col-md-7 q-pa-xl">
          <div class="text-caption text-gold letter-spacing q-mb-sm">ACERCA DEL PROYECTO</div>
          <h2 class="text-h4 text-white text-weight-bold q-mb-md">
            Hacer visible<br />
            lo que <em class="text-gold">siempre</em><br />
            ha existido
          </h2>
          <p class="text-grey-4 q-mb-md">
            La colección antropológica del museo reúne miles de piezas que narran historias de
            identidad, territorio y cultura. Durante años, esta información ha existido en formatos
            técnicos, accesibles solo para procesos internos.
          </p>
          <div class="quote-block q-mb-md">
            <em class="text-grey-3">
              "Este no es solo un sistema de consulta. Es una nueva forma de habitar la colección."
            </em>
          </div>
          <p class="text-grey-4">
            Nuestra propuesta transforma esa información en una experiencia digital estructurada,
            donde cada objeto puede ser descubierto, analizado y comprendido desde múltiples
            perspectivas. La arquitectura respeta las fuentes existentes y proyecta hacia una
            interfaz moderna, garantizando integridad, eficiencia y escalabilidad.
          </p>
        </div>
      </div>
    </section>

    <!-- ===== DASHBOARD ===== -->
    <section class="dashboard-section q-pa-xl">
      <div class="text-caption text-gold letter-spacing q-mb-sm">ESTADÍSTICAS DE LA COLECCIÓN</div>
      <h2 class="text-h4 text-white text-weight-bold q-mb-xl">La colección en números</h2>

      <div class="row q-col-gutter-lg">
        <!-- Piezas por área -->
        <div class="col-12 col-md-4">
          <div class="text-subtitle2 text-gold q-mb-md">Por área de material</div>
          <div v-for="[key, val] in topArea" :key="key" class="q-mb-sm">
            <div class="row justify-between text-caption text-grey-4 q-mb-xs">
              <span>{{ key }}</span>
              <span>{{ val }}</span>
            </div>
            <div class="barra-bg">
              <div class="barra-fill" :style="{ width: pct(val, topArea) + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Piezas por cultura -->
        <div class="col-12 col-md-4">
          <div class="text-subtitle2 text-gold q-mb-md">Por cultura</div>
          <div v-for="[key, val] in topCultura" :key="key" class="q-mb-sm">
            <div class="row justify-between text-caption text-grey-4 q-mb-xs">
              <span>{{ key }}</span>
              <span>{{ val }}</span>
            </div>
            <div class="barra-bg">
              <div class="barra-fill" :style="{ width: pct(val, topCultura) + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Piezas por periodo -->
        <div class="col-12 col-md-4">
          <div class="text-subtitle2 text-gold q-mb-md">Por periodo histórico</div>
          <div v-for="[key, val] in topPeriodo" :key="key" class="q-mb-sm">
            <div class="row justify-between text-caption text-grey-4 q-mb-xs">
              <span>{{ key }}</span>
              <span>{{ val }}</span>
            </div>
            <div class="barra-bg">
              <div class="barra-fill" :style="{ width: pct(val, topPeriodo) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer class="footer-section q-pa-xl">
      <div class="row q-col-gutter-xl">
        <!-- Logo y descripción -->
        <div class="col-12 col-md-4">
          <div class="text-h6 text-weight-bold text-white q-mb-sm">MUUA</div>
          <div class="text-caption text-grey-5">
            Sistema digital de visualización de la colección arqueológica del Museo Universitario de
            la Universidad de Antioquia.
          </div>
        </div>

        <!-- Navegación -->
        <div class="col-12 col-md-4">
          <div class="text-caption text-grey-4 letter-spacing q-mb-sm">NAVEGACIÓN</div>
          <div class="q-mb-xs">
            <q-btn flat dense no-caps color="grey-4" label="Inicio" :to="{ name: 'inicio' }" />
          </div>
          <div>
            <q-btn flat dense no-caps color="grey-4" label="Catálogo" :to="{ name: 'catalogo' }" />
          </div>
        </div>

        <!-- Contacto -->
        <div class="col-12 col-md-4">
          <div class="text-caption text-grey-4 letter-spacing q-mb-sm">CONTACTO</div>
          <div class="text-grey-5 text-caption">antropologiamuseo@udea.edu.co</div>
          <div class="text-grey-5 text-caption">Calle 67 Nº 53-108 · Bloque 15</div>
          <div class="text-grey-5 text-caption">Medellín, Colombia</div>
          <div class="text-grey-5 text-caption">(4) 219 5180</div>
        </div>
      </div>

      <q-separator color="grey-8" class="q-my-lg" />

      <div class="row justify-between text-caption text-grey-6">
        <div>© 2026 MUUA · Universidad de Antioquia</div>
        <div>Fundamentos de Investigación · Grupo 4</div>
        <div>Patrimonio Nacional ICANH</div>
      </div>
    </footer>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getEstadisticas } from 'src/services/api'

const acercaRef = ref(null)
const stats = ref({ total: 0, porColeccion: {}, porArea: {}, porCultura: {}, porPeriodo: {} })

function top(obj, n = 6) {
  return Object.entries(obj || {})
    .filter(([k]) => k !== 'Sin clasificar')
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
}

function pct(val, lista) {
  const max = lista[0]?.[1] || 1
  return Math.round((val / max) * 100)
}

const topArea    = computed(() => top(stats.value.porArea, 6))
const topCultura = computed(() => top(stats.value.porCultura, 6))
const topPeriodo = computed(() => top(stats.value.porPeriodo, 6))

const totalColecciones = computed(() =>
  Object.keys(stats.value.porCultura || {}).filter(k => k !== 'Sin clasificar').length || '—'
)

const anioMasAntiguo = computed(() => '200 a.C')

function scrollAcerca() {
  acercaRef.value?.scrollIntoView({ behavior: 'smooth' })
}

async function cargarStats() {
  try {
    stats.value = await getEstadisticas()
  } catch (e) {
    console.error('Error cargando estadísticas:', e)
  }
}

onMounted(() => {
  cargarStats()
})
</script>

<style scoped>
/* ===== HERO ===== */
.hero-section {
  position: relative;
  min-height: 100vh;
  background-color: #1a1209;
  background-image:
    radial-gradient(ellipse at 70% 50%, rgba(139, 90, 20, 0.25) 0%, transparent 60%),
    radial-gradient(ellipse at 20% 80%, rgba(80, 60, 10, 0.3) 0%, transparent 50%);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(10, 8, 3, 0.85) 0%, rgba(30, 20, 5, 0.5) 100%);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  color: white;
  line-height: 1.1;
  letter-spacing: -1px;
  margin: 0 0 1rem 0;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  max-width: 480px;
  line-height: 1.6;
}

.stat-number {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  color: #c9a84c;
  line-height: 1;
}

.stat-label {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 2px;
  margin-top: 4px;
}

/* ===== ACERCA ===== */
.acerca-section {
  background-color: #111008;
  border-top: 1px solid rgba(201, 168, 76, 0.2);
}

.muua-logo-block {
  background: rgba(201, 168, 76, 0.05);
  min-height: 60vh;
  border-right: 1px solid rgba(201, 168, 76, 0.15);
}

.muua-big {
  font-size: clamp(4rem, 10vw, 8rem);
  letter-spacing: -4px;
  color: rgba(255, 255, 255, 0.15);
}

.quote-block {
  border-left: 3px solid #c9a84c;
  padding-left: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.hero-section {
  position: relative;
  min-height: 100vh;
  background-color: #1a1209;
  background-image:
    radial-gradient(ellipse at 70% 50%, rgba(139, 90, 20, 0.25) 0%, transparent 60%),
    radial-gradient(ellipse at 20% 80%, rgba(80, 60, 10, 0.3) 0%, transparent 50%);
  overflow: hidden;
  margin-top: -50px; /* ← sube para cubrir el header transparente */
  padding-top: 50px; /* ← compensa el margin para el contenido */
  display: flex;
  align-items: center;
}

/* ===== FOOTER ===== */
.footer-section {
  background-color: #0d0b06;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* ===== UTILS ===== */
.text-gold {
  color: #c9a84c !important;
}
.font-italic {
  font-style: italic;
}
.letter-spacing {
  letter-spacing: 2px;
}

/* ===== DASHBOARD ===== */
.dashboard-section {
  background-color: #0f0d07;
  border-top: 1px solid rgba(201,168,76,0.15);
}

.barra-bg {
  height: 6px;
  background: rgba(255,255,255,0.06);
  border-radius: 3px;
  overflow: hidden;
}

.barra-fill {
  height: 100%;
  background: linear-gradient(90deg, #c9a84c, #8B6914);
  border-radius: 3px;
  transition: width 0.6s ease;
}
</style>
