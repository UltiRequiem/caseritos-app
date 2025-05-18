"use client";

import type React from "react";

import { Button } from "@//components/ui/button";
import { Card } from "@//components/ui/card";
import { ImageUploader } from "@//components/ui/image-uploader";
import { Input } from "@//components/ui/input";
import { Label } from "@//components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@//components/ui/select";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@//components/ui/tabs";
import { Textarea } from "@//components/ui/textarea";
import {
	AlertTriangle,
	ArrowLeft,
	Camera,
	CheckCircle2,
	Copy,
	Loader2,
	Minus,
	Plus,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Datos de ejemplo para productos
const productosDisponibles = [
	{ id: "p1", nombre: "Manzanas", precio: 2.5, unidad: "kg" },
	{ id: "p2", nombre: "Naranjas", precio: 1.8, unidad: "kg" },
	{ id: "p3", nombre: "Plátanos", precio: 1.2, unidad: "kg" },
	{ id: "p4", nombre: "Tomates", precio: 2.2, unidad: "kg" },
	{ id: "p5", nombre: "Lechugas", precio: 1.0, unidad: "unidad" },
	{ id: "p6", nombre: "Zanahorias", precio: 1.5, unidad: "kg" },
	{ id: "p7", nombre: "Papas", precio: 1.0, unidad: "kg" },
	{ id: "p8", nombre: "Cebollas", precio: 1.3, unidad: "kg" },
];

interface ProductoVenta {
	id: string;
	nombre: string;
	precio: number;
	cantidad: number;
	unidad: string;
	subtotal: number;
	descripcion?: string;
	imagenes: File[];
}

export default function NuevaVentaPage() {
	const router = useRouter();
	const [cliente, setCliente] = useState("");
	const [productos, setProductos] = useState<ProductoVenta[]>([]);
	const [productoSeleccionado, setProductoSeleccionado] = useState("");
	const [cantidad, setCantidad] = useState(1);
	const [descripcionProducto, setDescripcionProducto] = useState("");
	const [imagenesProducto, setImagenesProducto] = useState<File[]>([]);
	const [notas, setNotas] = useState("");
	const [saving, setSaving] = useState(false);
	const [validating, setValidating] = useState(false);
	const [toast, setToast] = useState<{
		message: string;
		type: "success" | "error";
	} | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState<"success" | "error">("success");
	const [enlaceUnico, setEnlaceUnico] = useState<string | null>(null);
	const [linkCopied, setLinkCopied] = useState(false);
	const [activeTab, setActiveTab] = useState("productos");
	const [editingProductIndex, setEditingProductIndex] = useState<number | null>(
		null,
	);

	const agregarProducto = () => {
		if (!productoSeleccionado || cantidad <= 0) return;

		const producto = productosDisponibles.find(
			(p) => p.id === productoSeleccionado,
		);
		if (!producto) return;

		const nuevoProducto: ProductoVenta = {
			id: producto.id,
			nombre: producto.nombre,
			precio: producto.precio,
			cantidad: cantidad,
			unidad: producto.unidad,
			subtotal: producto.precio * cantidad,
			descripcion: descripcionProducto,
			imagenes: [...imagenesProducto],
		};

		if (editingProductIndex !== null) {
			// Estamos editando un producto existente
			const nuevosProductos = [...productos];
			nuevosProductos[editingProductIndex] = nuevoProducto;
			setProductos(nuevosProductos);
		} else {
			// Estamos agregando un nuevo producto
			setProductos([...productos, nuevoProducto]);
		}

		// Limpiar el formulario
		setProductoSeleccionado("");
		setCantidad(1);
		setDescripcionProducto("");
		setImagenesProducto([]);
		setEditingProductIndex(null);
	};

	const editarProducto = (index: number) => {
		const producto = productos[index];
		setProductoSeleccionado(producto.id);
		setCantidad(producto.cantidad);
		setDescripcionProducto(producto.descripcion || "");
		setImagenesProducto(producto.imagenes);
		setEditingProductIndex(index);
		setActiveTab("detalles");
	};

	const eliminarProducto = (index: number) => {
		const nuevosProductos = [...productos];
		nuevosProductos.splice(index, 1);
		setProductos(nuevosProductos);
	};

	const handleImageUpload = (file: File | null) => {
		if (file) {
			setImagenesProducto([...imagenesProducto, file]);
		}
	};

	const removeImage = (index: number) => {
		const nuevasImagenes = [...imagenesProducto];
		nuevasImagenes.splice(index, 1);
		setImagenesProducto(nuevasImagenes);
	};

	const calcularTotal = () => {
		return productos.reduce((total, producto) => total + producto.subtotal, 0);
	};

	const copyLink = () => {
		if (enlaceUnico) {
			navigator.clipboard.writeText(enlaceUnico);
			setLinkCopied(true);
			setTimeout(() => setLinkCopied(false), 2000);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (productos.length === 0) {
			setToast({
				message: "Debes agregar al menos un producto",
				type: "error",
			});
			return;
		}

		// Verificar que todos los productos tengan al menos una imagen
		const productosInvalidos = productos.filter((p) => p.imagenes.length === 0);
		if (productosInvalidos.length > 0) {
			setToast({
				message: "Todos los productos deben tener al menos una imagen",
				type: "error",
			});
			return;
		}

		setSaving(true);
		setValidating(true);

		try {
			// Simulación de validación con IA
			await new Promise((resolve) => setTimeout(resolve, 3000));

			// Simulamos un rechazo aleatorio para demostración
			if (Math.random() > 0.8) {
				setModalType("error");
				setShowModal(true);
				setValidating(false);
			} else {
				// Generar un ID único para la venta
				const ventaId = `v-${Date.now().toString(36)}-${Math.random()
					.toString(36)
					.substring(2, 7)}`;

				// Generar el enlace único para el cliente
				const enlace = `${window.location.origin}/review/${ventaId}`;
				setEnlaceUnico(enlace);

				setModalType("success");
				setShowModal(true);
				setValidating(false);
			}
		} catch (err) {
			setToast({
				message: "Error al procesar la venta",
				type: "error",
			});
			setValidating(false);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<header className="bg-white border-b sticky top-0 z-10">
				<div className="container mx-auto p-4">
					<div className="flex items-center">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => router.push("/ventas")}
							className="mr-2"
						>
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
							<h1 className="text-xl font-bold ml-2 hidden sm:block">
								Caserito
							</h1>
						</div>
					</div>
				</div>
			</header>

			<main className="flex-1 container mx-auto p-4 pb-20 md:pb-4">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-2xl font-bold mb-6">Registrar nueva venta</h1>

					<form onSubmit={handleSubmit} className="space-y-6">
						<Card className="p-6">
							<h2 className="text-lg font-bold mb-4">
								Información del cliente
							</h2>
							<Label>Nombre del cliente</Label>
							<Input
								value={cliente}
								onChange={(e) => setCliente(e.target.value)}
								placeholder="Nombre del cliente"
								required
							/>
						</Card>

						<Card className="p-6">
							<h2 className="text-lg font-bold mb-4">Productos</h2>

							{/* Lista de productos agregados */}
							<div className="space-y-4 mb-6">
								{productos.map((producto, index) => (
									<div
										key={index}
										className="border rounded-md overflow-hidden"
									>
										<div className="flex items-center justify-between p-3 bg-gray-50">
											<div>
												<p className="font-medium">{producto.nombre}</p>
												<p className="text-sm text-muted-foreground">
													{producto.cantidad} {producto.unidad} x $
													{producto.precio.toFixed(2)}
												</p>
											</div>
											<div className="flex items-center">
												<p className="font-bold mr-4">
													${producto.subtotal.toFixed(2)}
												</p>
												<div className="flex gap-1">
													<Button
														type="button"
														variant="ghost"
														size="icon"
														onClick={() => editarProducto(index)}
														className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
													>
														<Camera className="h-4 w-4" />
													</Button>
													<Button
														type="button"
														variant="ghost"
														size="icon"
														onClick={() => eliminarProducto(index)}
														className="text-red-500 hover:text-red-700 hover:bg-red-50"
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</div>
										</div>
										{producto.descripcion && (
											<div className="p-3 border-t">
												<p className="text-sm">{producto.descripcion}</p>
											</div>
										)}
										{producto.imagenes.length > 0 && (
											<div className="p-3 border-t bg-gray-50">
												<p className="text-xs text-muted-foreground mb-2">
													Imágenes del producto:
												</p>
												<div className="flex gap-2 overflow-x-auto pb-2">
													{producto.imagenes.map((img, imgIndex) => (
														<div
															key={imgIndex}
															className="relative h-16 w-16 flex-shrink-0"
														>
															<Image
																src={
																	URL.createObjectURL(img) || "/placeholder.svg"
																}
																alt={`Imagen ${imgIndex + 1}`}
																fill
																className="object-cover rounded-md"
															/>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								))}

								{productos.length === 0 && (
									<p className="text-center text-muted-foreground py-4">
										No hay productos agregados
									</p>
								)}
							</div>

							{/* Formulario para agregar/editar productos */}
							<div className="border rounded-md">
								<Tabs value={activeTab} onValueChange={setActiveTab}>
									<TabsList className="w-full">
										<TabsTrigger value="productos" className="flex-1">
											Producto
										</TabsTrigger>
										<TabsTrigger value="detalles" className="flex-1">
											Detalles e Imágenes
										</TabsTrigger>
									</TabsList>

									<div className="p-4">
										<TabsContent value="productos" className="mt-0">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
												<div className="space-y-2">
													<Label htmlFor="producto">Producto</Label>
													<Select
														value={productoSeleccionado}
														onValueChange={setProductoSeleccionado}
													>
														<SelectTrigger id="producto">
															<SelectValue placeholder="Seleccionar producto" />
														</SelectTrigger>
														<SelectContent>
															{productosDisponibles.map((producto) => (
																<SelectItem
																	key={producto.id}
																	value={producto.id}
																>
																	{producto.nombre} - $
																	{producto.precio.toFixed(2)}/{producto.unidad}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>

												<div className="space-y-2">
													<Label htmlFor="cantidad">Cantidad</Label>
													<div className="flex items-center">
														<Button
															type="button"
															variant="outline"
															size="icon"
															onClick={() =>
																setCantidad(Math.max(1, cantidad - 1))
															}
															className="rounded-r-none"
														>
															<Minus className="h-4 w-4" />
														</Button>
														<Input
															id="cantidad"
															type="number"
															min="1"
															value={cantidad}
															onChange={(e) =>
																setCantidad(
																	Number.parseInt(e.target.value) || 1,
																)
															}
															className="rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
														/>
														<Button
															type="button"
															variant="outline"
															size="icon"
															onClick={() => setCantidad(cantidad + 1)}
															className="rounded-l-none"
														>
															<Plus className="h-4 w-4" />
														</Button>
													</div>
												</div>
											</div>

											<Button
												type="button"
												onClick={() => setActiveTab("detalles")}
												disabled={!productoSeleccionado}
												className="w-full"
											>
												Continuar a detalles
											</Button>
										</TabsContent>

										<TabsContent value="detalles" className="mt-0 space-y-4">
											<div className="space-y-2">
												<Label htmlFor="descripcion">
													Descripción del producto
												</Label>
												<Textarea
													id="descripcion"
													value={descripcionProducto}
													onChange={(e) =>
														setDescripcionProducto(e.target.value)
													}
													placeholder="Describe el estado y características del producto..."
													rows={3}
												/>
											</div>

											<div className="space-y-2">
												<Label>Imágenes del producto</Label>
												<p className="text-xs text-muted-foreground mb-2">
													Sube imágenes claras del producto que estás vendiendo
												</p>

												{/* Imágenes ya cargadas */}
												{imagenesProducto.length > 0 && (
													<div className="flex flex-wrap gap-2 mb-4">
														{imagenesProducto.map((img, index) => (
															<div key={index} className="relative h-24 w-24">
																<Image
																	src={
																		URL.createObjectURL(img) ||
																		"/placeholder.svg"
																	}
																	alt={`Imagen ${index + 1}`}
																	fill
																	className="object-cover rounded-md"
																/>
																<Button
																	type="button"
																	variant="destructive"
																	size="icon"
																	className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
																	onClick={() => removeImage(index)}
																>
																	<Trash2 className="h-3 w-3" />
																</Button>
															</div>
														))}
													</div>
												)}

												{/* Uploader para nuevas imágenes */}
												<ImageUploader
													onChange={handleImageUpload}
													maxSize={5}
												/>
											</div>

											<div className="flex gap-2">
												<Button
													type="button"
													variant="outline"
													onClick={() => setActiveTab("productos")}
													className="flex-1"
												>
													Volver
												</Button>
												<Button
													type="button"
													onClick={agregarProducto}
													disabled={!productoSeleccionado}
													className="flex-1"
												>
													{editingProductIndex !== null
														? "Actualizar producto"
														: "Agregar producto"}
												</Button>
											</div>
										</TabsContent>
									</div>
								</Tabs>
							</div>

							<div className="border-t mt-6 pt-4 flex justify-between items-center">
								<p className="font-bold">Total:</p>
								<p className="text-2xl font-bold">
									${calcularTotal().toFixed(2)}
								</p>
							</div>
						</Card>

						<Card className="p-6">
							<h2 className="text-lg font-bold mb-4">Notas adicionales</h2>
							<Textarea
								value={notas}
								onChange={(e) => setNotas(e.target.value)}
								placeholder="Notas o comentarios sobre la venta..."
								rows={3}
							/>
						</Card>

						<Button
							type="submit"
							className="w-full"
							disabled={saving || productos.length === 0}
						>
							{saving ? "Procesando venta..." : "Registrar venta"}
						</Button>
					</form>
				</div>
			</main>

			{/* Modal de validación con IA */}
			{validating && (
				<div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
						<Loader2 className="h-12 w-12 text-caserito-blue animate-spin mx-auto mb-4" />
						<h3 className="text-lg font-bold mb-2">Validando venta con IA</h3>
						<p className="text-muted-foreground mb-4">
							Estamos verificando que los datos e imágenes de la venta sean
							coherentes...
						</p>
						<div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
							<div className="bg-caserito-green h-2.5 rounded-full animate-pulse w-full"></div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
