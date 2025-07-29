import React, { useState, useEffect } from "react";
import { ProdutoData } from "../../data/ProdutoData";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useRegiao } from "../../contexts/RegionContext";
import { regionColors } from "../../utils/regionColors";

export default function CarrosselVendas() {
  const produtos = ProdutoData.slice(0, 3);
  const [index, setIndex] = useState(0);
  const total = produtos.length;
  const { regiao } = useRegiao();
  const corPrincipal = regionColors[regiao]?.[0] || "#1D4ED8";
  const corSecundaria = regionColors[regiao]?.[1] || "#3B82F6";

  const proximo = () => setIndex((prev) => (prev + 1) % total);
  const anterior = () => setIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className="relative w-full bg-[#F5F5F5] shadow-lg overflow-hidden py-8 px-6">
      {/* Botões de navegação */}
      <button
        onClick={anterior}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={proximo}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Slides */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index * (100 / total)}%)`,
            width: `${total * 100}%`,
          }}
        >
          {produtos.map((produto, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center justify-between px-10 md:px-15 flex-shrink-0"
              style={{ width: `${100 / total}%` }}
            >
              {/* Texto do produto */}
              <div className="flex-1 space-y-4 md:pr-10">
                <span
                  className="text-white text-sm font-semibold px-4 py-1 rounded"
                  style={{ backgroundColor: corSecundaria }}
                >
                  Por R${produto.preco}
                </span>
                <h2 className="text-4xl font-bold text-gray-900">
                  {produto.titulo}
                </h2>
                <p className="text-gray-600 text-lg font-medium">
                  {produto.descricao}
                </p>
                <a
                  href={`https://wa.me/55${produto.telefone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-semibold py-3 px-6 rounded-lg"
                  style={{ backgroundColor: corPrincipal }}
                >
                  ENTRE EM CONTATO
                  <span className="text-lg">→</span>
                </a>
              </div>

              {/* Imagem do produto com selo de desconto */}
              <div className="flex-1 mt-8 md:mt-34 flex justify-center items-center relative">
                <div className="relative w-[280px] h-[280px] flex items-center justify-center">
                  <img
                    src={produto.imagem}
                    alt={produto.titulo}
                    className="max-h-full max-w-full object-contain"
                  />
                  {produto.desconto && (
                    <div
                      className="absolute top-[-2rem] right-[1rem] w-16 h-16 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                      style={{ backgroundColor: corPrincipal }}
                    >
                      {produto.desconto}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-8 gap-2">
        {produtos.map((_, i) => (
          <div
            key={i}
            className={`transition-all h-2 rounded-full ${
              i === index ? "w-8" : "w-4"
            }`}
            style={{ backgroundColor: i === index ? corSecundaria : "#ccc" }}
          />
        ))}
      </div>
    </div>
  );
}
