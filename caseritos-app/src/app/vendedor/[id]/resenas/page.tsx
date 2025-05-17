"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, StarRating, Modal } from "@/components/ui-components"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, ChevronDown, Loader2, ArrowLeft } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Datos de ejemplo para las reseñas
const reseñasData = [
  {
    id: "1",
    comprador: { id: "c001", nombre: "Juan Pérez", avatar: "/man-avatar.png" },
    rating: 5,
    texto:
      "Excelentes productos, siempre frescos y de gran calidad. María es muy amable y siempre tiene buenos consejos sobre cómo preparar sus productos.",
    imagen: "/market-products.png",
    fecha: new Date(2025, 3, 20),
  },
  {
    id: "2",
    comprador: { id: "c002", nombre: "Ana García", avatar: "/woman-avatar-2.png" },
    rating: 4,
    texto: "Muy buena atención y productos de calidad. Recomiendo especialmente sus tomates y lechugas.",
    imagen: "/vibrant-vegetable-market.png",
    fecha: new Date(2025, 2, 15),
  },
  {
    id: "3",
    comprador: { id: "c003", nombre: "Carlos Rodríguez", avatar: "/man-avatar-2.png" },
    rating: 5,
    texto: "Increíble experiencia de compra. Los productos son de primera calidad y el trato es excelente.",
    imagen: "/vibrant-fruit-market.png",
    fecha: new Date(2025, 1, 28),
  },
  {
    id: "4",
    comprador: { id: "c004", nombre: "Laura Martínez", avatar: "/diverse-woman-avatar.png" },
    rating: 3,
    texto: "Productos buenos pero la atención podría mejorar. A veces hay que esperar mucho tiempo.",
    imagen: null,
    fecha: new Date(2025, 1, 10),
  },
]

export default function ReseñasVendedor({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [reseñas, setReseñas] = useState(reseñasData)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [expandedReviews, setExpandedReviews] = useState<string[]>([])

  const toggleExpandReview = (id: string) => {
    setExpandedReviews((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleLoadMore = async () => {
    setLoading(true)

    // Simulación de carga de más reseñas
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Duplicamos las reseñas existentes para simular la carga de más
    setReseñas((prev) => [
      ...prev,
      ...reseñasData.map((reseña) => ({
        ...reseña,
        id: `${reseña.id}-duplicate-${Date.now()}`,
      })),
    ])

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container max-w-3xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`/vendedor/${params.id}`)}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Image
                src="/logo_caserito_customer.png"
                alt="Caserito Logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
            </div>
            <Button
              onClick={() => router.push(`/review/${params.id}`)}
              size="sm"
              className="bg-caserito-green hover:bg-caserito-green/90 text-white"
            >
              Dejar reseña
            </Button>
          </div>

          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar reseñas..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">Calificación</DropdownMenuLabel>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <DropdownMenuItem key={rating}>
                      <div className="flex items-center">
                        <StarRating rating={rating} readOnly size={16} />
                        <span className="ml-2">({rating})</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">Fecha</DropdownMenuLabel>
                  <DropdownMenuItem>Más recientes</DropdownMenuItem>
                  <DropdownMenuItem>Más antiguas</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Todas las reseñas</h1>

        <div className="space-y-4">
          {reseñas.map((reseña) => (
            <Card key={reseña.id} className="overflow-hidden">
              <div className="flex items-center mb-3">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={reseña.comprador.avatar || "/placeholder.svg"} alt={reseña.comprador.nombre} />
                  <AvatarFallback>{reseña.comprador.nombre.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{reseña.comprador.nombre}</h3>
                  <div className="flex items-center">
                    <StarRating rating={reseña.rating} readOnly size={16} />
                    <span className="text-xs text-muted-foreground ml-2">
                      {format(reseña.fecha, "d MMM yyyy", { locale: es })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <p className={expandedReviews.includes(reseña.id) ? "" : "line-clamp-3"}>{reseña.texto}</p>
                {reseña.texto.length > 150 && (
                  <button onClick={() => toggleExpandReview(reseña.id)} className="text-sm text-primary mt-1">
                    {expandedReviews.includes(reseña.id) ? "Ver menos" : "Ver más"}
                  </button>
                )}
              </div>

              {reseña.imagen && (
                <div className="relative w-full h-48 cursor-pointer" onClick={() => setSelectedImage(reseña.imagen)}>
                  <Image
                    src={reseña.imagen || "/placeholder.svg"}
                    alt="Imagen de la reseña"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
            </Card>
          ))}

          <div className="flex justify-center py-4">
            <Button variant="outline" onClick={handleLoadMore} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cargando...
                </>
              ) : (
                <>
                  Cargar más
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>

      {/* Modal para ver imagen ampliada */}
      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        <div className="relative w-full aspect-video">
          {selectedImage && (
            <Image src={selectedImage || "/placeholder.svg"} alt="Imagen ampliada" fill className="object-contain" />
          )}
        </div>
      </Modal>
    </div>
  )
}
