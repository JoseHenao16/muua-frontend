// src/services/api.js
import { api } from 'boot/axios'

export const getImagenUrl = (codigo) => {
  const base = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:1337/imagenes'
  return `${base}/${codigo}.jpg`
}

export const getPiezas = async (filtros) => {
  // Limpiar parámetros vacíos para no enviar strings vacíos
  const params = Object.fromEntries(
    Object.entries(filtros).filter(([, val]) => val !== '' && val !== null && val !== undefined)
  )

  const response = await api.get('/piezas', { params })
  const ejecucionDatos = response.data.ejecucion.datos

  if (ejecucionDatos && ejecucionDatos.datos) {
    return ejecucionDatos
  }

  return {
    total: ejecucionDatos.length,
    page: filtros.page || 1,
    limit: filtros.limit || 20,
    datos: ejecucionDatos,
  }
}

export const getPieza = async (codigo) => {
  const response = await api.get(`/piezas/${codigo}`)
  // ejecucion.datos = objeto pieza directamente
  return response.data.ejecucion.datos
}

export const buscarPiezas = async (q) => {
  const response = await api.get('/piezas/buscar', { params: { q } })
  return response.data.ejecucion.datos
}

export const getEstadisticas = async () => {
  const response = await api.get('/estadisticas')
  return response.data.ejecucion.datos
}

export const generarReporte = async (codigos) => {
  const response = await api.post('/reporte', { codigos }, { responseType: 'blob' })
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'reporte_icanh.xlsx')
  document.body.appendChild(link)
  link.click()
  link.remove()
}
