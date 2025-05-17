import React from "react";
import { Button } from "./Button";

export const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl mb-6">
          Confía en tu Caserito
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-10">
          Únete a la revolución del comercio informal seguro y construye una
          reputación digital que te pertenece.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-white text-blue-600 hover:bg-blue-50">
            Descarga la app
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-400">
            Regístrate como vendedor
          </Button>
        </div>
      </div>
    </section>
  );
};
