"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StarRating } from "@/components/ui/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

// Datos de ejemplo para los vendedores
const vendedoresData = [
  {
    id: "v001",
    nombre: "María López",
    avatar: "/diverse-woman-avatar.png",
    descripcion:
      "Vendo frutas y verduras orgánicas cultivadas en mi huerto familiar.",
    ubicacion: "Mercado Central, Puesto #42",
    calificacionPromedio: 4.7,
    totalReseñas: 28,
  },
  {
    id: "v002",
    nombre: "Juan Pérez",
    avatar: "/man-avatar.png",
    descripcion:
      "Carnicería artesanal con productos de primera calidad y cortes especiales.",
    ubicacion: "Mercado Central, Puesto #15",
    calificacionPromedio: 4.2,
    totalReseñas: 17,
  },
  {
    id: "v003",
    nombre: "Ana García",
    avatar: "/woman-avatar-2.png",
    descripcion:
      "Panadería tradicional con recetas familiares y productos frescos cada día.",
    ubicacion: "Mercado Central, Puesto #28",
    calificacionPromedio: 4.9,
    totalReseñas: 32,
  },
  {
    id: "v004",
    nombre: "Carlos Rodríguez",
    avatar: "/man-avatar-2.png",
    descripcion:
      "Pescadería con productos frescos del día, directos del mar a tu mesa.",
    ubicacion: "Mercado Central, Puesto #7",
    calificacionPromedio: 4.5,
    totalReseñas: 21,
  },
];

export default function BuscarVendedores() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [vendedores, setVendedores] = useState(vendedoresData);

  // Filtrar vendedores según el término de búsqueda
  const vendedoresFiltrados = searchTerm
    ? vendedores.filter(
        (v) =>
          v.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : vendedores;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container max-w-3xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <Image
              src="/logo_caserito_customer.png"
              alt="Caserito Logo"
              width={50}
              height={50}
              className="rounded-xl"
            />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar vendedores por nombre, productos o ubicación..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Vendedores</h1>

        {vendedoresFiltrados.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No se encontraron vendedores con ese criterio de búsqueda.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {vendedoresFiltrados.map((vendedor) => (
              <Card
                key={vendedor.id}
                className="p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={vendedor.avatar || "/placeholder.svg"}
                      alt={vendedor.nombre}
                    />
                    <AvatarFallback>{vendedor.nombre.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">{vendedor.nombre}</h2>
                    <div className="flex items-center mt-1 mb-2">
                      <StarRating
                        rating={Math.round(vendedor.calificacionPromedio)}
                        readOnly
                        size={16}
                      />
                      <span className="ml-2 text-sm">
                        {vendedor.calificacionPromedio.toFixed(1)} (
                        {vendedor.totalReseñas} reseñas)
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {vendedor.descripcion}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      {vendedor.ubicacion}
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={() => router.push(`/vendedor/${vendedor.id}`)}
                        size="sm"
                        className="text-xs"
                      >
                        Ver perfil
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
