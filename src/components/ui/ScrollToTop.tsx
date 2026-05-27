// src/components/ui/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // El navegador es obligado a subir.-
  }, [pathname]); // Se dispara cada vez que la URL cambia.-

  return null; 
};