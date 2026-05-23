import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { CatalogPage } from "./pages/CatalogPage";
import { Home } from "./pages/Home";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import ProductForm from "./pages/ProductForm";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Admin from "./pages/Admin"
import Login from "./pages/Login"

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/productos", element: <CatalogPage /> },
      { path: "/product/:id", element: <ProductDetailPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/login", element: <Login /> },

      // Rutas Protegidas.-
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/admin", element: <Admin /> },
          { path: "/admin/new", element: <ProductForm /> },
          { path: "/admin/edit/:id", element: <ProductForm /> },
        ],
      },
    ],
  }
], {
  // Son banderas de optimización para la transición de componentes.-
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionError: true
  }
});

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
