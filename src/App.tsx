import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./pages/Home";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ScrollToTop } from "./components/utils/ScrollToTop";
import { CheckoutPage } from "./pages/CheckoutPage";
import ProductForm from "./pages/ProductForm";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Admin from "./pages/Admin"
import Login from "./pages/Login"

function App() {
  return (
    <Router>

      {/* Vuelve arriba de la página al momento de cambiarla.- */}
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="grow">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/new" element={<ProductForm />} />
              <Route path="/admin/edit/:id" element={<ProductForm />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
