import { useEffect, useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { Experience } from "./pages/Experience";
import { Journey } from "./pages/Journey";
import { Notes } from "./pages/Notes";
import { fetchHealthStatus, type HealthStatus } from "./api";

function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthStatus()
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend fetch error:", err);
        setLoading(false);
      });
  }, []);

  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return <Home health={health} loading={loading} onNavigate={setCurrentTab} />;
      case "projects":
        return <Projects />;
      case "experience":
        return <Experience />;
      case "journey":
        return <Journey />;
      case "notes":
        return <Notes />;
      default:
        return <Home health={health} loading={loading} onNavigate={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-purple-500/30 selection:text-purple-200">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}

export default App;
