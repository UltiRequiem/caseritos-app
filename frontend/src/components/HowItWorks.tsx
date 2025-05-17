import React from "react";
import { BuyerIcon, SellerIcon } from "./Icons";

const Step = ({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) => (
  <div className="flex">
    <div className="mr-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">
        {number}
      </div>
    </div>
    <div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            ¿Cómo funciona Caserito?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Proceso simple y seguro tanto para compradores como para vendedores.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Buyers */}
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <BuyerIcon className="w-10 h-10 text-blue-600 mr-4" />
              <h3 className="text-2xl font-bold">Para compradores</h3>
            </div>

            <div className="space-y-8">
              <Step
                number={1}
                title="Encuentra a tu vendedor"
                description="Busca al vendedor por su nombre o escanea su código QR de Caserito."
              />
              <Step
                number={2}
                title="Simula la compra"
                description="Registra el producto, monto y datos necesarios para tu compra."
              />
              <Step
                number={3}
                title="Dinero en retención"
                description="El pago queda retenido en la plataforma hasta que recibas el producto."
              />
              <Step
                number={4}
                title="Confirma la entrega"
                description="Una vez recibido el producto, confirma desde la app para liberar el pago."
              />
              <Step
                number={5}
                title="Califica al vendedor"
                description="Deja una calificación y comentario sobre tu experiencia de compra."
              />
            </div>
          </div>

          {/* Sellers */}
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <SellerIcon className="w-10 h-10 text-blue-600 mr-4" />
              <h3 className="text-2xl font-bold">Para vendedores</h3>
            </div>

            <div className="space-y-8">
              <Step
                number={1}
                title="Regístrate en Caserito"
                description="Crea tu perfil de vendedor y obtén tu Identidad Digital en blockchain."
              />
              <Step
                number={2}
                title="Comparte tu perfil"
                description="Muestra tu código QR de Caserito o tu perfil en tus redes sociales."
              />
              <Step
                number={3}
                title="Recibe pedidos"
                description="Los compradores te contactarán a través de Caserito o directamente."
              />
              <Step
                number={4}
                title="Entrega el producto"
                description="Cuando el comprador confirma la recepción, recibes el pago de inmediato."
              />
              <Step
                number={5}
                title="Construye tu reputación"
                description="Acumula calificaciones positivas para destacar frente a otros vendedores."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
