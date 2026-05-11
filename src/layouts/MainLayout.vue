<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-grey-10 text-white">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold"> MUUA · Colección Arqueológica </q-toolbar-title>

        <q-btn flat dense label="Inicio" :to="{ name: 'inicio' }" class="q-mr-sm" />
        <q-btn flat dense label="Catálogo" :to="{ name: 'catalogo' }" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-9 text-white q-pa-md text-center text-caption">
      © 2026 MUUA · Universidad de Antioquia · Fundamentos de Investigación Grupo 4
    </q-footer>
  </q-layout>
</template>

<script setup>
// Sin lógica adicional por ahora — la navbar es estática
</script>
