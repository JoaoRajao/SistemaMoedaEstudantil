// src/app/contact/page.tsx
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Mensagem enviada com sucesso!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contato</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-700 bg-gray-800 text-white rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-700 bg-gray-800 text-white rounded"
        />
        <textarea
          name="message"
          placeholder="Mensagem"
          value={form.message}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-700 bg-gray-800 text-white rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
