"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@//components/ui/avatar";
import { Input } from "@//components/ui/input";
import { Button } from "@//components/ui/button";
import {
  Search,
  Filter,
  ChevronDown,
  Loader2,
  Calendar,
  Star,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@//components/ui/dropdown-menu";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { StarRating } from "@//components/ui/star-rating";
import { Card } from "@//components/ui/card";

// Datos de ejemplo para las reseñas
const reviewsData = [
  {
    id: "1",
    seller: {
      id: "1",
      name: "María López",
      avatar: "/diverse-woman-avatar.png",
    },
    rating: 5,
    text: "Excelente servicio, muy atenta y los productos llegaron en perfecto estado. Definitivamente volveré a comprar con ella. Recomendada al 100%.",
    image: "/market-products.png",
    date: new Date(2025, 4, 12),
  },
  {
    id: "2",
    seller: { id: "2", name: "Juan Pérez", avatar: "/man-avatar.png" },
    rating: 4,
    text: "Buena atención y productos de calidad. La entrega fue un poco demorada pero todo llegó bien.",
    image: "/vibrant-vegetable-market.png",
    date: new Date(2025, 4, 10),
  },
  {
    id: "3",
    seller: { id: "3", name: "Ana García", avatar: "/woman-avatar-2.png" },
    rating: 3,
    text: "Productos buenos pero la comunicación podría mejorar. Tuve que preguntar varias veces por el estado de mi pedido.",
    image: null,
    date: new Date(2025, 4, 8),
  },
  {
    id: "4",
    seller: { id: "4", name: "Carlos Rodríguez", avatar: "/man-avatar-2.png" },
    rating: 5,
    text: "Increíble experiencia de compra. Carlos es muy profesional y sus productos son de primera calidad. El envío fue rápido y todo llegó perfectamente empacado.",
    image: "/vibrant-fruit-market.png",
    date: new Date(2025, 4, 5),
  },
];

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState(reviewsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);

  const toggleExpandReview = (id: string) => {
    setExpandedReviews((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLoadMore = async () => {
    setLoading(true);

    // Simulación de carga de más reseñas
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Duplicamos las reseñas existentes para simular la carga de más
    setReviews((prev) => [
      ...prev,
      ...reviewsData.map((review) => ({
        ...review,
        id: `${review.id}-duplicate-${Date.now()}`,
      })),
    ]);

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container max-w-3xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <Image
              src="/logo_caserito_customer.png"
              alt="Caserito Logo"
              width={50}
              height={50}
              className="rounded-xl"
            />
            <Button
              onClick={() => router.push("/review")}
              size="sm"
              className="bg-caserito-green hover:bg-caserito-green/90 text-white"
            >
              Escribir reseña
            </Button>
          </div>

          <div className="flex gap-2 mb-4">
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
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Vendedor
                  </DropdownMenuLabel>
                  {reviewsData.map((review) => (
                    <DropdownMenuItem key={review.seller.id}>
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage
                          src={review.seller.avatar || "/placeholder.svg"}
                          alt={review.seller.name}
                        />
                        <AvatarFallback>
                          {review.seller.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {review.seller.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Calificación
                  </DropdownMenuLabel>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <DropdownMenuItem key={rating}>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {rating} o más
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Fecha
                  </DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Calendar className="h-4 w-4 mr-2" />
                    Más recientes
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="h-4 w-4 mr-2" />
                    Más antiguas
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl mx-auto p-4">
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <div className="flex items-center mb-3">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={review.seller.avatar || "/placeholder.svg"}
                    alt={review.seller.name}
                  />
                  <AvatarFallback>
                    {review.seller.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{review.seller.name}</h3>
                  <div className="flex items-center">
                    <StarRating rating={review.rating} readOnly size={16} />
                    <span className="text-xs text-muted-foreground ml-2">
                      {format(review.date, "d MMM yyyy", { locale: es })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <p
                  className={
                    expandedReviews.includes(review.id) ? "" : "line-clamp-3"
                  }
                >
                  {review.text}
                </p>
                {review.text.length > 150 && (
                  <button
                    onClick={() => toggleExpandReview(review.id)}
                    className="text-sm text-primary mt-1"
                  >
                    {expandedReviews.includes(review.id)
                      ? "Ver menos"
                      : "Ver más"}
                  </button>
                )}
              </div>

              {review.image && (
                <div
                  className="relative w-full h-48 cursor-pointer"
                  onClick={() => setSelectedImage(review.image)}
                >
                  <Image
                    src={review.image || "/placeholder.svg"}
                    alt="Imagen de la reseña"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
            </Card>
          ))}

          <div className="flex justify-center py-4">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              disabled={loading}
            >
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
    </div>
  );
}
