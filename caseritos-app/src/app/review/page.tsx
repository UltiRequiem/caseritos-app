"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Textarea, Button, StarRating, ImageUploader, Modal } from "@/components/ui-components"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Datos de ejemplo para el selector de vendedores
const sellers = [
  { id: "1", name: "María López", avatar: "/diverse-woman-avatar.png" },
  { id: "2", name: "Juan Pérez", avatar: "/man-avatar.png" },
  { id: "3", name: "Ana García", avatar: "/woman-avatar-2.png" },
  { id: "4", name: "Carlos Rodríguez", avatar: "/man-avatar-2.png" },
]

export default function ReviewPage() {
  const router = useRouter()
  const [selectedSeller, setSelectedSeller] = useState<(typeof sellers)[0] | null>(null)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<"success" | "error">("success")
  const [open, setOpen] = useState(false)

  // Validación del formulario
  const isFormValid = selectedSeller && rating > 0 && reviewText.length >= 10

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsSubmitting(true)

    try {
      // Simulación de validación con IA
      await new Promise((resolve) => setTimeout(resolve, 2500))

      // Simulamos un rechazo aleatorio para demostración
      if (Math.random() > 0.7) {
        setModalType("error")
        setShowModal(true)
      } else {
        setModalType("success")
        setShowModal(true)

        // Redirigir después de un breve retraso
        setTimeout(() => {
          router.push("/reviews")
        }, 1500)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4">
        <div className="container max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <Image
              src="/logo_caserito_customer.png"
              alt="Caserito Logo"
              width={50}
              height={50}
              className="rounded-xl"
            />
            <button onClick={() => router.push("/reviews")} className="text-sm text-caserito-green font-medium">
              Ver reseñas
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Enviar Reseña</h1>

        {selectedSeller && (
          <div className="flex items-center mb-6 p-3 bg-muted rounded-lg">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={selectedSeller.avatar || "/placeholder.svg"} alt={selectedSeller.name} />
              <AvatarFallback>{selectedSeller.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium">{selectedSeller.name}</h2>
              <p className="text-sm text-muted-foreground">Vendedor seleccionado</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Seleccionar Vendedor</label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                  {selectedSeller ? selectedSeller.name : "Seleccionar vendedor..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar vendedor..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron vendedores.</CommandEmpty>
                    <CommandGroup>
                      {sellers.map((seller) => (
                        <CommandItem
                          key={seller.id}
                          onSelect={() => {
                            setSelectedSeller(seller)
                            setOpen(false)
                          }}
                        >
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                              <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {seller.name}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Calificación</label>
            <StarRating rating={rating} onChange={setRating} size={32} className="py-2" />
          </div>

          <Textarea
            label="Tu reseña"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Describe tu experiencia con este vendedor..."
            minLength={10}
            rows={4}
            required
            error={
              reviewText.length > 0 && reviewText.length < 10
                ? "La reseña debe tener al menos 10 caracteres"
                : undefined
            }
          />

          <ImageUploader onChange={setImage} maxSize={5} />

          <Button type="submit" className="w-full" disabled={!isFormValid} loading={isSubmitting}>
            Enviar Reseña
          </Button>
        </form>
      </main>

      {/* Modal de éxito o error */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        icon={
          modalType === "success" ? (
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          ) : (
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
          )
        }
      >
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">
            {modalType === "success" ? "¡Reseña enviada correctamente!" : "No se pudo validar la reseña"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {modalType === "success"
              ? "Tu reseña ha sido publicada y ya es visible para otros usuarios."
              : "Tu imagen o texto no coincide con la puntuación. Intenta de nuevo."}
          </p>
          <Button
            onClick={() => {
              setShowModal(false)
              if (modalType === "success") {
                router.push("/reviews")
              }
            }}
            className="w-full"
          >
            {modalType === "success" ? "Ver reseñas" : "Entendido"}
          </Button>
        </div>
      </Modal>

      {/* Overlay de carga durante la validación */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
          <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
          <p className="text-white font-medium">Validando reseña...</p>
        </div>
      )}
    </div>
  )
}
