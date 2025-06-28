import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Leaf,
  Scale,
  Package,
  Calendar,
  Clock,
  FileText,
  Building,
  MapPin,
  Save,
  ArrowLeft,
  AlertCircle,
} from "lucide-react"

export default function RecoForm() {
  const navigate = useNavigate()

  // Form state
  const [formData, setFormData] = useState({
    peso: "",
    volumen: "",
    tipoResiduoId: "",
    fecha: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
    hora: new Date().toTimeString().slice(0, 5), // Current time in HH:MM format
    observaciones: "",
    edificioId: "",
    sectorId: "",
  })

  // Data from API
  const [tiposResiduos, setTiposResiduos] = useState([])
  const [edificios, setEdificios] = useState([])
  const [sectores, setSectores] = useState([])

  // Loading and error states
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")

  // Fetch tipos de residuos on component mount
  useEffect(() => {
    fetchTiposResiduos()
    fetchEdificios()
  }, [])

  // Fetch sectors when edificio changes
  useEffect(() => {
    if (formData.edificioId) {
      fetchSectores(formData.edificioId)
    } else {
      setSectores([])
      setFormData((prev) => ({ ...prev, sectorId: "" }))
    }
  }, [formData.edificioId])


  const fetchTiposResiduos = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/retrievals/types")
      if (response.ok) {
        const data = await response.json()
        setTiposResiduos(data)
      } else {
        setApiError("Error al cargar tipos de residuos")
      }
    } catch (error) {
      setApiError("Error de conexión al cargar tipos de residuos")
    }
  }


  const fetchEdificios = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + `/buildings/summary`)
      if (response.ok) {
        const data = await response.json()
        setEdificios(data)
      } else {
        setApiError("Error al cargar edificios")
      }
    } catch (error) {
      setApiError("Error de conexión al cargar edificios")
    }
  }

  const fetchSectores = async (edificioId) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + `/${edificioId}/sector/summary`)
      if (response.ok) {
        const data = await response.json()
        setSectores(data)
      } else {
        setApiError("Error al cargar sectores")
      }
    } catch (error) {
      setApiError("Error de conexión al cargar sectores")
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Peso is always required
    if (!formData.peso) {
      newErrors.peso = "Debe ingresar peso"
    }

    // Required fields
    if (!formData.tipoResiduoId) newErrors.tipoResiduoId = "Tipo de residuo es requerido"
    if (!formData.fecha) newErrors.fecha = "Fecha es requerida"
    if (!formData.hora) newErrors.hora = "Hora es requerida"
    if (!formData.edificioId) newErrors.edificioId = "Edificio es requerido"
    if (!formData.sectorId) newErrors.sectorId = "Sector es requerido"

    // Date validation (only past dates allowed)
    const selectedDate = new Date(formData.fecha)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selectedDate > today) {
      newErrors.fecha = "Solo se permiten fechas pasadas o la actual"
    }

    // Observaciones length validation
    if (formData.observaciones.length > 255) {
      newErrors.observaciones = "Las observaciones no pueden exceder 255 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      // Here you would submit to your backend
      console.log("Submitting medición:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success - redirect or show success message
      alert("Medición guardada exitosamente")
      navigate("/") // or wherever you want to redirect
    } catch (error) {
      setApiError("Error al guardar la medición")
    } finally {
      setLoading(false)
    }
  }

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES")
  }

  const getMaxDate = () => {
    return new Date().toISOString().split("T")[0]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-20"></div>
              <div className="relative bg-white rounded-full p-3 shadow-lg">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-900 mb-2">Nueva Medición</h1>
          <p className="text-green-700">Registra una nueva medición de residuos</p>
        </div>

        {/* API Error Alert */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{apiError}</span>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Peso and Volumen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-800 flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.peso}
                  onChange={(e) => handleInputChange("peso", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg bg-green-50/50 text-green-900 placeholder-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all ${
                    errors.peso ? "border-red-300 focus:border-red-500" : "border-green-200 focus:border-green-500"
                  }`}
                  placeholder="0.00"
                />
                {errors.peso && <p className="text-sm text-red-600">{errors.peso}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-green-800 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Volumen (L)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.volumen}
                  onChange={(e) => handleInputChange("volumen", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg bg-green-50/50 text-green-900 placeholder-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all ${
                    errors.volumen ? "border-red-300 focus:border-red-500" : "border-green-200 focus:border-green-500"
                  }`}
                  placeholder="0.00"
                />
                {errors.volumen && <p className="text-sm text-red-600">{errors.volumen}</p>}
              </div>
            </div>

            {/* Tipo de Residuo */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-800 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Tipo de Residuo *
              </label>
              <select
                value={formData.tipoResiduoId}
                onChange={(e) => handleInputChange("tipoResiduoId", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg bg-green-50/50 text-green-900 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all ${
                  errors.tipoResiduoId
                    ? "border-red-300 focus:border-red-500"
                    : "border-green-200 focus:border-green-500"
                }`}
              >
                <option value="">Seleccionar tipo de residuo</option>
                {tiposResiduos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
              {errors.tipoResiduoId && <p className="text-sm text-red-600">{errors.tipoResiduoId}</p>}
            </div>

            {/* Fecha and Hora */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-800 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Fecha *
                </label>
                <input
                  type="date"
                  value={formData.fecha}
                  max={getMaxDate()}
                  onChange={(e) => handleInputChange("fecha", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg bg-green-50/50 text-green-900 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all ${
                    errors.fecha ? "border-red-300 focus:border-red-500" : "border-green-200 focus:border-green-500"
                  }`}
                />
                {errors.fecha && <p className="text-sm text-red-600">{errors.fecha}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-green-800 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hora *
                </label>
                <input
                  type="time"
                  value={formData.hora}
                  onChange={(e) => handleInputChange("hora", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg bg-green-50/50 text-green-900 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all ${
                    errors.hora ? "border-red-300 focus:border-red-500" : "border-green-200 focus:border-green-500"
                  }`}
                />
                {errors.hora && <p className="text-sm text-red-600">{errors.hora}</p>}
              </div>
            </div>

            {/* Edificio and Sector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-800 flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Edificio *
                </label>
                <select
                  value={formData.edificioId}
                  onChange={(e) => handleInputChange("edificioId", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg bg-green-50/50 text-green-900 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all ${
                    errors.edificioId
                      ? "border-red-300 focus:border-red-500"
                      : "border-green-200 focus:border-green-500"
                  }`}
                >
                  <option value="">Seleccionar edificio</option>
                  {edificios.map((edificio) => (
                    <option key={edificio.id} value={edificio.id}>
                      {edificio.nombre}
                    </option>
                  ))}
                </select>
                {errors.edificioId && <p className="text-sm text-red-600">{errors.edificioId}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-green-800 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Sector *
                </label>
                <select
                  value={formData.sectorId}
                  onChange={(e) => handleInputChange("sectorId", e.target.value)}
                  disabled={!formData.edificioId}
                  className={`w-full px-4 py-3 border rounded-lg bg-green-50/50 text-green-900 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.sectorId ? "border-red-300 focus:border-red-500" : "border-green-200 focus:border-green-500"
                  }`}
                >
                  <option value="">
                    {formData.edificioId ? "Seleccionar sector" : "Primero seleccione un edificio"}
                  </option>
                  {sectores.map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.nombre}
                    </option>
                  ))}
                </select>
                {errors.sectorId && <p className="text-sm text-red-600">{errors.sectorId}</p>}
              </div>
            </div>

            {/* Observaciones */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-800 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Observaciones
              </label>
              <textarea
                value={formData.observaciones}
                onChange={(e) => handleInputChange("observaciones", e.target.value)}
                maxLength={255}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg bg-green-50/50 text-green-900 placeholder-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none ${
                  errors.observaciones
                    ? "border-red-300 focus:border-red-500"
                    : "border-green-200 focus:border-green-500"
                }`}
                placeholder="Ingrese cualquier observación adicional..."
              />
              <div className="flex justify-between items-center">
                {errors.observaciones && <p className="text-sm text-red-600">{errors.observaciones}</p>}
                <p className="text-sm text-green-600 ml-auto">{formData.observaciones.length}/255 caracteres</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Guardar Medición
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center px-6 py-3 border border-green-600 text-green-600 bg-transparent rounded-lg font-medium hover:bg-green-50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}