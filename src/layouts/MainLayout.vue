<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header :class="headerClass" class="transition-header" flat style="border: none">
      <q-toolbar class="q-py-sm toolbar-inner">

        <!-- Logo -->
        <q-btn flat no-caps to="/" class="logo-btn">
          <img
            src="~assets/img/Muua - Logo.png"
            alt="MUUA"
            class="logo-img"
            style="height: 40px; filter: grayscale(1);"
          />
        </q-btn>

        <!-- Links centrados -->
        <div class="nav-links">
          <router-link
            :to="{ name: 'inicio' }"
            class="nav-link"
            :class="{ 'nav-link--active': route.name === 'inicio' }"
          >
            Inicio
          </router-link>

          <router-link
            :to="{ name: 'catalogo' }"
            class="nav-link"
            :class="{ 'nav-link--active': route.name === 'catalogo' }"
          >
            Catálogo
          </router-link>
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <div v-if="!esInicio" class="site-footer" elevated>
      <div class="footer-top">
        <div class="footer-brand">
          <img src="~assets/img/Muua - Logo.png" alt="MUUA" class="footer-logo" />
          <p class="footer-brand-desc">
            Sistema digital de visualización de la colección arqueológica del
            Museo Universitario de la Universidad de Antioquia.
          </p>
        </div>
        <div class="footer-vdivider" />
        <div class="footer-col">
          <p class="footer-col-heading">NAVEGACIÓN</p>
          <router-link class="footer-link" :to="{ name: 'inicio' }">Inicio</router-link>
          <router-link class="footer-link" :to="{ name: 'catalogo' }">Catálogo</router-link>
        </div>
        <div class="footer-vdivider" />
        <div class="footer-col">
          <p class="footer-col-heading">CONTACTO</p>
          <p class="footer-col-info">antropologiamuseo@udea.edu.co</p>
          <p class="footer-col-info">Calle 67 Nº 53-108 · Bloque 15</p>
          <p class="footer-col-info">Medellín, Colombia</p>
          <p class="footer-col-info">(4) 219 5180</p>
        </div>
      </div>
      <div class="footer-hdivider" />
      <div class="footer-bottom">
        <span>© 2026 MUUA · Universidad de Antioquia</span>
        <span>Fundamentos de Investigación · Grupo 4</span>
        <span>Patrimonio Nacional ICANH</span>
      </div>
    </div>

  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scrollY = ref(0)

const esInicio = computed(() => route.name === 'inicio')

const headerClass = computed(() => {
  if (esInicio.value) {
    return scrollY.value > 80 ? 'header-oscuro' : 'header-transparente'
  }
  return 'header-oscuro'
})

function onScroll() {
  scrollY.value = window.scrollY
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style>
/*
  Declarar la fuente globalmente (sin "scoped") para que esté disponible
  en todo el proyecto.

  Coloca el archivo de fuente en: src/assets/fonts/Sagata-Normal-Sans.woff2
  (y opcionalmente el .woff como fallback)
*/
@font-face {
  font-family: 'Sagata';
  src:
    url('~assets/fonts/Sagata-Normal-Sans.woff2') format('woff2'),
    url('~assets/fonts/Sagata-Normal-Sans.woff')  format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>

<style scoped>
/* ── Header estados ── */
.transition-header {
  transition: background-color 0.35s ease;
}

.header-transparente {
  background-color: transparent !important;
  box-shadow: none !important;
}

.header-oscuro {
  background-color: #1a1209 !important;
}

/* ── Toolbar ── */
.toolbar-inner {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
}

.logo-btn {
  flex-shrink: 0;
}

/* ── Links contenedor centrado ── */
.nav-links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* ── Cada link ── */
.nav-link {
  font-family: 'Sagata', sans-serif;
  font-size: 0.9rem;
  color: #A69884;          /* color accent de Quasar (quasar.config → accent) */
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  letter-spacing: 0.5px;
  transition: color 0.2s ease;
}

/* Línea base (invisible por defecto) */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1.5px;
  width: 0%;
  background-color: #C6A670;
  border-radius: 1px;
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover: dibuja la línea */
.nav-link:hover::after {
  width: 100%;
}

/* Ruta activa: línea permanente */
.nav-link--active::after {
  width: 100%;
}

.nav-link--active {
  color: #C6A670;
}

/* Logo btn sin ripple visual raro */
.logo-img {
  display: block;
}

/* ── Footer ── */
.site-footer {
  background: #0d0b06 !important;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 4rem 120px 2.5rem;
  color: inherit;
}
.footer-top {
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
}
.footer-brand { flex: 1.6; padding-right: 4rem; }
.footer-logo {
  height: 40px;
  width: auto;
  display: block;
  margin-bottom: 1rem;
  filter: brightness(0.7);
}
.footer-brand-desc {
  font-family: 'Cormorant', serif;
  font-size: 0.9rem;
  line-height: 1.75;
  color: rgba(255,250,244,0.25);
  max-width: 280px;
  margin: 0;
}
.footer-vdivider {
  width: 1px;
  align-self: stretch;
  background: rgba(255,255,255,0.06);
  margin: 0 3.5rem;
  flex-shrink: 0;
}
.footer-col { flex: 1; display: flex; flex-direction: column; gap: 0.6rem; }
.footer-col-heading {
  font-family: 'Space Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 2.5px;
  color: rgba(255,250,244,0.25);
  margin: 0 0 0.5rem;
}
.footer-link {
  font-family: 'Sagata', sans-serif;
  font-size: 0.88rem;
  color: rgba(255,250,244,0.45);
  text-decoration: none;
  width: fit-content;
  transition: color 0.2s;
}
.footer-link:hover { color: #C9A84C; }
.footer-col-info {
  font-family: 'Sagata', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,250,244,0.3);
  margin: 0;
  line-height: 1.6;
}
.footer-hdivider {
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin-bottom: 1.75rem;
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  font-family: 'Space Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 1.5px;
  color: rgba(255,250,244,0.18);
  text-transform: uppercase;
}
@media (max-width: 900px) {
  .site-footer    { padding: 3rem 1.5rem 2rem; }
  .footer-top     { flex-direction: column; gap: 2rem; }
  .footer-vdivider { display: none; }
  .footer-bottom  { flex-direction: column; gap: 0.5rem; }
}
</style>
