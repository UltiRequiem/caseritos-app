"use client";

import { Badge } from "@//components/ui/badge";
import { Button } from "@//components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@//components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@//components/ui/tooltip";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	Info,
	XCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Datos de ejemplo para los registros de auditoría
const auditLogsData = [
	{
		id: "1",
		reviewId: "rev-001",
		timestamp: new Date(2025, 4, 12, 14, 30),
		status: "approved",
		hash: "0x7f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3f2e1d",
	},
	{
		id: "2",
		reviewId: "rev-002",
		timestamp: new Date(2025, 4, 12, 13, 15),
		status: "rejected",
		hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
	},
	{
		id: "3",
		reviewId: "rev-003",
		timestamp: new Date(2025, 4, 11, 10, 45),
		status: "approved",
		hash: "0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a0",
	},
	{
		id: "4",
		reviewId: "rev-004",
		timestamp: new Date(2025, 4, 10, 16, 20),
		status: "approved",
		hash: "0x2w3e4r5t6y7u8i9o0p1a2s3d4f5g6h7j8k9l0z",
	},
	{
		id: "5",
		reviewId: "rev-005",
		timestamp: new Date(2025, 4, 10, 9, 10),
		status: "rejected",
		hash: "0xq1w2e3r4t5y6u7i8o9p0a1s2d3f4g5h6j7k8l9",
	},
];

export default function AuditPage() {
	const router = useRouter();
	const [page, setPage] = useState(1);
	const [perPage] = useState(10);

	return (
		<div className="min-h-screen flex flex-col">
			<header className="border-b p-4">
				<div className="container max-w-6xl mx-auto">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Image
								src="/logo_caserito_customer.png"
								alt="Caserito Logo"
								width={50}
								height={50}
								className="rounded-xl"
							/>
							<h1 className="ml-4 text-xl font-bold">Audit Logs</h1>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={() => router.push("/reviews")}
						>
							Volver a reseñas
						</Button>
					</div>
				</div>
			</header>

			<main className="flex-1 container max-w-6xl mx-auto p-4">
				<div className="bg-white rounded-lg shadow-sm border overflow-hidden">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID Reseña</TableHead>
								<TableHead>Fecha/Hora</TableHead>
								<TableHead>Estado</TableHead>
								<TableHead>Hash</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{auditLogsData.map((log) => (
								<TableRow key={log.id}>
									<TableCell className="font-medium">{log.reviewId}</TableCell>
									<TableCell>
										{format(log.timestamp, "dd/MM/yyyy HH:mm", { locale: es })}
									</TableCell>
									<TableCell>
										<Badge
											variant={
												log.status === "approved" ? "default" : "destructive"
											}
											className="flex items-center w-fit gap-1"
										>
											{log.status === "approved" ? (
												<CheckCircle className="h-3 w-3" />
											) : (
												<XCircle className="h-3 w-3" />
											)}
											{log.status === "approved" ? "Aprobado" : "Rechazado"}
										</Badge>
									</TableCell>
									<TableCell className="font-mono text-xs truncate max-w-[200px]">
										<div className="flex items-center">
											{log.hash.substring(0, 10)}...
											{log.hash.substring(log.hash.length - 6)}
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="h-6 w-6 ml-1"
														>
															<Info className="h-3 w-3" />
															<span className="sr-only">Ver hash completo</span>
														</Button>
													</TooltipTrigger>
													<TooltipContent>
														<p className="font-mono text-xs">{log.hash}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</div>
									</TableCell>
								</TableRow>
							))}
							{auditLogsData.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={4}
										className="text-center py-8 text-muted-foreground"
									>
										No hay registros de auditoría disponibles.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>

					<div className="flex items-center justify-between p-4 border-t">
						<div className="text-sm text-muted-foreground">
							Mostrando {auditLogsData.length} de {auditLogsData.length}{" "}
							registros
						</div>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="icon"
								disabled={page === 1}
								onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<span className="text-sm">Página {page}</span>
							<Button
								variant="outline"
								size="icon"
								disabled={auditLogsData.length < perPage}
								onClick={() => setPage((prev) => prev + 1)}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
