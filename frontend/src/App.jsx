import { useEffect } from 'react';

import CustomCursor from './components/effects/CustomCursor';
import BackgroundEffects from './components/effects/BackgroundEffects';
import ScrollProgress from './components/layout/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Certificates from './components/sections/Certificates';
import AIAssistant from './components/sections/AIAssistant';
import Contact from './components/sections/Contact';

export default function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      <BackgroundEffects />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <AIAssistant />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}