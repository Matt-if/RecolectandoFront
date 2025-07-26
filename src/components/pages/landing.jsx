import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Leaf, TreePine, Droplets, Sun, Recycle, Wind, Users, Target, TrendingUp, Mail, Phone, MapPin} from "lucide-react"
import { UnauthenticatedOnly } from '../auth/ConditionalRender'
import WeightWasteTypeBySector from '../charts/weight-wasteType-by-sector'
import ChartFilter from '../ui/chartFilter'
import { images } from '../../assets/images'
import Image from '../ui/image'

export default function Landing() {
  const [chartFilters, setChartFilters] = useState({
    type: 'COMPOSTABLE',
    year: 2025,
    month: null
  });

  const handleFilterChange = (newFilters) => {
    setChartFilters(newFilters);
  };
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <UnauthenticatedOnly>
        <header className="px-4 lg:px-6 h-16 flex items-center border-b border-green-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto flex items-center justify-between max-w-[1920px] w-full">
            <a href="/" className="flex items-center justify-center">
              <Image src={images.logos.logoRecortado} alt="Logo" className="h-20 w-20 text-green-600" />
              <span className="ml-2 text-xl font-bold text-green-800 hidden sm:inline" >PGA</span>
            </a>
            <nav className="ml-auto flex items-center gap-6 sm:gap-6">
              <a href="#impacto" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                Impacto
              </a>
              <a href="#nosotros" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                Nosotros
              </a>
              <a href="#separacion-residuos" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                Separación de Residuos
              </a>
              <a href="#novedades" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                Novedades
              </a>
              <a href="#conocer-mas" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                Conocer más
              </a>
              <a href="#preguntas-frecuentes" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                Preguntas Frecuentes
              </a>
              <a href="#contacto" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                Contacto
              </a>
              <Button  href="/login" size="default" variant="outline" className="bg-green-600 hover:bg-green-700 cursor-pointer text-white text-lg px-8 py-4">
                Iniciar Sesión
              </Button>
            </nav>
          </div>
        </header>
      </UnauthenticatedOnly>
      
      <main className="flex-1">
        {/* Inicio */}
        <section id="inicio" className="w-full py-2 md:py-6 lg:py-8 xl:py-3 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1820px]">
            {/* Logo y Título */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2 mb-2">
              <div className="flex-shrink-0">
                <Image 
                  src={images.logos.logoRecortado} 
                  alt="Logo PGA" 
                  className="h-64 w-64 lg:h-72 lg:w-72 xl:h-80 xl:w-80"
                />
              </div>
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-green-900">
                  PROGRAMA DE GESTIÓN AMBIENTAL
                </h1>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl lg:text-4xl xl:text-5xl text-green-700 mt-2">
                  FCNyM - UNLP
                </h2>
              </div>
            </div>

            {/* Contenido inferior: Frase/Botón y Fotos */}
            <div className="grid gap-4 lg:grid-cols-[2fr_4fr] lg:gap-6 xl:gap-5">
              {/* Lado izquierdo: Frase y botón */}
              <div className="flex flex-col justify-center space-y-2 max-w-lg">
                <div className="space-y-1">
                  <p className="text-green-700 md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-medium">
                    "Mucha gente pequeña, en lugares pequeños, haciendo cosas pequeñas, pueden cambiar el mundo"
                  </p>
                  <p className="text-green-600 text-lg font-semibold">
                    - Eduardo Galeano
                  </p>
                </div>

                <div className="flex justify-right mt-28">
                  <Button href="#conocer-mas" size="lg" className="bg-green-600 hover:bg-green-700 cursor-pointer text-white text-lg px-10 py-4 w-fit">
                    Conocer más
                  </Button>
                </div>
              </div>
              {/* Lado derecho: Fotos */}
              <div className="flex flex-col gap-2 h-full">
                <div className="grid grid-cols-3 gap-2 h-full min-h-[400px]">
                  <Image 
                    src={images.inicio.recoleccion2} 
                    alt="Proceso de recolección" 
                    className="rounded-lg shadow-lg h-full w-full object-cover aspect-[3/4]"
                  />
                  <Image 
                    src={images.inicio.teamworkRamiro} 
                    alt="Trabajo en equipo" 
                    className="rounded-lg shadow-lg h-full w-full object-cover aspect-[3/4]"
                  />
                  <Image 
                    src={images.inicio.manosLombrices} 
                    alt="Trabajo con lombrices" 
                    className="rounded-lg shadow-lg h-full w-full object-cover aspect-[3/4]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* impacto */}
        <section id="impacto" className="w-full py-12 md:py-24 lg:py-18 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px]">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl text-white">¿SABIAS CUÁNTO DE NUESTROS RESIDUOS RECICLAMOS?</h2>
                <p className="max-w-[1200px] text-green-100 md:text-xl lg:text-xl xl:text-2xl leading-relaxed">
                  Averígualo con este gráfico interactivo!
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-[1500px] items-center gap-8 py-12 sm:grid-cols-2 lg:grid-cols-2 lg:gap-16 xl:gap-20">
              {/* div del grafico */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-[900px]">
                  <div className="bg-white p-5 rounded-xl shadow-lg border-2 border-green-100 w-full">
                    <ChartFilter 
                      onFilterChange={handleFilterChange}
                      initialFilters={chartFilters}
                    />
                    <WeightWasteTypeBySector 
                      type={chartFilters.type}
                      year={chartFilters.year}
                      month={chartFilters.month}
                      className="w-full h-[400px] lg:h-[450px] xl:h-[450px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nosotros */}
        <section id="nosotros" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px]">
            <div className="grid gap-8 lg:grid-cols-[1fr_600px] lg:gap-20 xl:grid-cols-[1fr_700px] xl:gap-24">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl text-green-900">
                    ¿Quiénes somos?
                  </h2>
                  <p className="max-w-[800px] text-green-700 md:text-xl lg:text-xl xl:text-2xl leading-relaxed">
                    El PGA es un espacio, dentro de la Secretaría de Extensión de la FCNyM, de
                    intercambio y debate que propone realizar actividades relacionadas a temáticas
                    ambientales, con el fin de obtener las herramientas adecuadas para promover
                    acciones sustentables dentro de la facultad, y que éstas puedan replicarse en
                    nuestro cotidiano y ser transmitidas al resto de la comunidad, como medio para
                    abordar las problemáticas ambientales en las que nos encontramos y generar un ambiente más sano.
                  </p>
                  <p className="text-green-700 text-lg">
                    En 2008 se creó el “Plan de Reciclaje de la FCNyM”, para luego en el 2011 convertirse en el Programa de Gestión Integral de Residuos (PGIR).
                    En el 2020 decidimos dar espacio a otras temáticas aparte de los residuos, y
                    desarrollamos el “Programa de Gestión Ambiental” (PGA).
                  </p>
                </div>
                <ul className="grid gap-4 py-6">
                  <li className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-green-700 text-lg">Programa de Gestión Ambiental (PGA)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-green-700 text-lg">En constante crecimiento</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Recycle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-green-700 text-lg">Reciclar es respetar el medio ambiente</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <Image  src={images.nosotros.compostaje}/>
              </div>
            </div>
          </div>
        </section>

        {/* Separacion de residuos */}
        <section id="separacion-residuos" className="w-full py-12 md:py-14 lg:py-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1700px]">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl text-green-900">
                  ¿Cómo separamos los residuos en la FCNyM?
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-[1500px] items-start gap-8 py-12 lg:grid-cols-3 lg:gap-12 xl:gap-16">
              <Card className="border-green-200 bg-transparent hover:border-green-300 transition-colors h-full">
                <CardContent className="flex flex-col h-full p-8">
                  {/* Sección de texto - ocupa 60% del espacio */}
                  <div className="flex-[3] flex flex-col justify-start space-y-6">
                    <h3 className="text-2xl font-bold text-green-900">INORGÁNICOS RECICLABLES</h3>
                    <p className="text-center text-green-700 text-lg leading-relaxed">
                      Residuos que no tienen origen biológico y fueron generados mediante algún proceso.
                      Vidrios, plástico y goma, metales, textiles, materiales inertes. 
                      Se caracterizan por ser residuos que pueden ser recuperados para su reutilización o reciclado.
                    </p>
                  </div>
                  {/* Sección de imagen - ocupa 40% del espacio */}
                  <div className="flex-[2] flex items-center justify-center">
                    <Image src={images.separacion_residuos.tacho_verde} 
                    alt="Tacho verde"
                    className="h-70 w-70 object-contain mix-blend-multiply"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:border-green-300 transition-colors h-full">
                <CardContent className="flex flex-col h-full p-8">
                  {/* Sección de texto - ocupa 60% del espacio */}
                  <div className="flex-[3] flex flex-col justify-start space-y-6">
                    <h3 className="text-2xl font-bold text-green-900">NO RECICLABLES</h3>
                    <p className="text-center text-green-700 text-lg leading-relaxed">
                      Materiales que no pueden reutilizarse por composición o contaminación.
                      Papeles y cartones sucios, cigarrillos.
                    </p>
                  </div>
                  {/* Sección de imagen - ocupa 40% del espacio */}
                  <div className="flex-[2] flex items-center justify-center">
                    <Image src={images.separacion_residuos.tacho_negro} 
                    alt="Tacho negro"
                    className="h-70 w-70 object-contain mix-blend-multiply"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:border-green-300 transition-colors h-full">
                <CardContent className="flex flex-col h-full p-8">
                  {/* Sección de texto - ocupa 60% del espacio */}
                  <div className="flex-[3] flex flex-col justify-start space-y-6">
                    <h3 className="text-2xl font-bold text-green-900">ORGÁNICOS DE ORIGEN VEGETAL COMPOSTABLES</h3>
                    <p className="text-center text-green-700 text-lg leading-relaxed">
                      Yerba, café, infusiones, cáscaras, carozos y restos de frutas/verduras, servilletas de papel, cáscaras de huevo (único material de origen animal!).
                      Se caracterizan por ser fácilmente degradables por bacterias para producir compost.
                    </p>
                  </div>
                  {/* Sección de imagen - ocupa 40% del espacio */}
                  <div className="flex-[2] flex items-center justify-center">
                    <Image src={images.separacion_residuos.tacho_verdosoAmarillo} 
                    alt="Tacho verdoso amarillo"
                    className="h-70 w-70 object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Novedades */}
        <section id="novedades" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 to-emerald-50 border-t border-green-100">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1400px]">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-900">
                  Ultimas novedades!
                </h2>
                <p className="max-w-[700px] text-green-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of eco-warriors who are already making a positive impact on our planet.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 border-green-300 focus:border-green-500"
                  />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Join Now
                  </Button>
                </form>
                <p className="text-xs text-green-600">Get weekly eco-tips and updates. No spam, unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Contacto */}
      <footer
        id="contacto"
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-green-200 bg-green-900 text-green-100"
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1400px]">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-400" />
            <span className="font-bold text-green-100">EcoVision</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>hello@ecovision.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
