import React, { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo/claro_logo.png";
import { Lock, Mail, MapPin, LogIn, Loader2 } from "lucide-react";
import { Bounce, toast } from "react-toastify";

export default function LoginPage() {




  const navigate = useNavigate();
  const { loading, error, logar } = useLogin();



  const [site, setSite] = useState("");
  const [login, setLogin] = useState("");

  const [senha, setSenha] = useState("");

  const sites = [
    { label: "Comércio", value: "COMERCIO" },
    { label: "FSA", value: "FSABA_NOVO" },
  ];

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  }, [error]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await logar({ site, login, senha });
    if (result) {
      localStorage.setItem("tokenRVGC", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-red-600/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-red-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-600/5 blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fadeIn">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Claro Logo" className="h-10 object-contain" />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Remuneração Variável
            </h1>
            <p className="text-sm text-zinc-400">
              Acesse sua conta para visualizar seus resultados
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Site Select */}
            <div className="relative group">
              <MapPin
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-400 transition-colors"
              />
              <select
                value={site}
                onChange={(e) => setSite(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm
                  focus:outline-none focus:border-red-500/50 focus:bg-white/10 focus:ring-2 focus:ring-red-500/20
                  transition-all duration-300 appearance-none cursor-pointer"
                required
              >
                <option value="" className="bg-zinc-800 text-zinc-400">
                  Selecione o site
                </option>
                {sites.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    className="bg-zinc-800 text-white"
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Login Input */}
            <div className="relative group">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-400 transition-colors"
              />
              <input
                type="text"
                placeholder="Matrícula"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm
                  placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50 focus:bg-white/10
                  focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-400 transition-colors"
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm
                  placeholder:text-zinc-500 focus:outline-none focus:border-red-500/50 focus:bg-white/10
                  focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-xl
                hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/50
                transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                shadow-lg shadow-red-600/25 hover:shadow-red-500/40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Entrar
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-600 text-xs mt-6">
          © {new Date().getFullYear()} Claro — Remuneração Variável GC
        </p>
      </div>
    </div>
  );
}
