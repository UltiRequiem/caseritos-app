"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/dashboard");
    } catch (err) {
      console.error("Error de autenticación:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-blue-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo_caserito_customer.png"
              alt="Caserito Logo"
              width={150}
              height={150}
              priority
              className="rounded-2xl shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold text-caserito-blue mb-2">
            Bienvenido a Caserito
          </h1>
          <p className="text-muted-foreground text-lg">
            Crea confianza en tus ventas
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Accede a tu cuenta
          </h2>

          <Button
            onClick={handleGoogleLogin}
            className="w-full py-6 text-base flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300"
            variant="outline"
            disabled={loading}
          >
            {!loading && <FaGoogle className="h-5 w-5 text-caserito-blue" />}
            Continuar con Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="text-caserito-green hover:underline">
              Términos de servicio
            </a>{" "}
            y{" "}
            <a href="#" className="text-caserito-green hover:underline">
              Política de privacidad
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
