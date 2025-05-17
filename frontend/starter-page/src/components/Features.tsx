import React from "react";
import { FeatureCard } from "./FeatureCard";
import {
  ShieldIcon,
  StarIcon,
  BlockchainIcon,
  WalletIcon,
  IdentityIcon,
} from "./Icons";

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            ¿Qué hace única a Caserito?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Caserito reinventa el comercio informal con tecnología innovadora
            para hacerlo seguro y confiable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<ShieldIcon className="w-7 h-7" />}
            title="Pago seguro tipo escrow"
            description="El dinero se retiene hasta que confirmes que recibiste el producto en perfectas condiciones."
          />

          <FeatureCard
            icon={<StarIcon className="w-7 h-7" />}
            title="Sistema de reputación inmutable"
            description="Calificaciones y comentarios visibles para todos los compradores, imposible de manipular."
          />

          <FeatureCard
            icon={<BlockchainIcon className="w-7 h-7" />}
            title="Respaldado por blockchain"
            description="Toda la información es transparente y auditable gracias a la tecnología blockchain de NEAR."
          />

          <FeatureCard
            icon={<IdentityIcon className="w-7 h-7" />}
            title="Identidad soberana del vendedor"
            description="Los vendedores construyen su historial sin depender de redes sociales o plataformas externas."
          />

          <FeatureCard
            icon={<WalletIcon className="w-7 h-7" />}
            title="Compatible con métodos de pago locales"
            description="Integrado con Yape, Plin y transferencias bancarias, los métodos preferidos en Perú."
          />

          <FeatureCard
            icon={<StarIcon className="w-7 h-7" />}
            title="Perfil de vendedor portable"
            description="Los vendedores pueden mostrar su 'Perfil Caserito' en todas sus redes sociales."
          />
        </div>
      </div>
    </section>
  );
};
