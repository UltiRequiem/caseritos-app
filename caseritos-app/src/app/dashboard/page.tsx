"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StarRating } from "@/components/ui/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  ShoppingBag,
  User,
  Star,
  Settings,
  ExternalLink,
  Users,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card } from "@/components/ui/card";

// Datos de ejemplo para el vendedor
const vendedorData = {
  id: "v001",
  nombre: "María López",
  avatar: "/diverse-woman-avatar.png",
  tienda: "Frutas y Verduras Orgánicas",
  descripcion:
    "Vendo frutas y verduras orgánicas cultivadas en mi huerto familiar. Productos frescos y de temporada.",
  ubicacion: "Mercado Central, Puesto #42",
  miembroDesde: new Date(2023, 2, 15),
  calificacionPromedio: 4.7,
  totalReseñas: 28,
  ventasMes: 42,
  ingresosMes: 1250,
};

// Datos de ejemplo para las reseñas recientes
const reseñasRecientes = [
  {
    id: "1",
    cliente: "Juan Pérez",
    rating: 5,
    texto: "Excelentes productos, siempre frescos y de gran calidad.",
    fecha: new Date(2025, 3, 20),
  },
  {
    id: "2",
    cliente: "Ana García",
    rating: 4,
    texto: "Muy buena atención y productos de calidad.",
    fecha: new Date(2025, 2, 15),
  },
  {
    id: "3",
    cliente: "Carlos Rodríguez",
    rating: 5,
    texto:
      "Increíble experiencia de compra. Los productos son de primera calidad.",
    fecha: new Date(2025, 1, 28),
  },
];

// Datos de ejemplo para las ventas recientes
const ventasRecientes = [
  {
    id: "v1",
    cliente: "Laura Martínez",
    productos: "2kg Manzanas, 1kg Naranjas",
    monto: 15.5,
    fecha: new Date(2025, 3, 22),
  },
  {
    id: "v2",
    cliente: "Pedro Sánchez",
    productos: "3kg Papas, 1kg Cebollas, 500g Ajo",
    monto: 12.75,
    fecha: new Date(2025, 3, 21),
  },
  {
    id: "v3",
    cliente: "Sofía Ramírez",
    productos: "2kg Tomates, 1kg Pimientos",
    monto: 18.2,
    fecha: new Date(2025, 3, 20),
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [linkCopied, setLinkCopied] = useState(false);

  const copyProfileLink = () => {
    const profileUrl = `${window.location.origin}/review/${vendedorData.id}`;
    navigator.clipboard.writeText(profileUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/logo_caserito_customer.png"
                alt="Caserito Logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <h1 className="text-xl font-bold ml-2 hidden sm:block">
                Caserito
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/perfil")}
              >
                <User className="h-5 w-5" />
                <span className="ml-2 hidden sm:inline">Mi Perfil</span>
              </Button>
              <Avatar
                className="h-8 w-8 cursor-pointer"
                onClick={() => router.push("/perfil")}
              >
                <AvatarImage
                  src={vendedorData.avatar || "/placeholder.svg"}
                  alt={vendedorData.nombre}
                />
                <AvatarFallback>{vendedorData.nombre.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar en pantallas medianas y grandes */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <div className="flex flex-col items-center mb-6 p-4">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarImage
                    src={vendedorData.avatar || "/placeholder.svg"}
                    alt={vendedorData.nombre}
                  />
                  <AvatarFallback>
                    {vendedorData.nombre.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-bold text-center">
                  {vendedorData.nombre}
                </h2>
                <p className="text-sm text-muted-foreground text-center">
                  {vendedorData.tienda}
                </p>
                <div className="flex items-center mt-2">
                  <StarRating
                    rating={Math.round(vendedorData.calificacionPromedio)}
                    readOnly
                    size={16}
                  />
                  <span className="ml-2 text-sm">
                    {vendedorData.calificacionPromedio.toFixed(1)}
                  </span>
                </div>
              </div>

              <nav className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => router.push("/dashboard")}
                >
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => router.push("/ventas")}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Ventas
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => router.push("/resenas")}
                >
                  <Star className="h-5 w-5 mr-2" />
                  Reseñas
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => router.push("/perfil")}
                >
                  <User className="h-5 w-5 mr-2" />
                  Mi Perfil
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => router.push("/configuracion")}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Configuración
                </Button>
              </nav>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Calificación
                    </p>
                    <h3 className="text-2xl font-bold mt-1">
                      {vendedorData.calificacionPromedio.toFixed(1)}
                    </h3>
                  </div>
                  <div className="bg-caserito-green/10 p-2 rounded-full">
                    <Star className="h-6 w-6 text-caserito-green" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  De {vendedorData.totalReseñas} reseñas
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Ventas del mes
                    </p>
                    <h3 className="text-2xl font-bold mt-1">
                      {vendedorData.ventasMes}
                    </h3>
                  </div>
                  <div className="bg-caserito-blue/10 p-2 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-caserito-blue" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-500">↑ 12%</span> vs. mes anterior
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Clientes nuevos
                    </p>
                    <h3 className="text-2xl font-bold mt-1">18</h3>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-500">↑ 15%</span> vs. mes anterior
                </p>
              </Card>
            </div>

            {/* Botón para generar nueva venta */}
            <Card className="p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">Generar nueva venta</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Registra una nueva venta para que tu cliente pueda dejar una
                reseña verificada
              </p>
              <Button
                onClick={() => router.push("/ventas/nueva")}
                className="w-full bg-caserito-green hover:bg-caserito-green/90"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Generar nueva venta
              </Button>
            </Card>

            {/* Tabs para reseñas y ventas recientes */}
            <Tabs defaultValue="resenas" className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="resenas">Reseñas recientes</TabsTrigger>
                <TabsTrigger value="ventas">Ventas recientes</TabsTrigger>
              </TabsList>
              <TabsContent value="resenas" className="mt-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Reseñas recientes</h2>
                    <Button
                      variant="link"
                      onClick={() => router.push("/resenas")}
                      className="text-xs flex items-center p-0 h-auto"
                    >
                      Ver todas
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {reseñasRecientes.map((reseña) => (
                      <div
                        key={reseña.id}
                        className="border-b pb-3 last:border-0"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{reseña.cliente}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(reseña.fecha, "d MMM yyyy", { locale: es })}
                          </p>
                        </div>
                        <div className="flex items-center mb-2">
                          <StarRating
                            rating={reseña.rating}
                            readOnly
                            size={14}
                          />
                        </div>
                        <p className="text-sm">{reseña.texto}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="ventas" className="mt-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Ventas recientes</h2>
                    <Button
                      variant="link"
                      onClick={() => router.push("/ventas")}
                      className="text-xs flex items-center p-0 h-auto"
                    >
                      Ver todas
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {ventasRecientes.map((venta) => (
                      <div
                        key={venta.id}
                        className="border-b pb-3 last:border-0"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{venta.cliente}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(venta.fecha, "d MMM yyyy", { locale: es })}
                          </p>
                        </div>
                        <p className="text-sm mb-1">{venta.productos}</p>
                        <p className="text-sm font-bold">
                          ${venta.monto.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Calendario de actividad */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Actividad reciente</h2>
                <Button variant="outline" size="sm" className="text-xs">
                  <Calendar className="h-4 w-4 mr-1" />
                  Este mes
                </Button>
              </div>
              <div className="h-48 flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Gráfico de actividad (ventas y reseñas)
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Barra de navegación móvil */}
      <div className="md:hidden bg-white border-t fixed bottom-0 left-0 right-0 z-10">
        <div className="flex justify-around p-2">
          <Button
            variant="ghost"
            className="flex flex-col items-center p-2"
            onClick={() => router.push("/dashboard")}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center p-2"
            onClick={() => router.push("/ventas")}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs mt-1">Ventas</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center p-2"
            onClick={() => router.push("/resenas")}
          >
            <Star className="h-5 w-5" />
            <span className="text-xs mt-1">Reseñas</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center p-2"
            onClick={() => router.push("/perfil")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
