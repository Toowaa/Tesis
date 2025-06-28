"use client"

import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Package, TrendingUp,  CalendarDays } from "lucide-react"

interface HistorialProps {
    user?: any

}

interface Producto {
  id: string
  user_id: string
  nombre: string
  precio: number
  imagen_url: string
  created_at: string
}

interface EstadisticasMes {
  totalVentas: number
  cantidadProductos: number
  promedioVenta: number
}

export default function Historial({ user}: HistorialProps) {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fechaSeleccionada, setFechaSeleccionada] = useState("")
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("ultima_semana")
  const [estadisticasMes, setEstadisticasMes] = useState<EstadisticasMes>({
    totalVentas: 0,
    cantidadProductos: 0,
    promedioVenta: 0
  })

  console.log('HOLIWI', user)
  // Función para obtener productos del usuario
  const obtenerProductos = async (filtroFecha?: string) => {
    try {
      setLoading(true)
      let query = supabase
        .from('productos')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      // Aplicar filtros de fecha según el período seleccionado
      if (periodoSeleccionado === "ultima_semana") {
        const hace7Dias = new Date()
        hace7Dias.setDate(hace7Dias.getDate() - 7)
        query = query.gte('created_at', hace7Dias.toISOString())
      } else if (periodoSeleccionado === "ultimo_mes") {
        const hace30Dias = new Date()
        hace30Dias.setDate(hace30Dias.getDate() - 30)
        query = query.gte('created_at', hace30Dias.toISOString())
      } else if (fechaSeleccionada) {
        // Filtro por fecha específica
        const fechaInicio = new Date(fechaSeleccionada)
        const fechaFin = new Date(fechaSeleccionada)
        fechaFin.setDate(fechaFin.getDate() + 1)
        
        query = query
          .gte('created_at', fechaInicio.toISOString())
          .lt('created_at', fechaFin.toISOString())
      }

      const { data, error } = await query

      if (error) {
        setError(error.message)
        return
      }

      setProductos(data || [])
      calcularEstadisticasMes(data || [])
    } catch (err) {
      setError('Error al cargar los productos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Función para calcular estadísticas del mes actual
  const calcularEstadisticasMes = async (productosActuales: Producto[]) => {
    try {
      const inicioMes = new Date()
      inicioMes.setDate(1)
      inicioMes.setHours(0, 0, 0, 0)

      const { data: productosMes, error } = await supabase
        .from('productos')
        .select('precio')
        .eq('user_id', user?.id)
        .gte('created_at', inicioMes.toISOString())

      if (error) {
        console.error('Error al calcular estadísticas:', error)
        return
      }

      const totalVentas = productosMes?.reduce((sum: number, p: { precio: number }) => sum + p.precio, 0) || 0
      const cantidadProductos = productosMes?.length || 0
      const promedioVenta = cantidadProductos > 0 ? totalVentas / cantidadProductos : 0

      setEstadisticasMes({
        totalVentas,
        cantidadProductos,
        promedioVenta
      })
    } catch (err) {
      console.error('Error al calcular estadísticas:', err)
    }
  }

  useEffect(() => {
    if (user?.id) {
      obtenerProductos()
    }
  }, [user?.id, periodoSeleccionado, fechaSeleccionada])

  // Agrupar productos por fecha
  const agrupadoPorFecha = productos.reduce(
    (acc, producto) => {
      const fecha = new Date(producto.created_at).toISOString().split('T')[0]
      if (!acc[fecha]) {
        acc[fecha] = []
      }
      acc[fecha].push(producto)
      return acc
    },
    {} as Record<string, Producto[]>
  )

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatearHora = (fecha: string) => {
    const date = new Date(fecha)
    return date.toLocaleTimeString("es-ES", {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const totalPeriodo = productos.reduce((sum, producto) => sum + producto.precio, 0)

  if (loading) {
    return (
      <div className="flex-1 p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header con controles */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historial de Productos</h1>
          <p className="text-gray-600">Registro completo de tus productos registrados</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Selector de período */}
          <select 
            value={periodoSeleccionado}
            onChange={(e) => {
              setPeriodoSeleccionado(e.target.value)
              if (e.target.value !== "fecha_especifica") {
                setFechaSeleccionada("")
              }
            }}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ultima_semana">Última semana</option>
            <option value="ultimo_mes">Último mes</option>
            <option value="todos">Todos</option>
            <option value="fecha_especifica">Fecha específica</option>
          </select>

          {/* Selector de fecha específica */}
          {periodoSeleccionado === "fecha_especifica" && (
            <input
              type="date"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Período</p>
                <p className="text-2xl font-bold text-green-600">${totalPeriodo.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Mes</p>
                <p className="text-2xl font-bold text-blue-600">${estadisticasMes.totalVentas.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Productos Mes</p>
                <p className="text-2xl font-bold text-purple-600">{estadisticasMes.cantidadProductos}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Promedio</p>
                <p className="text-2xl font-bold text-orange-600">${estadisticasMes.promedioVenta.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <CalendarDays className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historial agrupado por fecha */}
      <div className="space-y-6">
        {Object.entries(agrupadoPorFecha)
          .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
          .map(([fecha, items]) => (
            <Card key={fecha}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg capitalize">{formatearFecha(fecha)}</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    {items.length} producto{items.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.map((producto) => (
                  <div
                    key={producto.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
                       
                          <Package className="w-6 h-6 text-blue-600" />
                        
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{producto.nombre}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Registrado a las {formatearHora(producto.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${producto.precio.toFixed(2)}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Registrado</Badge>
                    </div>
                  </div>
                ))}

                {/* Total del día */}
                <div className="border-t pt-3 mt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-600">Total del día:</span>
                    <span className="font-bold text-gray-900">
                      ${items.reduce((sum, item) => sum + item.precio, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Mensaje si no hay datos */}
      {productos.length === 0 && !loading && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {periodoSeleccionado === "fecha_especifica" && fechaSeleccionada 
                ? `No hay productos para la fecha ${fechaSeleccionada}`
                : "No hay productos en este período"
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {periodoSeleccionado === "fecha_especifica" 
                ? "Intenta seleccionar otra fecha"
                : "Comienza a registrar productos para ver tu historial aquí"
              }
            </p>
            <Button onClick={() => obtenerProductos()}>
              <Package className="w-4 h-4 mr-2" />
              Actualizar
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}