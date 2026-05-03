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
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/service-area" element={<ServiceAreaPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
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
        <Layout />
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
