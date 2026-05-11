// src/stores/catalogo.js
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { getPiezas } from 'src/services/api'

export const useCatalogoStore = defineStore('catalogo', () => {
  const piezas = ref([])
  const total = ref(0)
  const cargando = ref(false)
  const error = ref(null)

  const filtros = reactive({
    coleccion: '',
    area: '',
    cultura: '',
    periodo: '',
    q: '',
    page: 1,
    limit: 20,
  })

  async function cargarPiezas() {
    cargando.value = true
    error.value = null
    try {
      const resultado = await getPiezas(filtros)
      // resultado = { total, page, limit, datos: [...] }
      piezas.value = resultado.datos || []
      total.value = resultado.total || 0
    } catch (e) {
      error.value = 'Error al cargar las piezas. Verifica que el backend esté corriendo.'
      console.error(e)
    } finally {
      cargando.value = false
    }
  }

  async function buscar(texto) {
    filtros.q = texto
    filtros.page = 1
    await cargarPiezas()
  }

  function setFiltro(campo, valor) {
    filtros[campo] = campo === 'page' || campo === 'limit' ? Number(valor) : valor
    if (campo !== 'page') filtros.page = 1
    cargarPiezas()
  }

  function limpiarFiltros() {
    filtros.coleccion = ''
    filtros.area = ''
    filtros.cultura = ''
    filtros.periodo = ''
    filtros.q = ''
    filtros.page = 1
    cargarPiezas()
  }

  return {
    piezas,
    total,
    cargando,
    error,
    filtros,
    cargarPiezas,
    buscar,
    setFiltro,
    limpiarFiltros,
  }
})
