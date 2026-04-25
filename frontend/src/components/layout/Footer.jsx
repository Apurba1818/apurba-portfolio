// import { Github, Linkedin } from 'lucide-react';
import { DATA } from '../../data/portfolioData';
import { FiGithub, FiLinkedin } from "react-icons/fi";

const Footer = () => (
  <footer className="py-8 text-center border-t border-white/5 bg-zinc-950">
    <div className="flex justify-center gap-6 mb-4">
      
      <a
        href={DATA.socials.github}
        target="_blank"
        className="text-zinc-500 hover:text-cyan-400 transition-colors"
      >
        <FiGithub size={20} />
      </a>  
      
      <a
        href={DATA.socials.linkedin}
        target="_blank"
        className="text-zinc-500 hover:text-cyan-400 transition-colors"
      >
        <FiLinkedin size={20} />
      </a>

    </div>

    <p className="text-zinc-500 font-mono text-sm">
      Built with React, Tailwind & Framer Motion.<br />
      © {new Date().getFullYear()} Apurba Sarkar.
    </p>
  </footer>
);

export default Footer;