<!-- src/components/TarjetaPieza.vue -->
<template>
  <article class="tarjeta" @click="irADetalle">

    <!-- Imagen -->
    <div class="tarjeta__img-wrap">
      <q-img
        :src="imagenUrl"
        :ratio="4/3"
        spinner-color="secondary"
        class="tarjeta__img"
        @error="imagenRota = true"
      >
        <!-- Sin imagen -->
        <template v-if="imagenRota" v-slot:default>
          <div class="tarjeta__no-img">
            <q-icon name="image_not_supported" size="36px" />
            <span class="tarjeta__no-img-code">{{ pieza.numeroRegistro }}</span>
          </div>
        </template>
      </q-img>

      <!-- Hover overlay -->
      <div class="tarjeta__hover-overlay">
        <span class="tarjeta__ver-mas">Ver detalle →</span>
      </div>
    </div>

    <!-- Info -->
    <div class="tarjeta__body">
      <p class="tarjeta__codigo">COL · {{ pieza.numeroRegistro }}</p>
      <h3 class="tarjeta__nombre">{{ pieza.denominacion || 'Sin denominación' }}</h3>

      <div class="tarjeta__chips">
        <span v-if="pieza.area"    class="tarjeta__chip">{{ pieza.area }}</span>
        <span v-if="pieza.cultura" class="tarjeta__chip">{{ pieza.cultura }}</span>
        <span v-if="pieza.periodo" class="tarjeta__chip tarjeta__chip--muted">{{ pieza.periodo }}</span>
      </div>
    </div>

  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getImagenesPieza } from 'src/services/api'

const props = defineProps({
  pieza: { type: Object, required: true }
})

const router     = useRouter()
const imagenUrl  = ref('')
const imagenRota = ref(false)

async function cargarImagen() {
  try {
    const imagenes = await getImagenesPieza(props.pieza.numeroRegistro)
    if (imagenes.length > 0) {
      imagenUrl.value = imagenes[0].thumbnail
    } else {
      imagenRota.value = true
    }
  } catch {
    imagenRota.value = true
  }
}

function irADetalle() {
  router.push({ name: 'pieza', params: { codigo: props.pieza.numeroRegistro } })
}

onMounted(() => { cargarImagen() })
</script>

<style scoped>
.tarjeta {
  background: #100e08;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: background 0.2s;
  position: relative;
}
.tarjeta:hover {
  background: #18150d;
}

/* Imagen */
.tarjeta__img-wrap {
  position: relative;
  overflow: hidden;
}
.tarjeta__img {
  display: block;
  transition: transform 0.4s ease;
}
.tarjeta:hover .tarjeta__img {
  transform: scale(1.03);
}

/* Sin imagen */
.tarjeta__no-img {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #1a1810;
  color: rgba(255,250,244,0.2);
}
.tarjeta__no-img-code {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 1px;
}

/* Overlay hover */
.tarjeta__hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(201,168,76,0.08);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0.75rem;
  opacity: 0;
  transition: opacity 0.3s;
}
.tarjeta:hover .tarjeta__hover-overlay {
  opacity: 1;
}
.tarjeta__ver-mas {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 1.5px;
  color: #C9A84C;
  background: rgba(16,14,8,0.8);
  padding: 0.3rem 0.6rem;
  border-radius: 2px;
}

/* Body */
.tarjeta__body {
  padding: 1rem 1.1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}

.tarjeta__codigo {
  font-family: 'Space Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 2px;
  color: #C9A84C;
  margin: 0;
}

.tarjeta__nombre {
  font-family: 'Playfair', serif;
  font-weight: 700;
  font-size: 1rem;
  color: #FFFAF4;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tarjeta__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.4rem;
}

.tarjeta__chip {
  font-family: 'Sagata', sans-serif;
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  border-radius: 2px;
  border: 1px solid rgba(201,168,76,0.3);
  color: rgba(255,250,244,0.65);
  background: rgba(201,168,76,0.05);
}

.tarjeta__chip--muted {
  border-color: rgba(255,250,244,0.1);
  color: rgba(255,250,244,0.35);
  background: none;
}
</style>
