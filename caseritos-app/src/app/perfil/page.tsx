"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Input, Textarea, Button, Toast } from "@/components/ui-components"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil, ArrowLeft, BarChart3, ShoppingBag, Star, User } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Datos de ejemplo para el vendedor
const vendedorData = {
  id: "v001",
  nombre: "María López",
  avatar: "/diverse-woman-avatar.png",
  tienda: "Frutas y Verduras Orgánicas",
  descripcion: "Vendo frutas y verduras orgánicas cultivadas en mi huerto familiar. Productos frescos y de temporada.",
  ubicacion: "Mercado Central, Puesto #42",
  telefono: "+1234567890",
  email: "maria.lopez@ejemplo.com",
  miembroDesde: new Date(2023, 2, 15),
}

export default function PerfilPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: vendedorData.nombre,
    tienda: vendedorData.tienda,
    descripcion: vendedorData.descripcion,
    ubicacion: vendedorData.ubicacion,
    telefono: vendedorData.telefono,
    email: vendedorData.email,
  })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Simulación de guardado
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setToast({
        message: "Perfil actualizado correctamente",
        type: "success",
      })
    } catch (err) {
      setToast({
        message: "Error al actualizar el perfil",
        type: "error",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")} className="mr-2">
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

      <main className="flex-1 container mx-auto p-4 pb-20 md:pb-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={vendedorData.avatar || "/placeholder.svg"} alt={formData.nombre} />
                  <AvatarFallback>{formData.nombre.charAt(0)}</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                  <Pencil size={16} />
                </button>
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-xl font-medium">{formData.nombre}</h2>
                <p className="text-sm text-muted-foreground">
                  Miembro desde {format(vendedorData.miembroDesde, "MMMM yyyy", { locale: es })}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Nombre completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                required
              />

              <Input
                label="Nombre de la tienda"
                name="tienda"
                value={formData.tienda}
                onChange={handleChange}
                placeholder="Nombre de tu negocio"
                required
              />

              <Textarea
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe brevemente tu tienda y los productos que ofreces..."
                maxLength={150}
                rows={4}
                required
              />

              <Input
                label="Ubicación"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                placeholder="Dirección o ubicación de tu negocio"
                required
              />

              <Input
                label="Teléfono de contacto"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Número de teléfono"
                type="tel"
                required
              />

              <Input
                label="Correo electrónico"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Tu correo electrónico"
                type="email"
                required
              />

              <Button type="submit" className="w-full" loading={saving}>
                {saving ? "Guardando..." : "Guardar cambios"}
              </Button>
            </form>
          </div>
        </div>
      </main>

      {/* Barra de navegación móvil */}
      <div className="md:hidden bg-white border-t fixed bottom-0 left-0 right-0 z-10">
        <div className="flex justify-around p-2">
          <Button variant="ghost" className="flex flex-col items-center p-2" onClick={() => router.push("/dashboard")}>
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-2" onClick={() => router.push("/ventas")}>
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs mt-1">Ventas</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-2" onClick={() => router.push("/resenas")}>
            <Star className="h-5 w-5" />
            <span className="text-xs mt-1">Reseñas</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-2" onClick={() => router.push("/perfil")}>
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Perfil</span>
          </Button>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
