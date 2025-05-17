"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, StarRating, Button, Modal } from "@/components/ui-components"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Share2, MapPin, Calendar, ExternalLink } from "lucide-react"

// Datos de ejemplo para el vendedor
const vendedorData = {
  id: "v001",
  nombre: "María López",
  avatar: "/diverse-woman-avatar.png",
  descripcion: "Vendo frutas y verduras orgánicas cultivadas en mi huerto familiar. Productos frescos y de temporada.",
  ubicacion: "Mercado Central, Puesto #42",
  miembroDesde: new Date(2023, 2, 15),
  calificacionPromedio: 4.7,
  totalReseñas: 28,
}

// Datos de ejemplo para las reseñas destacadas
const reseñasDestacadas = [
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
]

export default function PerfilVendedor({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [expandedReviews, setExpandedReviews] = useState<string[]>([])
  const [showShareOptions, setShowShareOptions] = useState(false)

  const toggleExpandReview = (id: string) => {
    setExpandedReviews((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleShare = () => {
    setShowShareOptions(true)
  }

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowShareOptions(false)
    // Aquí se podría mostrar un toast de confirmación
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container max-w-3xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <Image
              src="/logo_caserito_customer.png"
              alt="Caserito Logo"
              width={50}
              height={50}
              className="rounded-xl"
            />
            <Button
              onClick={() => router.push(`/vendedor/${params.id}/productos`)}
              size="sm"
              className="bg-caserito-green hover:bg-caserito-green/90 text-white"
            >
              Ver productos
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl mx-auto p-4">
        {/* Perfil del vendedor */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-24 w-24 border-4 border-white shadow-sm">
              <AvatarImage src={vendedorData.avatar || "/placeholder.svg"} alt={vendedorData.nombre} />
              <AvatarFallback>{vendedorData.nombre.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{vendedorData.nombre}</h1>
                  <div className="flex items-center mt-1">
                    <StarRating rating={Math.round(vendedorData.calificacionPromedio)} readOnly size={16} />
                    <span className="ml-2 text-sm font-medium">
                      {vendedorData.calificacionPromedio.toFixed(1)} ({vendedorData.totalReseñas} reseñas)
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              <p className="mt-3 text-muted-foreground">{vendedorData.descripcion}</p>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {vendedorData.ubicacion}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Miembro desde {format(vendedorData.miembroDesde, "MMMM yyyy", { locale: es })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reseñas destacadas */}
        <h2 className="text-xl font-bold mb-4">Reseñas destacadas</h2>
        <div className="space-y-4">
          {reseñasDestacadas.map((reseña) => (
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
        </div>

        <div className="mt-6 text-center space-y-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/vendedor/${params.id}/resenas`)}
            className="inline-flex items-center"
          >
            Ver todas las reseñas
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-sm text-muted-foreground">
            Las reseñas solo pueden dejarse después de realizar una compra verificada con este vendedor.
          </p>
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

      {/* Modal para compartir */}
      <Modal isOpen={showShareOptions} onClose={() => setShowShareOptions(false)}>
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Compartir perfil de vendedor</h3>
          <p className="text-muted-foreground mb-6">
            Comparte este enlace para que otros puedan ver el perfil y dejar reseñas
          </p>
          <div className="flex items-center mb-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm truncate flex-1">{typeof window !== "undefined" ? window.location.href : ""}</p>
          </div>
          <Button onClick={copyProfileLink} className="w-full">
            Copiar enlace
          </Button>
        </div>
      </Modal>
    </div>
  )
}
