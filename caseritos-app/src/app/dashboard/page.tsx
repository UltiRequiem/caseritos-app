import { StarRating } from "@//components/ui/star-rating";
import { Button } from "@//components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@//components/ui/tabs";
import { ShoppingBag, Star, ExternalLink, Users, Calendar } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card } from "@//components/ui/card";
import Link from "next/link";

const recentReviews = [
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

const recentSales = [
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

export default async function DashboardPage() {
  const recentViews = await ;

  return (
    <div className="flex-1">
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Calificación</p>
              <h3 className="text-2xl font-bold mt-1">
                {sellerData.averageRating.toFixed(1)}
              </h3>
            </div>
            <div className="bg-caserito-green/10 p-2 rounded-full">
              <Star className="h-6 w-6 text-caserito-green" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            De {sellerData.totalReviews} reseñas
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ventas del mes</p>
              <h3 className="text-2xl font-bold mt-1">
                {sellerData.ventasMes}
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
              <p className="text-sm text-muted-foreground">Clientes nuevos</p>
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
          Registra una nueva venta para que tu cliente pueda dejar una reseña
          verificada
        </p>
        <Link href={"/dashboard/sales/"}>
          <Button className="w-full bg-caserito-green hover:bg-caserito-green/90">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Generar nueva venta
          </Button>
        </Link>
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
              <Link href={"/dashboard/reviews"}>
                <Button
                  variant="link"
                  className="text-xs flex items-center p-0 h-auto"
                >
                  Ver todas
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentReviews.map((reseña) => (
                <div key={reseña.id} className="border-b pb-3 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{reseña.cliente}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(reseña.fecha, "d MMM yyyy", { locale: es })}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <StarRating rating={reseña.rating} readOnly size={14} />
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
              <Link href={"/dashboard/sales"}>
                <Button
                  variant="link"
                  className="text-xs flex items-center p-0 h-auto"
                >
                  Ver todas
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentSales.map((venta) => (
                <div key={venta.id} className="border-b pb-3 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{venta.cliente}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(venta.fecha, "d MMM yyyy", { locale: es })}
                    </p>
                  </div>
                  <p className="text-sm mb-1">{venta.productos}</p>
                  <p className="text-sm font-bold">${venta.monto.toFixed(2)}</p>
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
  );
}
