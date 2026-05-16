import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import AboutPage from "@/pages/AboutPage";
import ServiceAreaPage from "@/pages/ServiceAreaPage";
import ReviewsPage from "@/pages/ReviewsPage";
import ContactPage from "@/pages/ContactPage";
import ToolsPage from "@/pages/ToolsPage";
import CommercialPage from "@/pages/CommercialPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminLeadsPage from "@/pages/AdminLeadsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import ProtectedRoute from "@/components/site/ProtectedRoute";
import { AuthProvider } from "@/lib/auth-context";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

function AdminLayout({ children }) {
  // No public nav / footer on admin pages
  return <>{children}</>;
}

function AppRoutes() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  const Layout = isAdmin ? AdminLayout : PublicLayout;

  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/commercial" element={<CommercialPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/service-area" element={<ServiceAreaPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route
            path="/admin/leads"
            element={
              <ProtectedRoute>
                <AdminLeadsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
}

function App() {
  useEffect(() => {
    document.title =
      "Accutek Solar | 30 Years of Electrical Expertise · Indiana & Illinois";
  }, []);

  return (
    <div className="App font-sans antialiased min-h-screen flex flex-col">
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1B5E20",
            color: "#FFFFFF",
            border: "1px solid #114718",
            borderRadius: "2px",
            fontFamily: "Montserrat, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
