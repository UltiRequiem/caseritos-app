"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui-components"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingBag, ExternalLink, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui-components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Datos de ejemplo para el vendedor
const vendedorData = {
  id: "v001",
  nombre: "María López",
  avatar: "/diverse-woman-avatar.png",
  tienda: "Frutas y Verduras Orgánicas",
}

// Datos de ejemplo para los productos
const productosData = [
  {
    id: "p1",
    nombre: "Manzanas Orgánicas",
    descripcion: "Manzanas rojas orgánicas, frescas y jugosas. Cultivadas sin pesticidas.",
    precio: 2.5,
    unidad: "kg",
    imagen: "/market-products.png",
    disponible: true,
    calificacionPromedio: 4.8,
    totalReseñas: 12,
  },
  {
    id: "p2",
    nombre: "Naranjas de Valencia",
    descripcion: "Naranjas de Valencia, dulces y jugosas. Ideales para zumo.",
    precio: 1.8,
    unidad: "kg",
    imagen: "/vibrant-fruit-market.png",
    disponible: true,
    calificacionPromedio: 4.5,
    totalReseñas: 8,
  },
  {
    id: "p3",
    nombre: "Tomates Frescos",
    descripcion: "Tomates frescos de temporada, perfectos para ensaladas.",
    precio: 2.2,
    unidad: "kg",
    imagen: "/vibrant-vegetable-market.png",
    disponible: true,
    calificacionPromedio: 4.7,
    totalReseñas: 15,
  },
  {
    id: "p4",
    nombre: "Lechugas Variadas",
    descripcion: "Diferentes variedades de lechuga fresca y crujiente.",
    precio: 1.0,
    unidad: "unidad",
    imagen: "/fresh-lettuce.png",
    disponible: false,
    calificacionPromedio: 4.6,
    totalReseñas: 9,
  },
]

export default function ProductosVendedor({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [productos] = useState(productosData)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container max-w-3xl mx-auto p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.push(`/vendedor/${params.id}`)} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <Image
                src="/logo_caserito_customer.png"
                alt="Caserito Logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <h1 className="text-xl font-bold ml-2 hidden sm:block">Caserito</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Productos de {vendedorData.nombre}</h1>
            <p className="text-muted-foreground">{vendedorData.tienda}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="h-5 w-5 text-caserito-green" />
            <h2 className="text-lg font-bold">Productos disponibles</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Para dejar una reseña, primero debes realizar una compra verificada con este vendedor. Contacta directamente
            con el vendedor para realizar tu compra.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productos.map((producto) => (
              <Card key={producto.id} className="overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={producto.imagen || "/placeholder.svg"}
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                  />
                  {!producto.disponible && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge variant="destructive" className="text-sm">
                        No disponible
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{producto.nombre}</h3>
                    <p className="font-bold text-caserito-green">
                      ${producto.precio.toFixed(2)}/{producto.unidad}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{producto.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <StarRating rating={Math.round(producto.calificacionPromedio)} readOnly size={16} />
                      <span className="text-xs text-muted-foreground ml-2">({producto.totalReseñas})</span>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Las reseñas solo pueden dejarse después de una compra verificada</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => router.push(`/vendedor/${params.id}/resenas`)}
            className="inline-flex items-center"
          >
            Ver reseñas de este vendedor
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}
