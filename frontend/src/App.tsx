import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

// Lazy-load page modules to optimize initial bundle payloads and page load speed
const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const Work = lazy(() => import("./pages/Work").then((m) => ({ default: m.Work })));
const Brain = lazy(() => import("./pages/Brain").then((m) => ({ default: m.Brain })));
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-primary text-text-primary font-sans flex flex-col justify-between selection:bg-brand-primary/20 selection:text-text-primary transition-colors">
        <Header />

        {/* Global main block: individual pages own their container layouts */}
        <main className="w-full flex-grow flex flex-col">
          <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/brain" element={<Brain />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;