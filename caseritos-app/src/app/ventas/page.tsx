"use client";

import { Badge } from "@//components/ui/badge";
import { Button } from "@//components/ui/button";
import { Card } from "@//components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@//components/ui/dropdown-menu";
import { Input } from "@//components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@//components/ui/table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
	BarChart3,
	Calendar,
	CheckCircle,
	Copy,
	Download,
	Filter,
	Plus,
	Search,
	ShoppingBag,
	Star,
	User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Datos de ejemplo para las ventas
const ventasData = [
	{
		id: "v1",
		cliente: "Laura Martínez",
		productos: "2kg Manzanas, 1kg Naranjas",
		monto: 15.5,
		fecha: new Date(2025, 3, 22),
		estado: "completada",
		enlace: "https://caserito.app/review/v1",
		tieneResena: true,
		calificacion: 5,
	},
	{
		id: "v2",
		cliente: "Pedro Sánchez",
		productos: "3kg Papas, 1kg Cebollas, 500g Ajo",
		monto: 12.75,
		fecha: new Date(2025, 3, 21),
		estado: "completada",
		enlace: "https://caserito.app/review/v2",
		tieneResena: true,
		calificacion: 4,
	},
	{
		id: "v3",
		cliente: "Sofía Ramírez",
		productos: "2kg Tomates, 1kg Pimientos",
		monto: 18.2,
		fecha: new Date(2025, 3, 20),
		estado: "pendiente",
		enlace: "https://caserito.app/review/v3",
		tieneResena: false,
		calificacion: null,
	},
	{
		id: "v4",
		cliente: "Carlos Mendoza",
		productos: "1kg Fresas, 2kg Manzanas",
		monto: 14.3,
		fecha: new Date(2025, 3, 19),
		estado: "pendiente",
		enlace: "https://caserito.app/review/v4",
		tieneResena: false,
		calificacion: null,
	},
	{
		id: "v5",
		cliente: "Ana Torres",
		productos: "3kg Naranjas, 1kg Limones",
		monto: 10.8,
		fecha: new Date(2025, 3, 18),
		estado: "completada",
		enlace: "https://caserito.app/review/v5",
		tieneResena: true,
		calificacion: 5,
	},
	{
		id: "v6",
		cliente: "Miguel Flores",
		productos: "2kg Papas, 1kg Zanahorias, 1kg Cebollas",
		monto: 9.5,
		fecha: new Date(2025, 3, 17),
		estado: "completada",
		enlace: "https://caserito.app/review/v6",
		tieneResena: false,
		calificacion: null,
	},
	{
		id: "v7",
		cliente: "Lucía Vargas",
		productos: "1kg Manzanas, 1kg Peras, 1kg Uvas",
		monto: 16.4,
		fecha: new Date(2025, 3, 16),
		estado: "rechazada",
		enlace: "https://caserito.app/review/v7",
		tieneResena: false,
		calificacion: null,
	},
];

export default function VentasPage() {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [ventas, setVentas] = useState(ventasData);
	const [linkCopied, setLinkCopied] = useState<string | null>(null);

	// Filtrar ventas según el término de búsqueda
	const ventasFiltradas = searchTerm
		? ventas.filter(
				(v) =>
					v.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
					v.productos.toLowerCase().includes(searchTerm.toLowerCase()),
			)
		: ventas;

	// Calcular el total de ventas
	const totalVentas = ventasFiltradas.reduce(
		(total, venta) => total + venta.monto,
		0,
	);

	const copyLink = (id: string, enlace: string) => {
		navigator.clipboard.writeText(enlace);
		setLinkCopied(id);
		setTimeout(() => setLinkCopied(null), 2000);
	};

	const getEstadoBadge = (estado: string, tieneResena: boolean) => {
		if (estado === "completada" && tieneResena) {
			return <Badge className="bg-green-500">Completada con reseña</Badge>;
		} else if (estado === "completada") {
			return <Badge className="bg-blue-500">Completada</Badge>;
		} else if (estado === "pendiente") {
			return (
				<Badge variant="outline" className="text-yellow-600 border-yellow-600">
					Pendiente de reseña
				</Badge>
			);
		} else if (estado === "rechazada") {
			return <Badge variant="destructive">Rechazada</Badge>;
		}
		return null;
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<header className="bg-white border-b sticky top-0 z-10">
				<div className="container mx-auto p-4">
					<div className="flex items-center justify-between">
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
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => router.push("/perfil")}
							>
								<User className="h-5 w-5" />
								<span className="ml-2 hidden sm:inline">Mi Perfil</span>
							</Button>
						</div>
					</div>
				</div>
			</header>

			<main className="flex-1 container mx-auto p-4 pb-20 md:pb-4">
				<div className="flex flex-col md:flex-row gap-6">
					{/* Sidebar en pantallas medianas y grandes */}
					<div className="hidden md:block w-64 shrink-0">
						<div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
							<nav className="space-y-1">
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => router.push("/dashboard")}
								>
									<BarChart3 className="h-5 w-5 mr-2" />
									Dashboard
								</Button>
								<Button
									variant="default"
									className="w-full justify-start"
									onClick={() => router.push("/ventas")}
								>
									<ShoppingBag className="h-5 w-5 mr-2" />
									Ventas
								</Button>
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => router.push("/resenas")}
								>
									<Star className="h-5 w-5 mr-2" />
									Reseñas
								</Button>
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => router.push("/perfil")}
								>
									<User className="h-5 w-5 mr-2" />
									Mi Perfil
								</Button>
							</nav>
						</div>
					</div>

					{/* Contenido principal */}
					<div className="flex-1">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
							<div>
								<h1 className="text-2xl font-bold">Ventas</h1>
								<p className="text-muted-foreground">
									Gestiona tus ventas y visualiza tu historial
								</p>
							</div>
							<Button
								onClick={() => router.push("/ventas/nueva")}
								className="bg-caserito-green hover:bg-caserito-green/90"
							>
								<Plus className="h-5 w-5 mr-2" />
								Nueva venta
							</Button>
						</div>

						<Card className="p-4 mb-6">
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										placeholder="Buscar por cliente o productos..."
										className="pl-9"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>
								<div className="flex gap-2">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="outline">
												<Filter className="h-4 w-4 mr-2" />
												Filtrar
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-56">
											<DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuGroup>
												<DropdownMenuLabel className="text-xs text-muted-foreground">
													Estado
												</DropdownMenuLabel>
												<DropdownMenuItem>Todas</DropdownMenuItem>
												<DropdownMenuItem>
													Completadas con reseña
												</DropdownMenuItem>
												<DropdownMenuItem>
													Completadas sin reseña
												</DropdownMenuItem>
												<DropdownMenuItem>
													Pendientes de reseña
												</DropdownMenuItem>
												<DropdownMenuItem>Rechazadas</DropdownMenuItem>
											</DropdownMenuGroup>
											<DropdownMenuSeparator />
											<DropdownMenuGroup>
												<DropdownMenuLabel className="text-xs text-muted-foreground">
													Fecha
												</DropdownMenuLabel>
												<DropdownMenuItem>Hoy</DropdownMenuItem>
												<DropdownMenuItem>Esta semana</DropdownMenuItem>
												<DropdownMenuItem>Este mes</DropdownMenuItem>
												<DropdownMenuItem>Personalizado...</DropdownMenuItem>
											</DropdownMenuGroup>
										</DropdownMenuContent>
									</DropdownMenu>
									<Button variant="outline">
										<Calendar className="h-4 w-4 mr-2" />
										<span className="hidden sm:inline">Este mes</span>
									</Button>
									<Button variant="outline">
										<Download className="h-4 w-4 mr-2" />
										<span className="hidden sm:inline">Exportar</span>
									</Button>
								</div>
							</div>
						</Card>

						<Card className="overflow-hidden">
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Cliente</TableHead>
											<TableHead>Productos</TableHead>
											<TableHead>Fecha</TableHead>
											<TableHead>Estado</TableHead>
											<TableHead className="text-right">Monto</TableHead>
											<TableHead>Acciones</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{ventasFiltradas.map((venta) => (
											<TableRow key={venta.id}>
												<TableCell className="font-medium">
													{venta.cliente}
												</TableCell>
												<TableCell className="max-w-[200px] truncate">
													{venta.productos}
												</TableCell>
												<TableCell>
													{format(venta.fecha, "d MMM yyyy", { locale: es })}
												</TableCell>
												<TableCell>
													{getEstadoBadge(venta.estado, venta.tieneResena)}
												</TableCell>
												<TableCell className="text-right font-bold">
													${venta.monto.toFixed(2)}
												</TableCell>
												<TableCell>
													{venta.estado !== "rechazada" &&
														!venta.tieneResena && (
															<Button
																variant="ghost"
																size="sm"
																className="flex items-center"
																onClick={() => copyLink(venta.id, venta.enlace)}
															>
																{linkCopied === venta.id ? (
																	<CheckCircle className="h-4 w-4 mr-1 text-green-500" />
																) : (
																	<Copy className="h-4 w-4 mr-1" />
																)}
																<span className="hidden sm:inline">
																	{linkCopied === venta.id
																		? "¡Copiado!"
																		: "Copiar enlace"}
																</span>
															</Button>
														)}
													{venta.tieneResena && (
														<div className="flex items-center">
															<Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
															<span>{venta.calificacion}</span>
														</div>
													)}
												</TableCell>
											</TableRow>
										))}
										{ventasFiltradas.length === 0 && (
											<TableRow>
												<TableCell
													colSpan={6}
													className="text-center py-8 text-muted-foreground"
												>
													No se encontraron ventas
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</div>
							<div className="p-4 border-t bg-muted/50">
								<div className="flex justify-between items-center">
									<p className="font-medium">
										Total ({ventasFiltradas.length} ventas):
									</p>
									<p className="text-xl font-bold">${totalVentas.toFixed(2)}</p>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</main>

			{/* Barra de navegación móvil */}
			<div className="md:hidden bg-white border-t fixed bottom-0 left-0 right-0 z-10">
				<div className="flex justify-around p-2">
					<Button
						variant="ghost"
						className="flex flex-col items-center p-2"
						onClick={() => router.push("/dashboard")}
					>
						<BarChart3 className="h-5 w-5" />
						<span className="text-xs mt-1">Dashboard</span>
					</Button>
					<Button
						variant="ghost"
						className="flex flex-col items-center p-2"
						onClick={() => router.push("/ventas")}
					>
						<ShoppingBag className="h-5 w-5" />
						<span className="text-xs mt-1">Ventas</span>
					</Button>
					<Button
						variant="ghost"
						className="flex flex-col items-center p-2"
						onClick={() => router.push("/resenas")}
					>
						<Star className="h-5 w-5" />
						<span className="text-xs mt-1">Reseñas</span>
					</Button>
					<Button
						variant="ghost"
						className="flex flex-col items-center p-2"
						onClick={() => router.push("/perfil")}
					>
						<User className="h-5 w-5" />
						<span className="text-xs mt-1">Perfil</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
