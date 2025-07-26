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
        {/* Inicio (primer vistazo) */}
        <section id="inicio" className="w-full py-6 md:py-12 lg:py-16 xl:py-24 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px]">
            <div className="grid gap-8 lg:grid-cols-[1fr_600px] lg:gap-20 xl:grid-cols-[1fr_800px] xl:gap-24 2xl:grid-cols-[1fr_900px] 2xl:gap-28">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-3xl 2xl:text-7xl/none text-green-900">
                    PROGRAMA DE GESTIÓN AMBIENTAL FCNyM - UNLP
                  </h1>
                  <p className="max-w-[800px] text-green-700 md:text-xl lg:text-xl xl:text-2xl leading-relaxed">
                    “Mucha gente pequeña, en lugares pequeños, haciendo cosas pequeñas, pueden cambiar el mundo”. Eduardo Galeano
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button href="#conocer-mas" size="lg" className="bg-green-600 hover:bg-green-700 cursor-pointer text-white text-lg px-8 py-4">
                    Conocer más
                  </Button>
                </div>
                <div className="flex items-center gap-6 text-base text-green-600">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>50K+ Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TreePine className="h-5 w-5" />
                    <span>1M+ Trees Planted</span>
                  </div>
                </div>
              </div>
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
                      className="w-full h-[400px] lg:h-[450px] xl:h-[500px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Separacion de residuos */}
        <section id="separacion-residuos" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px]">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <Badge className="bg-emerald-100 text-emerald-800 w-fit">Our Solutions</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl text-green-900">
                  Comprehensive Eco Solutions
                </h2>
                <p className="max-w-[1200px] text-green-700 md:text-xl lg:text-xl xl:text-2xl leading-relaxed">
                  From renewable energy to waste reduction, we provide integrated solutions for a sustainable lifestyle.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-[1500px] items-start gap-8 py-12 lg:grid-cols-3 lg:gap-12 xl:gap-16">
              <Card className="border-green-200 hover:border-green-300 transition-colors h-full">
                <CardContent className="flex flex-col items-center space-y-6 p-8">
                  <div className="rounded-full bg-green-100 p-4">
                    <Sun className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900">Renewable Energy</h3>
                  <p className="text-center text-green-700 text-lg leading-relaxed">
                    Harness the power of solar, wind, and other renewable sources to reduce your carbon footprint.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-200 hover:border-green-300 transition-colors h-full">
                <CardContent className="flex flex-col items-center space-y-6 p-8">
                  <div className="rounded-full bg-emerald-100 p-4">
                    <Recycle className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900">Waste Management</h3>
                  <p className="text-center text-green-700 text-lg leading-relaxed">
                    Smart recycling and composting solutions that turn waste into valuable resources.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-green-200 hover:border-green-300 transition-colors h-full">
                <CardContent className="flex flex-col items-center space-y-6 p-8">
                  <div className="rounded-full bg-teal-100 p-4">
                    <Droplets className="h-10 w-10 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900">Water Conservation</h3>
                  <p className="text-center text-green-700 text-lg leading-relaxed">
                    Advanced systems for water purification, collection, and efficient usage management.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* impacto */}
        <section id="impacto" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px]">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl text-white">Our Environmental Impact</h2>
                <p className="max-w-[1200px] text-green-100 md:text-xl lg:text-xl xl:text-2xl leading-relaxed">
                  Together, we're making a measurable difference for our planet.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-[1500px] items-center gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16 xl:gap-20">
              <div className="flex flex-col items-center space-y-4 text-center">
                <TreePine className="h-16 w-16 text-green-200" />
                <div className="text-5xl xl:text-6xl font-bold text-white">1.2M</div>
                <p className="text-green-100 text-lg">Trees Planted</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Wind className="h-16 w-16 text-green-200" />
                <div className="text-5xl xl:text-6xl font-bold text-white">500K</div>
                <p className="text-green-100 text-lg">Tons CO₂ Reduced</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Droplets className="h-16 w-16 text-green-200" />
                <div className="text-5xl xl:text-6xl font-bold text-white">2.5M</div>
                <p className="text-green-100 text-lg">Gallons Water Saved</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Users className="h-16 w-16 text-green-200" />
                <div className="text-5xl xl:text-6xl font-bold text-white">50K+</div>
                <p className="text-green-100 text-lg">Community Members</p>
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
                  <Badge className="bg-green-100 text-green-800 w-fit">About EcoVision</Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl xl:text-6xl text-green-900">
                    Leading the Green Revolution
                  </h2>
                  <p className="max-w-[800px] text-green-700 md:text-xl lg:text-xl xl:text-2xl leading-relaxed">
                    For over a decade, we've been at the forefront of environmental innovation, developing sustainable
                    solutions that benefit both people and the planet.
                  </p>
                </div>
                <ul className="grid gap-4 py-6">
                  <li className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-green-700 text-lg">Carbon-neutral operations by 2025</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-green-700 text-lg">95% renewable energy usage</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Recycle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-green-700 text-lg">Zero waste to landfill policy</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&h=700&fit=crop&crop=center"
                  width="700"
                  height="700"
                  alt="Green Innovation"
                  className="aspect-square overflow-hidden rounded-xl object-cover max-w-full h-auto shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Novedades */}
        <section id="novedades" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 to-emerald-50 border-t border-green-100">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1400px]">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-green-900">
                  Ready to Make a Difference?
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
