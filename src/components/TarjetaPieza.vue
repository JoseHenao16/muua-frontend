<!-- src/components/TarjetaPieza.vue -->
<template>
  <q-card
    class="tarjeta-pieza cursor-pointer full-height"
    flat
    bordered
    @click="irADetalle"
  >
    <!-- Imagen de la pieza -->
    <q-img
      :src="imagenUrl"
      :ratio="4/3"
      spinner-color="primary"
      @error="imagenRota = true"
    >
      <!-- Placeholder si no hay imagen -->
      <template v-if="imagenRota" v-slot:default>
        <div class="absolute-full flex flex-center bg-grey-3 text-grey-6 column">
          <q-icon name="image_not_supported" size="48px" />
          <div class="text-caption q-mt-sm">{{ pieza.numeroRegistro }}</div>
        </div>
      </template>

      <!-- Badge de colección sobre la imagen -->
      <div class="absolute-bottom-left q-pa-xs">
        <q-badge color="primary" :label="pieza.coleccion || 'Sin colección'" />
      </div>
    </q-img>

    <q-card-section class="q-pb-xs">
      <!-- Código de registro -->
      <div class="text-caption text-grey-6 q-mb-xs">
        Reg. {{ pieza.numeroRegistro }}
      </div>

      <!-- Nombre de la pieza -->
      <div class="text-subtitle2 text-weight-bold ellipsis-2-lines">
        {{ pieza.denominacion || 'Sin denominación' }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-xs q-pb-sm">
      <!-- Chips de metadatos clave -->
      <div class="row q-gutter-xs">
        <q-chip
          v-if="pieza.area"
          dense
          outline
          color="secondary"
          text-color="secondary"
          size="sm"
          icon="place"
          :label="pieza.area"
        />
        <q-chip
          v-if="pieza.cultura"
          dense
          outline
          color="accent"
          text-color="accent"
          size="sm"
          icon="group"
          :label="pieza.cultura"
        />
        <q-chip
          v-if="pieza.periodo"
          dense
          outline
          color="grey-7"
          text-color="grey-7"
          size="sm"
          icon="schedule"
          :label="pieza.periodo"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getImagenUrl } from 'src/services/api'

const props = defineProps({
  pieza: {
    type: Object,
    required: true,
  }
})

const router = useRouter()
const imagenRota = ref(false)

const imagenUrl = computed(() => {
  return getImagenUrl(props.pieza.numeroRegistro)
})

function irADetalle() {
  router.push({
    name: 'pieza',
    params: { codigo: props.pieza.numeroRegistro }
  })
}
</script>

<style scoped>
.tarjeta-pieza {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.tarjeta-pieza:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
