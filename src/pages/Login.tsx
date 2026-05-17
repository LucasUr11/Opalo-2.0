import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Loader2, LogIn, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Credenciales incorrectas");
      setIsLoading(false);
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-artisan-paper">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-artisan-brown/10 p-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-artisan-leaf/10 text-artisan-leaf mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl text-artisan-brown">Panel de Control</h1>
          <p className="text-artisan-brown/60 text-sm mt-2 font-medium uppercase tracking-widest">Solo Personal Autorizado</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-artisan-brown/60 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-artisan-brown/10 focus:ring-2 focus:ring-artisan-leaf outline-none transition-all"
              placeholder="admin@matesartisan.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-artisan-brown/60 mb-2">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-artisan-brown/10 focus:ring-2 focus:ring-artisan-leaf outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {errorMsg && <p className="text-sm text-red-500 text-center font-medium">{errorMsg}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-artisan-brown text-artisan-paper font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogIn className="w-5 h-5" /> Ingresar</>}
          </button>
        </form>
      </div>
    </div>
  );
}