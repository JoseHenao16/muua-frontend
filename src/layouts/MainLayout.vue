<!-- src/layouts/MainLayout.vue -->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header :class="headerClass" class="transition-header" flat bordered style="border: none">
      <q-toolbar class="q-py-sm" style="position: relative; z-index: 10;">
        <!-- Logo -->
        <q-btn flat no-caps :to="{ name: 'inicio' }" class="q-mr-auto">
          <span class="text-h6 text-weight-bold" :class="esInicio ? 'text-white' : 'text-white'">
            MUUA
          </span>
        </q-btn>

        <!-- Links -->
        <q-btn
          flat
          no-caps
          label="Inicio"
          :to="{ name: 'inicio' }"
          :class="esInicio ? 'text-white' : 'text-white'"
          class="q-mr-sm"
        />
        <q-btn
          flat
          no-caps
          label="Catálogo"
          :to="{ name: 'catalogo' }"
          :class="esInicio ? 'text-white' : 'text-white'"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
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

<style scoped>
.transition-header {
  transition: background-color 0.3s ease;
}

.bg-transparent {
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>
