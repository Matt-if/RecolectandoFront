import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Leaf, TreePine, Droplets, Sun, Recycle, Wind, Users, Target, TrendingUp, Mail, Phone, MapPin, Menu, X} from "lucide-react"
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleFilterChange = (newFilters) => {
    setChartFilters(newFilters);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

            {/* Desktop Navigation - Hide on mobile/tablet */}
            <nav className="ml-auto hidden lg:flex items-center gap-6">
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

            {/* Mobile Burger Menu Button - Show only on mobile/tablet */}
            <button
              className="lg:hidden p-2 text-green-700 hover:text-green-600"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-green-100 lg:hidden">
              <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <a 
                  href="#impacto" 
                  className="text-base font-medium text-green-700 hover:text-green-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Impacto
                </a>
                <a 
                  href="#nosotros" 
                  className="text-base font-medium text-green-700 hover:text-green-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </a>
                <a 
                  href="#separacion-residuos" 
                  className="text-base font-medium text-green-700 hover:text-green-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Separación de Residuos
                </a>
                <a 
                  href="#novedades" 
                  className="text-base font-medium text-green-700 hover:text-green-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Novedades
                </a>
                <a 
                  href="#conocer-mas" 
                  className="text-base font-medium text-green-700 hover:text-green-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Conocer más
                </a>
                <a 
                  href="#preguntas-frecuentes" 
                  className="text-base font-medium text-green-700 hover:text-green-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Preguntas Frecuentes
                </a>
                <a 
                  href="#contacto" 
                  className="text-base font-medium text-green-700 hover:text-green-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </a>
                <Button 
                  href="/login" 
                  size="default" 
                  variant="outline" 
                  className="bg-green-600 hover:bg-green-700 cursor-pointer text-white text-lg px-8 py-4 w-fit mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Button>
              </nav>
            </div>
          )}
        </header>
      </UnauthenticatedOnly>
      
      <main className="flex-1">
        {/* Inicio (xl:pt-1 define padding entre titulo y container) */}
        <section id="inicio" className="w-full min-h-screen pt-2 pb-8 md:pt-4 md:pb-12 lg:pt-6 lg:pb-16 xl:pt-1 xl:pb-20 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1820px] h-full flex flex-col justify-center">
            {/* Logo y Título */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2 mb-8 lg:mb-2">
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
        <section id="impacto" className="w-full min-h-screen py-12 md:py-24 lg:py-20 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px]">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl text-white">¿SABIAS CUÁNTO DE NUESTROS RESIDUOS RECICLAMOS?</h2>
                <p className="max-w-[1200px] text-green-100 md:text-xl lg:text-xl xl:text-2xl leading-relaxed">
                  Averígualo con este gráfico interactivo!
                </p>
              </div>
            </div>
            {/* Grid layout for chart and additional content */}
            <div className="mx-auto w-full py-8 md:py-12">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-16">
                {/* Left column - Chart */}
                <div className="w-full">
                  <div className="bg-white p-4 md:p-5 lg:p-6 rounded-xl shadow-lg border-2 border-green-100">
                    <ChartFilter 
                      onFilterChange={handleFilterChange}
                      initialFilters={chartFilters}
                    />
                    <WeightWasteTypeBySector 
                      type={chartFilters.type}
                      year={chartFilters.year}
                      month={chartFilters.month}
                      className="w-full h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]"
                    />
                  </div>
                </div>
                
                {/* Right column - Your additional content */}
                <div className="w-full">
                  <div className="bg-white/10 backdrop-blur-sm p-4 md:p-5 lg:p-6 rounded-xl border border-white/20 h-full flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                      Ejemplo de contenido adicional
                    </h3>
                    <p className="text-green-100 text-base md:text-lg leading-relaxed">
                      Aquí podés agregar imágenes, estadísticas adicionales, texto explicativo 
                      o cualquier otro contenido que complemente el gráfico.
                    </p>
                    {/* Example for images */}
                    {/* <div className="mt-4 space-y-4">
                      <Image 
                        src={images.impacto.ejemplo1} 
                        alt="Descripción" 
                        className="rounded-lg shadow-lg w-full"
                      />
                      <Image 
                        src={images.impacto.ejemplo2} 
                        alt="Descripción" 
                        className="rounded-lg shadow-lg w-full"
                      />
                    </div> */}
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
              <Card className="border-green-200 bg-gradient-to-br from-green-400 to-emerald-600 hover:border-green-300 transition-all duration-300 hover:shadow-xl h-full">
                <CardContent className="flex flex-col h-full p-8">
                  {/* Sección de texto - ocupa 60% del espacio */}
                  <div className="flex-[3] flex flex-col justify-start space-y-6">
                    <h3 className="text-2xl font-bold text-center text-green-900">INORGÁNICOS RECICLABLES</h3>
                    <p className="text-center text-white text-lg leading-relaxed">
                      Residuos que no tienen origen biológico y fueron generados mediante algún proceso.
                      Se caracterizan por poder ser recuperados para su reutilización o reciclado.
                    </p>
                    <p className="text-center text-white text-xl leading-relaxed">
                      <b>Vidrios, plástico y goma, metales, textiles, materiales inertes. </b>
                    </p>
                  </div>
                  {/* Sección de imagen - ocupa 40% del espacio */}
                  <div className="flex-[2] flex items-center justify-center">
                    <Image src={images.separacion_residuos.tacho_verde} 
                    alt="Tacho verde"
                    className="h-70 w-70 object-contain"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-green-400 to-emerald-600 hover:border-green-300 transition-all duration-300 hover:shadow-xl h-full">
                <CardContent className="flex flex-col h-full p-8">
                  {/* Sección de texto - ocupa 60% del espacio */}
                  <div className="flex-[3] flex flex-col justify-start space-y-6">
                    <h3 className="text-2xl font-bold text-center text-green-900">NO RECICLABLES</h3>
                    <p className="text-center text-white text-lg leading-relaxed">
                      Materiales que no pueden reutilizarse por composición o contaminación.
                    </p>
                    <p className="text-center text-white text-xl leading-relaxed">
                      <b>Papeles y cartones sucios, cigarrillos.</b>
                    </p>
                  </div>
                  {/* Sección de imagen - ocupa 40% del espacio */}
                  <div className="flex-[2] flex items-center justify-center">
                    <Image src={images.separacion_residuos.tacho_negro} 
                    alt="Tacho negro"
                    className="h-70 w-70 object-contain"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-green-400 to-emerald-600 hover:border-green-300 transition-all duration-300 hover:shadow-xl h-full">
                <CardContent className="flex flex-col h-full p-8">
                  {/* Sección de texto - ocupa 60% del espacio */}
                  <div className="flex-[3] flex flex-col justify-start space-y-6">
                    <h3 className="text-2xl font-bold text-center text-green-900">ORGÁNICOS DE ORIGEN VEGETAL COMPOSTABLES</h3>
                    <p className="text-center text-white text-lg leading-relaxed">
                      Se caracterizan por ser fácilmente degradables por bacterias para producir compost.
                    </p>
                    <p className="text-center text-white text-xl leading-relaxed">
                      <b>Yerba, café, infusiones, cáscaras, carozos y restos de frutas/verduras, servilletas de papel, cáscaras de huevo (único material de origen animal!).</b>
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
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px]">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl text-green-900">
                  Últimas Novedades
                </h2>
                <p className="max-w-[1000px] text-green-700 md:text-xl lg:text-xl xl:text-2xl leading-relaxed">
                  Mantente al día con las últimas actividades, logros y proyectos del Programa de Gestión Ambiental
                </p>
              </div>
            </div>

            {/* Grid de novedades */}
            <div className="mx-auto grid max-w-[1500px] items-start gap-8 py-12 lg:grid-cols-3 lg:gap-12 xl:gap-16">
              {/* Novedad 1 */}
              <Card className="border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      Nuevo Proyecto
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-3">
                    Composteras Comunitarias en la FCNyM
                  </h3>
                  <p className="text-green-700 text-base leading-relaxed flex-grow">
                    Inauguramos nuevas composteras comunitarias que permitirán procesar hasta 200kg de residuos orgánicos semanales. 
                    Un gran paso hacia la sustentabilidad en nuestra facultad.
                  </p>
                  <div className="mt-4 pt-4 border-t border-green-100">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <TreePine className="h-4 w-4" />
                      <span>15 de Julio, 2025</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Novedad 2 */}
              <Card className="border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                      Logro Destacado
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-3">
                    1 Tonelada de Residuos Reciclados
                  </h3>
                  <p className="text-green-700 text-base leading-relaxed flex-grow">
                    ¡Celebramos haber alcanzado la marca de 1 tonelada de residuos reciclados este año! 
                    Gracias a la participación activa de toda la comunidad universitaria.
                  </p>
                  <div className="mt-4 pt-4 border-t border-green-100">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Recycle className="h-4 w-4" />
                      <span>10 de Julio, 2025</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Novedad 3 */}
              <Card className="border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200">
                      Próximo Evento
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-3">
                    Taller de Lombricompostaje
                  </h3>
                  <p className="text-green-700 text-base leading-relaxed flex-grow">
                    Únete a nuestro próximo taller donde aprenderás todo sobre lombricompostaje. 
                    ¡Inscripciones abiertas para estudiantes y personal de la facultad!
                  </p>
                  <div className="mt-4 pt-4 border-t border-green-100">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Users className="h-4 w-4" />
                      <span>5 de Agosto, 2025</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Newsletter Subscription */}
            <div className="flex flex-col items-center justify-center space-y-6 text-center mt-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-900">
                  ¿Querés estar al día con nuestras actividades?
                </h3>
                <p className="max-w-[600px] text-green-700 text-lg leading-relaxed">
                  Suscribite a nuestro boletín y recibí las últimas novedades del PGA directamente en tu correo.
                </p>
              </div>
              <div className="w-full max-w-md space-y-4">
                <form className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Ingresá tu email"
                    className="flex-1 border-green-300 focus:border-green-500 bg-white"
                  />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 px-6">
                    Suscribirse
                  </Button>
                </form>
                <p className="text-sm text-green-600">
                  Recibirás actualizaciones mensuales. Sin spam, podés cancelar cuando quieras.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Conocer más */}
        <section id="conocer-mas" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px]">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl text-green-900">
                  Conocé más sobre nuestro trabajo
                </h2>
                <p className="max-w-[1000px] text-green-700 md:text-xl lg:text-xl xl:text-2xl leading-relaxed">
                  Descubrí cómo gestionamos los residuos de manera integral en la FCNyM
                </p>
              </div>
            </div>

            {/* Introducción */}
            <div className="mx-auto max-w-[1400px] py-12 space-y-8">
              <div className="space-y-6">
                <p className="text-green-700 text-lg md:text-xl leading-relaxed text-center">
                  El crecimiento demográfico y económico ha incrementado la generación de residuos, intensificando el deterioro ambiental.
                  Esto nos obliga a repensar nuestras estrategias de producción y consumo para cuidar el medio ambiente y la salud.
                </p>
                
                <p className="text-green-700 text-base md:text-lg leading-relaxed">
                  El Programa de Gestión Integral de Residuos se encarga de gestionar los Residuos Sólidos Urbanos (RSU) de la institución 
                  a través de la separación en origen. Para ello, se aplican técnicas de clasificación selectiva en tres categorías 
                  diferenciadas por color (orgánicos de origen vegetal, inorgánicos reciclables y no reciclables) con la finalidad de 
                  diferenciar los residuos, asignarles distintos destinos y lograr disminuir el volumen enviado al relleno sanitario CEAMSE.
                </p>
                
                <p className="text-green-700 text-base md:text-lg leading-relaxed">
                  De esta manera, mientras la fracción orgánica es recolectada y compostada por los alumnos becarios del Programa para 
                  su uso en el Vivero de la facultad, los materiales no orgánicos reciclables son separados y recolectados por la 
                  Cooperativa Unión de Cartoneros Platenses para su tratamiento y reutilización, promoviendo de esta forma una activa 
                  participación y vinculación con distintos actores sociales.
                </p>
                
                <p className="text-green-700 text-base md:text-lg leading-relaxed">
                  Además, como un complemento imprescindible y en forma paralela, se realizan una serie de actividades de concientización 
                  y difusión como charlas, talleres y cursos, con el propósito de crear espacios educativos holísticos que promuevan un 
                  cambio positivo en la conciencia de la comunidad.
                </p>

                <p className="text-green-700 text-base md:text-lg leading-relaxed">
                  De esta forma, el Programa de Gestión Integral de Residuos de la FCNyM intenta abordar de manera sistémica e interdisciplinaria diversos aspectos vinculados 
                  a la problemática en el ámbito de la facultad, promoviendo una conciencia crítica acerca de la situación de los RSU en la región, 
                  que se traduzca en acciones concretas que apunten a cambios en nuestras conductas, 
                  tanto en el ámbito académico, personal y social, buscando generar interés y compromiso por la gestión ambiental
                </p>
              </div>
            </div>

            {/* Etapas */}
            <div className="mx-auto max-w-[1500px] py-12">
              <h3 className="text-2xl md:text-3xl font-bold text-green-900 text-center mb-12">
                Etapas del Proceso
              </h3>
              
              <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
                {/* Etapa 1 */}
                <Card className="border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                  <CardContent className="p-6 flex flex-col h-full text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Recycle className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="text-xl font-bold text-green-900 mb-3">
                        Separación en origen
                      </h4>
                    </div>
                    <p className="text-green-700 text-base leading-relaxed flex-grow">
                      Aplicación de las 3R para minimizar residuos y optimizar recursos.
                    </p>
                  </CardContent>
                </Card>

                {/* Etapa 2 */}
                <Card className="border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                  <CardContent className="p-6 flex flex-col h-full text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="h-8 w-8 text-emerald-600" />
                      </div>
                      <h4 className="text-xl font-bold text-green-900 mb-3">
                        Tratamiento
                      </h4>
                    </div>
                    <p className="text-green-700 text-base leading-relaxed flex-grow">
                      Los residuos son tratados para su reutilización, reciclaje o eliminación.
                    </p>
                  </CardContent>
                </Card>

                {/* Etapa 3 */}
                <Card className="border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                  <CardContent className="p-6 flex flex-col h-full text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TreePine className="h-8 w-8 text-teal-600" />
                      </div>
                      <h4 className="text-xl font-bold text-green-900 mb-3">
                        Destino final
                      </h4>
                    </div>
                    <p className="text-green-700 text-base leading-relaxed flex-grow">
                      Los residuos son depositados en rellenos sanitarios, incinerados o se reutilizan en 
                      procesos industriales.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Beneficios */}
            <div className="mx-auto max-w-[1500px] py-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <h3 className="text-2xl md:text-3xl font-bold text-green-900 text-center mb-12">
                Beneficios de nuestro programa
              </h3>
              
              <div className="grid gap-8 md:grid-cols-3 lg:gap-12 px-6">
                {/* Beneficio 1 */}
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                    <Wind className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-green-900">
                    Reducción de gases de efecto invernadero
                  </h4>
                  <p className="text-green-700 text-base leading-relaxed">
                    Disminución de la contaminación y las emisiones de gases nocivos para el ambiente.
                  </p>
                </div>

                {/* Beneficio 2 */}
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Sun className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-green-900">
                    Mejora del suelo
                  </h4>
                  <p className="text-green-700 text-base leading-relaxed">
                    El compostaje de residuos orgánicos de origen vegetal, produce abono que enriquece el suelo.
                  </p>
                </div>

                {/* Beneficio 3 */}
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto">
                    <Droplets className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-green-900">
                    Conservación de recursos naturales
                  </h4>
                  <p className="text-green-700 text-base leading-relaxed">
                    El reciclaje y la reutilización contribuyen a la conservación de los recursos naturales y a la Economía Circular.
                  </p>
                </div>
              </div>
            </div>

            {/* Referencia */}
            <div className="mx-auto max-w-[1200px] py-8 text-center">
              <p className="text-sm text-green-600 italic">
                Fuente: <a href="http://sedici.unlp.edu.ar/handle/10915/173385" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-700">
                  http://sedici.unlp.edu.ar/handle/10915/173385
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section id="preguntas-frecuentes" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 to-emerald-50 border-t border-green-100">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px]">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl text-green-900">
                  Preguntas Frecuentes
                </h2>
                <p className="max-w-[1000px] text-green-700 md:text-xl lg:text-xl xl:text-2xl leading-relaxed">
                  Todo lo que necesitás saber sobre el Programa de Gestión Ambiental
                </p>
              </div>
            </div>

            {/* Grid de preguntas */}
            <div className="mx-auto grid max-w-[1500px] items-start gap-8 py-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              {/* Pregunta 1 */}
              <Card className="border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-3">
                      ¿Por qué no puedo tirar residuos de origen animal con los residuos orgánicos compostables si es materia orgánica?
                    </h3>
                  </div>
                  <p className="text-green-700 text-base leading-relaxed flex-grow">
                    Porque no.
                  </p>
                </CardContent>
              </Card>

              {/* Pregunta 2 */}
              <Card className="border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-3">
                      ¿Cómo puedo participar siendo estudiante?
                    </h3>
                  </div>
                  <p className="text-green-700 text-base leading-relaxed flex-grow">
                    Podés participar separando correctamente tus residuos, asistiendo a nuestros talleres, 
                    postulándote para una beca del programa, o simplemente difundiendo las buenas prácticas 
                    ambientales entre tus compañeros.
                  </p>
                </CardContent>
              </Card>

              {/* Pregunta 3 */}
              <Card className="border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                      <Recycle className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-3">
                      ¿Qué residuos se pueden compostar?
                    </h3>
                  </div>
                  <p className="text-green-700 text-base leading-relaxed flex-grow">
                    Residuos orgánicos de origen vegetal como yerba, café, cáscaras de frutas y verduras, 
                    servilletas de papel, y cáscaras de huevo. NO se compostan restos de carne, lácteos 
                    o aceites.
                  </p>
                </CardContent>
              </Card>

              {/* Pregunta 4 */}
              <Card className="border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <TreePine className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-3">
                      ¿Qué pasa con el compost que se produce?
                    </h3>
                  </div>
                  <p className="text-green-700 text-base leading-relaxed flex-grow">
                    El compost producido se utiliza en el vivero de la facultad para el crecimiento de plantas 
                    y árboles. De esta manera cerramos el ciclo y contribuimos al mantenimiento de los 
                    espacios verdes de la FCNyM.
                  </p>
                </CardContent>
              </Card>

              {/* Pregunta 5 */}
              <Card className="border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-3">
                      ¿Cuál es el impacto real del programa?
                    </h3>
                  </div>
                  <p className="text-green-700 text-base leading-relaxed flex-grow">
                    Hemos logrado reducir significativamente los residuos enviados al relleno sanitario, 
                    procesamos toneladas de material reciclable anualmente y generamos conciencia ambiental 
                    en miles de personas de la comunidad universitaria.
                  </p>
                </CardContent>
              </Card>

              {/* Pregunta 6 */}
              <Card className="border-green-200 bg-white hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                      <Mail className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-3">
                      ¿Cómo puedo contactarme para más información?
                    </h3>
                  </div>
                  <p className="text-green-700 text-base leading-relaxed flex-grow">
                    Podés acercarte a nuestras oficinas en la Secretaría de Extensión de la FCNyM, 
                    seguir nuestras redes sociales o participar en alguno de nuestros talleres y charlas 
                    que realizamos regularmente.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col items-center justify-center space-y-6 text-center mt-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-900">
                  ¿Tenés más preguntas?
                </h3>
                <p className="max-w-[600px] text-green-700 text-lg leading-relaxed">
                  No dudes en contactarnos. Estamos siempre dispuestos a resolver tus dudas y ayudarte a formar parte del cambio.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="#contacto" className="bg-green-600 hover:bg-green-700 px-8 py-3">
                  Contactanos
                </Button>
                <Button href="#novedades" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3">
                  Ver Próximos Talleres
                </Button>
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
            <span className="font-bold text-green-100">PROGRAMA DE GESTIÓN AMBIENTAL FCNyM - UNLP</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Desarrollado por </span>
            <a 
              href="https://linkedin.com/in/tu-perfil" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-300 hover:text-green-200 underline decoration-green-300 hover:decoration-green-200 transition-colors duration-200 font-medium"
            >
              Matías [Tu Apellido]
            </a>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>pga@mail.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>La Plata, Buenos Aires, Argentina</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
