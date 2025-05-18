"use client";

import type React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@//components/ui/avatar";
import { Button } from "@//components/ui/button";
import { Card } from "@//components/ui/card";
import { Input } from "@//components/ui/input";
import { Label } from "@//components/ui/label";
import { StarRating } from "@//components/ui/star-rating";
import { Textarea } from "@//components/ui/textarea";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ExternalLink, Pencil } from "lucide-react";
import { toast } from "sonner";

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
};

// Datos de ejemplo para las reseñas recientes
const reseñasRecientes = [
	{
		id: "1",
		comprador: { id: "c001", nombre: "Juan Pérez", avatar: "/man-avatar.png" },
		rating: 5,
		texto: "Excelentes productos, siempre frescos y de gran calidad.",
		fecha: new Date(2025, 3, 20),
	},
	{
		id: "2",
		comprador: {
			id: "c002",
			nombre: "Ana García",
			avatar: "/woman-avatar-2.png",
		},
		rating: 4,
		texto: "Muy buena atención y productos de calidad.",
		fecha: new Date(2025, 2, 15),
	},
];

export default function ProfilePage() {
	const router = useRouter();
	const [storeName, setStoreName] = useState(vendedorData.tienda);
	const [description, setDescription] = useState(vendedorData.descripcion);
	const [saving, setSaving] = useState(false);
	const [linkCopied, setLinkCopied] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			// Simulación de guardado
			await new Promise((resolve) => setTimeout(resolve, 2000));

			toast.success("Perfil guardado correctamente");
		} catch (err) {
			toast.error("Error al guardar el perfil");
		} finally {
			setSaving(false);
		}
	};

	const copyProfileLink = () => {
		const profileUrl = `${window.location.origin}/vendedor/${vendedorData.id}`;
		navigator.clipboard.writeText(profileUrl);
		setLinkCopied(true);
		setTimeout(() => setLinkCopied(false), 2000);
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<header className="bg-white border-b p-4">
				<div className="container max-w-3xl mx-auto">
					<div className="flex items-center justify-between">
						<Image
							src="/logo_caserito_customer.png"
							alt="Caserito Logo"
							width={50}
							height={50}
							className="rounded-xl"
						/>
						<Button
							onClick={() => router.push(`/vendedor/${vendedorData.id}`)}
							variant="outline"
							className="text-sm"
						>
							Ver mi perfil público
						</Button>
					</div>
				</div>
			</header>

			<main className="flex-1 container max-w-3xl mx-auto p-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="md:col-span-2 space-y-6">
						<div className="bg-white rounded-xl shadow-sm p-6">
							<h1 className="text-2xl font-bold mb-6">Mi Perfil de Vendedor</h1>

							<div className="flex flex-col items-center mb-8">
								<div className="relative">
									<Avatar className="h-24 w-24">
										<AvatarImage
											src={vendedorData.avatar || "/placeholder.svg"}
											alt={vendedorData.nombre}
										/>
										<AvatarFallback>
											{vendedorData.nombre.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
										<Pencil size={16} />
									</button>
								</div>
								<div className="mt-4 text-center">
									<h2 className="text-xl font-medium">{vendedorData.nombre}</h2>
									<p className="text-sm text-muted-foreground">
										Miembro desde{" "}
										{format(vendedorData.miembroDesde, "MMMM yyyy", {
											locale: es,
										})}
									</p>
									<div className="flex items-center justify-center mt-2">
										<StarRating
											rating={Math.round(vendedorData.calificacionPromedio)}
											readOnly
											size={16}
										/>
										<span className="ml-2 text-sm">
											{vendedorData.calificacionPromedio.toFixed(1)} (
											{vendedorData.totalReseñas} reseñas)
										</span>
									</div>
								</div>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								<Label>Nombre de la tienda</Label>
								<Input
									value={storeName}
									onChange={(e) => setStoreName(e.target.value)}
									placeholder="Mi Tienda"
									required
								/>

								<Label>Descripción</Label>

								<Textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									placeholder="Describe brevemente tu tienda y los productos que ofreces..."
									maxLength={150}
									rows={4}
									required
								/>

								<Button type="submit" className="w-full" disabled={saving}>
									{saving ? "Guardando..." : "Guardar Perfil"}
								</Button>
							</form>
						</div>
					</div>

					<div className="space-y-6">
						<div className="bg-white rounded-xl shadow-sm p-6">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-lg font-bold">Reseñas recientes</h2>
								<Button
									variant="link"
									onClick={() =>
										router.push(`/vendedor/${vendedorData.id}/resenas`)
									}
									className="text-xs flex items-center p-0 h-auto"
								>
									Ver todas
									<ExternalLink className="ml-1 h-3 w-3" />
								</Button>
							</div>

							<div className="space-y-4">
								{reseñasRecientes.map((reseña) => (
									<Card key={reseña.id} className="p-3">
										<div className="flex items-center mb-2">
											<Avatar className="h-8 w-8 mr-2">
												<AvatarImage
													src={reseña.comprador.avatar || "/placeholder.svg"}
													alt={reseña.comprador.nombre}
												/>
												<AvatarFallback>
													{reseña.comprador.nombre.charAt(0)}
												</AvatarFallback>
											</Avatar>
											<div>
												<h3 className="text-sm font-medium">
													{reseña.comprador.nombre}
												</h3>
												<div className="flex items-center">
													<StarRating
														rating={reseña.rating}
														readOnly
														size={12}
													/>
													<span className="text-xs text-muted-foreground ml-1">
														{format(reseña.fecha, "d MMM", { locale: es })}
													</span>
												</div>
											</div>
										</div>
										<p className="text-sm line-clamp-2">{reseña.texto}</p>
									</Card>
								))}
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-sm p-6">
							<h2 className="text-lg font-bold mb-4">Estadísticas</h2>
							<div className="space-y-3">
								<div>
									<p className="text-sm text-muted-foreground">
										Calificación promedio
									</p>
									<p className="text-2xl font-bold">
										{vendedorData.calificacionPromedio.toFixed(1)}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										Total de reseñas
									</p>
									<p className="text-2xl font-bold">
										{vendedorData.totalReseñas}
									</p>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">
										Reseñas este mes
									</p>
									<p className="text-2xl font-bold">8</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
