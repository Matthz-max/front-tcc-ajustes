import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center w-full h-screen justify-center">
      <div className="bg-white rounded-xl p-8 border border-black-100 shadow-lg w-full max-w-[60vw]">
        <h2 className="text-3xl font-bold text-center mb-2">Cadastro</h2>
        <p className="text-center text-gray-500 mb-6">Crie sua conta</p>

        <input
          type="text"
          placeholder="Nome"
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />

        <button className="w-full bg-green-600 text-white py-2 rounded-md trasition duration-300 hover:bg-green-700 mb-4 hover:scale-105">
          Cadastrar
        </button>

        <p className="text-center text-sm">
          Já tem uma conta?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 trasition-300 hover:underline "
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
}
