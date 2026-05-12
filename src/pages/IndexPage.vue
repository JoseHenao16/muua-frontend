<!-- src/pages/IndexPage.vue -->
<template>
  <div class="fp-wrapper" @wheel.prevent="onWheel" @touchstart="onTouchStart" @touchend="onTouchEnd">

    <!-- ===== DOTS NAV ===== -->
    <nav class="slide-nav" aria-label="Navegación de secciones">
      <button
        v-for="(slide, i) in slides"
        :key="i"
        class="slide-dot"
        :class="{ active: current === i }"
        @click="goTo(i)"
        :aria-label="slide.label"
      />
    </nav>

    <!-- ===================================================
         SLIDE 0 · HERO
         =================================================== -->
    <section class="fp-slide hero-slide" :class="{ visible: current === 0, above: current > 0 }">

      <!-- Fondo -->
      <div class="hero-bg">
        <img src="~assets/img/Fondo MUUA.png" class="hero-bg-img" alt="" aria-hidden="true" />
        <div class="hero-vignette" />
      </div>

      <!-- Cuerpo: dos columnas -->
      <div class="hero-body">

        <!-- COL IZQUIERDA -->
        <div class="hero-left">
          <p class="hero-eyebrow">COLECCIÓN DIGITAL · MUUA</p>

          <h1 class="hero-title">
            <span class="hero-title__white">COLECCIÓN DE</span>
            <span class="hero-title__gold">ANTROPOLOGÍA</span>
          </h1>

          <p class="hero-desc">
            Conectando conocimiento y patrimonio: una experiencia digital para descubrir,
            explorar y consultar la colección arqueológica del Museo Universitario de la
            Universidad de Antioquia.
          </p>

          <div class="hero-btns">
            <q-btn
              unelevated
              no-caps
              label="Acceder al catálogo"
              :to="{ name: 'catalogo' }"
              class="btn-primary-custom"
            />
            <q-btn
              outline
              no-caps
              label="Acerca de nosotros"
              class="btn-outline-custom"
              @click="goTo(1)"
            />
          </div>
        </div>

        <!-- COL DERECHA — imagen centrada -->
        <div class="hero-right">
          <img src="~assets/img/Middle.png" class="hero-piece" alt="Pieza arqueológica" />
        </div>

      </div>

      <!-- Estadísticas — fila inferior -->
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-number">{{ stats.total ? stats.total.toLocaleString('es-CO') : '758' }}</div>
          <div class="stat-label text-primary">PIEZAS REGISTRADAS</div>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <div class="stat-number">{{ anioMasAntiguo }}</div>
          <div class="stat-label text-primary">AÑO MÁS ANTIGUO</div>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <div class="stat-number">{{ totalColecciones }}</div>
          <div class="stat-label text-primary">COLECCIONES</div>
        </div>
      </div>

      <!-- Scroll hint -->
      <button class="scroll-hint" @click="goTo(1)" aria-label="Siguiente sección">
        <span class="scroll-hint__text">Explorar</span>
        <span class="scroll-hint__arrow">↓</span>
      </button>

    </section>

    <!-- ===================================================
         SLIDE 1 · ACERCA
         =================================================== -->
    <section class="fp-slide acerca-slide" :class="{ visible: current === 1, above: current > 1 }">
      <div class="acerca-inner">

        <!-- Izquierda: imagen museo -->
        <div class="acerca-left">
          <img src="~assets/img/Fondo MUUA.png" class="acerca-img" alt="Museo Universitario" />
          <div class="acerca-img-overlay" />
        </div>

        <!-- Derecha: texto -->
        <div class="acerca-right">
          <p class="section-eyebrow">ACERCA DEL PROYECTO</p>
          <h2 class="acerca-title">
            Hacer visible<br />
            lo que <em class="text-secondary">siempre</em><br />
            ha existido
          </h2>
          <p class="acerca-body">
            La colección antropológica del museo reúne miles de piezas que narran historias de
            identidad, territorio y cultura. Durante años, esta información ha existido en formatos
            técnicos, accesibles solo para procesos internos.
          </p>
          <blockquote class="acerca-quote text-secondary">
            "Este no es solo un sistema de consulta. Es una nueva forma de habitar la colección."
          </blockquote>
          <p class="acerca-body">
            Nuestra propuesta transforma esa información en una experiencia digital estructurada,
            donde cada objeto puede ser descubierto, analizado y comprendido desde múltiples
            perspectivas. La arquitectura respeta las fuentes existentes y proyecta hacia una
            interfaz moderna, garantizando integridad, eficiencia y escalabilidad.
          </p>
        </div>

      </div>
    </section>

    <!-- ===================================================
         SLIDE 2 · FOOTER
         =================================================== -->
    <section class="fp-slide footer-slide" :class="{ visible: current === 2, above: false }">
      <div class="footer-inner">

        <div class="footer-top">
          <!-- Logo + descripción -->
          <div class="footer-brand">
            <img src="~assets/img/Muua - Logo.png" alt="MUUA" class="footer-logo" />
            <p class="footer-brand-desc">
              Sistema digital de visualización de la colección arqueológica del
              Museo Universitario de la Universidad de Antioquia.
            </p>
          </div>

          <!-- Divider vertical -->
          <div class="footer-vdivider" />

          <!-- Navegación -->
          <div class="footer-col">
            <p class="footer-col-heading">NAVEGACIÓN</p>
            <router-link class="footer-link" :to="{ name: 'inicio' }">Inicio</router-link>
            <router-link class="footer-link" :to="{ name: 'catalogo' }">Catálogo</router-link>
          </div>

          <!-- Divider vertical -->
          <div class="footer-vdivider" />

          <!-- Contacto -->
          <div class="footer-col">
            <p class="footer-col-heading">CONTACTO</p>
            <p class="footer-col-info">antropologiamuseo@udea.edu.co</p>
            <p class="footer-col-info">Calle 67 Nº 53-108 · Bloque 15</p>
            <p class="footer-col-info">Medellín, Colombia</p>
            <p class="footer-col-info">(4) 219 5180</p>
          </div>
        </div>

        <!-- Línea separadora -->
        <div class="footer-hdivider" />

        <!-- Bottom bar -->
        <div class="footer-bottom">
          <span>© 2026 MUUA · Universidad de Antioquia</span>
          <span>Fundamentos de Investigación · Grupo 4</span>
          <span>Patrimonio Nacional ICANH</span>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getEstadisticas } from 'src/services/api'

/* ── Fullpage scroll ── */
const current = ref(0)
const TOTAL = 3
let isScrolling = false
let touchStartY = 0

const slides = [
  { label: 'Hero' },
  { label: 'Acerca del proyecto' },
  { label: 'Contacto' },
]

function goTo(idx) {
  current.value = Math.max(0, Math.min(TOTAL - 1, idx))
}

function onWheel(e) {
  if (isScrolling) return
  isScrolling = true
  if (e.deltaY > 0) goTo(current.value + 1)
  else goTo(current.value - 1)
  setTimeout(() => { isScrolling = false }, 900)
}

function onTouchStart(e) { touchStartY = e.touches[0].clientY }
function onTouchEnd(e) {
  const diff = touchStartY - e.changedTouches[0].clientY
  if (Math.abs(diff) < 50) return
  if (diff > 0) goTo(current.value + 1)
  else goTo(current.value - 1)
}

function onKeydown(e) {
  if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(current.value + 1) }
  if (e.key === 'ArrowUp'   || e.key === 'PageUp')   { e.preventDefault(); goTo(current.value - 1) }
}

onMounted(()  => { window.addEventListener('keydown', onKeydown); cargarStats() })
onUnmounted(() => { window.removeEventListener('keydown', onKeydown) })

/* ── Estadísticas ── */
const stats = ref({ total: 0, porCultura: {}, porArea: {}, porPeriodo: {} })

const totalColecciones = computed(() =>
  Object.keys(stats.value.porCultura || {}).filter(k => k !== 'Sin clasificar').length || '—'
)
const anioMasAntiguo = computed(() => '200 a.C')

async function cargarStats() {
  try { stats.value = await getEstadisticas() }
  catch (e) { console.error('Error cargando estadísticas:', e) }
}
</script>

<style scoped>
/* ============================================================
   BASE — wrapper fullpage
   ============================================================ */
.fp-wrapper {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: #100e08;
}

/* ── Dots ── */
.slide-nav {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.slide-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.25);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.3s, transform 0.3s;
}
.slide-dot.active {
  background: #C9A84C;
  transform: scale(1.4);
}

/* ── Slides base ── */
.fp-slide {
  position: absolute;
  inset: 0;
  transition: transform 0.85s cubic-bezier(0.77, 0, 0.18, 1),
              opacity  0.85s cubic-bezier(0.77, 0, 0.18, 1);
  transform: translateY(100%);
  opacity: 0;
  pointer-events: none;
}
.fp-slide.visible  { transform: translateY(0);    opacity: 1; pointer-events: all; }
.fp-slide.above    { transform: translateY(-100%); opacity: 0; }

/* ============================================================
   SLIDE 0 · HERO
   ============================================================ */
.hero-slide {
  background: #1a1209;
  display: flex;
  flex-direction: column;
}

/* Fondo */
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  opacity: 0.35;
}
.hero-vignette {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right,  rgba(10,8,3,0.95) 0%, rgba(10,8,3,0.55) 55%, rgba(10,8,3,0.15) 100%),
    linear-gradient(to bottom, rgba(10,8,3,0.5)  0%, transparent 25%, transparent 65%, rgba(10,8,3,0.9) 100%);
}

/* Dos columnas */
.hero-body {
  position: relative;
  z-index: 1;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 0 120px;
  gap: 4rem;
}

/* Columna izquierda */
.hero-left {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.hero-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 3px;
  color: #C9A84C;
  margin: 0 0 1.25rem;
}

.hero-title {
  font-family: 'Playfair', serif;
  font-size: clamp(2.8rem, 4.5vw, 5rem);
  line-height: 1.05;
  margin: 0;
  padding: 0;
}
.hero-title__white {
  font-weight: 700;
  color: #FFFAF4;
  display: block;
}
.hero-title__gold {
  font-weight: 600;
  font-style: italic;
  color: #C9A84C;
  display: block;
}

.hero-desc {
  font-family: 'Cormorant', serif;
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.75;
  color: #FFFAF4;
  max-width: 480px;
  margin: 0 0 2.5rem;
}

.hero-btns {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary-custom {
  background: #C9A84C !important;
  color: #1a1209 !important;
  font-family: 'Sagata', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  padding: 0.6rem 1.6rem;
}
.btn-outline-custom {
  border: 1px solid rgba(255,255,255,0.5) !important;
  color: #FFFAF4 !important;
  font-family: 'Sagata', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  padding: 0.6rem 1.6rem;
}
.btn-outline-custom:hover {
  border-color: #C9A84C !important;
  color: #C9A84C !important;
}

/* Columna derecha — pieza */
.hero-right {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.hero-piece {
  max-height: 70vh;
  max-width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 60px rgba(201,168,76,0.15));
}

/* Estadísticas fila inferior */
.hero-stats {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 1.5rem 120px;
  border-top: 1px solid rgba(201,168,76,0.15);
  background: rgba(10,8,3,0.5);
  backdrop-filter: blur(4px);
}

.stat-item {
  text-align: center;
  padding: 0 4rem;
}
.stat-number {
  font-family: 'Playfair', serif;
  font-weight: 700;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  color: #C9A84C;
  line-height: 1;
}
.stat-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 2.5px;
  margin-top: 6px;
  opacity: 0.7;
}
.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(201,168,76,0.25);
  flex-shrink: 0;
}

/* Scroll hint */
.scroll-hint {
  position: absolute;
  bottom: 9rem;
  left: 120px;
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 0;
}
.scroll-hint__text {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.35);
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
.scroll-hint__arrow {
  color: rgba(201,168,76,0.6);
  font-size: 1rem;
  animation: bounce 1.8s infinite;
  align-self: center;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
}

/* ============================================================
   SLIDE 1 · ACERCA
   ============================================================ */
.acerca-slide {
  background: #111008;
  display: flex;
  align-items: stretch;
}
.acerca-inner {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Izq — imagen */
.acerca-left {
  position: relative;
  overflow: hidden;
}
.acerca-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.5;
}
.acerca-img-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, transparent 60%, #111008 100%),
    linear-gradient(to bottom, rgba(10,8,3,0.3) 0%, transparent 20%);
}
.acerca-img-caption {
  position: absolute;
  bottom: 3rem;
  left: 3rem;
}
.acerca-ghost-text {
  font-family: 'Playfair', serif;
  font-weight: 700;
  font-size: clamp(3rem, 7vw, 6rem);
  color: rgba(255,255,255,0.08);
  letter-spacing: -4px;
  line-height: 1;
  user-select: none;
}
.acerca-caption-label {
  font-family: 'Sagata', sans-serif;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.35);
  letter-spacing: 1px;
  margin-top: 0.5rem;
}

/* Der — texto */
.acerca-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 5rem 5rem 4rem;
  border-left: 1px solid rgba(201,168,76,0.12);
}

.section-eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 3px;
  color: #C9A84C;
  margin: 0 0 1.25rem;
}

.acerca-title {
  font-family: 'Playfair', serif;
  font-weight: 700;
  font-size: clamp(2rem, 3.2vw, 3.2rem);
  color: #FFFAF4;
  line-height: 1.1;
  margin: 0 0 2rem;
}
.acerca-title em {
  font-style: italic;
  font-weight: 600;
}
.text-secondary { color: #C9A84C !important; }

.acerca-body {
  font-family: 'Cormorant', serif;
  font-weight: 400;
  font-size: 1rem;
  color: rgba(255,250,244,0.65);
  line-height: 1.8;
  margin: 0 0 1.25rem;
}

.acerca-quote {
  font-family: 'Cormorant', serif;
  font-weight: 500;
  font-style: italic;
  font-size: 1.8rem;
  border-left: 2px solid #C9A84C;
  padding-left: 1.25rem;
  margin: 1.5rem 0;
}

/* ============================================================
   SLIDE 2 · FOOTER
   ============================================================ */
.footer-slide {
  background: #0d0b06;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-inner {
  width: 100%;
  padding: 0 120px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.footer-top {
  display: flex;
  align-items: flex-start;
  gap: 0;
  padding-bottom: 3.5rem;
}

.footer-brand {
  flex: 1.6;
  padding-right: 4rem;
}
.footer-logo {
  height: 44px;
  width: auto;
  display: block;
  margin-bottom: 1.25rem;
  filter: brightness(0.7);
}
.footer-brand-desc {
  font-family: 'Cormorant', serif;
  font-size: 0.95rem;
  line-height: 1.75;
  color: rgba(255,250,244,0.3);
  max-width: 300px;
}

.footer-vdivider {
  width: 1px;
  align-self: stretch;
  background: rgba(255,255,255,0.07);
  margin: 0 3.5rem;
  flex-shrink: 0;
}

.footer-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-col-heading {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 2.5px;
  color: rgba(255,250,244,0.3);
  margin: 0 0 0.75rem;
}

.footer-link {
  font-family: 'Sagata', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,250,244,0.55);
  text-decoration: none;
  transition: color 0.2s;
  width: fit-content;
}
.footer-link:hover { color: #C9A84C; }

.footer-col-info {
  font-family: 'Sagata', sans-serif;
  font-size: 0.82rem;
  color: rgba(255,250,244,0.4);
  margin: 0;
  line-height: 1.6;
}

.footer-hdivider {
  height: 1px;
  background: rgba(255,255,255,0.06);
  margin-bottom: 2rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  font-family: 'Space Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 1.5px;
  color: rgba(255,250,244,0.2);
  text-transform: uppercase;
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 900px) {
  .hero-body        { grid-template-columns: 1fr; padding: 0 2rem; }
  .hero-right       { display: none; }
  .hero-stats       { padding: 1.5rem 2rem; gap: 0; }
  .stat-item        { padding: 0 1.5rem; }
  .scroll-hint      { left: 2rem; }

  .acerca-inner     { grid-template-columns: 1fr; }
  .acerca-left      { display: none; }
  .acerca-right     { padding: 3rem 2rem; border-left: none; }

  .footer-inner     { padding: 0 2rem; }
  .footer-top       { flex-direction: column; gap: 2rem; }
  .footer-vdivider  { display: none; }
  .footer-bottom    { flex-direction: column; gap: 0.5rem; }
}
</style>
