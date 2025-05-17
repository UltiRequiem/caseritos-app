import React from "react";

interface BenefitProps {
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
}

const Benefit = ({
  title,
  description,
  imageSrc,
  reverse = false,
}: BenefitProps) => {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center gap-12`}
    >
      <div className="md:w-1/2">
        <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl p-1 shadow-xl">
          <div className="bg-blue-50 rounded-lg overflow-hidden h-80 flex items-center justify-center">
            <div className="text-center p-10">
              <p className="text-blue-600 font-semibold text-lg mb-2">
                Imagen representativa
              </p>
              <p className="text-gray-500">{imageSrc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/2">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
    </div>
  );
};

export const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Beneficios de Caserito
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Transformando el comercio informal en una experiencia segura y
            confiable.
          </p>
        </div>

        <div className="space-y-24">
          <Benefit
            title="Compras 100% seguras"
            description="No más estafas: en Caserito tu dinero está seguro hasta que confirms que recibiste el producto tal como lo esperabas. Acabamos con las estafas que ocurren diariamente en redes sociales."
            imageSrc="Ilustración de transacción segura"
          />

          <Benefit
            title="Identidad digital confiable"
            description="Los vendedores construyen su reputación digital de manera portable e inmutable, respaldada por blockchain. Esta identidad les pertenece y pueden usarla en cualquier plataforma."
            imageSrc="Ilustración de identidad digital"
            reverse
          />

          <Benefit
            title="Aumenta tus ventas como vendedor"
            description="Destácate de la competencia mostrando tu perfil verificado de Caserito. Los compradores confiarán más en ti al ver tus calificaciones positivas y tu historial transparente."
            imageSrc="Ilustración de crecimiento de ventas"
          />
        </div>
      </div>
    </section>
  );
};
