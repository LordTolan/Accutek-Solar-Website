import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import HomePage from "@/pages/HomePage";

function App() {
  useEffect(() => {
    document.title = "AccuTek Solar | Family-Owned Solar & Backup Power · Indiana & Illinois";
  }, []);

  return (
    <div className="App font-sans antialiased">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1B2A22",
            color: "#F7F4F0",
            border: "1px solid #243A30",
            borderRadius: "2px",
            fontFamily: "IBM Plex Sans, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
