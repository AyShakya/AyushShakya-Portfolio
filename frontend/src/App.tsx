import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Work } from "./pages/Work";
import { Brain } from "./pages/Brain";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-primary text-text-primary font-sans flex flex-col justify-between selection:bg-brand-primary/20 selection:text-text-primary transition-colors">
        <Header />

        {/* Global main block: individual pages own their container layout widths */}
        <main className="w-full flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/brain" element={<Brain />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;