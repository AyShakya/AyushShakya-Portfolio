import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Experience } from "./pages/Experience";
import { Journey } from "./pages/Journey";
import { Notes } from "./pages/Notes";
import { NoteDetail } from "./pages/NoteDetail";
import { Now } from "./pages/Now";
import { Uses } from "./pages/Uses";
import { Principles } from "./pages/Principles";
import { About } from "./pages/About";
import { Resume } from "./pages/Resume";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-purple-500/30 selection:text-purple-200">
        <Header />

        <main className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
            <Route path="/now" element={<Now />} />
            <Route path="/uses" element={<Uses />} />
            <Route path="/principles" element={<Principles />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;