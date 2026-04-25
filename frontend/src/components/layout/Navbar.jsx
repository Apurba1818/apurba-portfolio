import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { DATA } from "../../data/portfolioData";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "About", "Skills", "Projects", "Certificates", "Assistant", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "py-6 bg-transparent"
      }`}
    >
      {/* Animated Scanning Border (Visible when scrolled) */}
      {scrolled && (
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 h-[1px] w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10"
        />
      )}

      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* Logo with sophisticated breathing pulse */}
        <motion.a
          href="#home"
          animate={{ 
            scale: [1, 1.03, 1],
            filter: ["drop-shadow(0 0 0px rgba(34,211,238,0))", "drop-shadow(0 0 8px rgba(34,211,238,0.3))", "drop-shadow(0 0 0px rgba(34,211,238,0))"]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative text-2xl font-black tracking-tighter text-white flex items-center gap-2 group"
        >
          <motion.span 
            animate={{ x: [-1, 1, -1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-cyan-400 group-hover:rotate-12 transition-transform duration-300"
          >
            {"<"}
          </motion.span>
          AS.
          <motion.span 
            animate={{ x: [1, -1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-violet-400 group-hover:-rotate-12 transition-transform duration-300"
          >
            {"/>"}
          </motion.span>
          
          {/* Always moving underline with variable width */}
          <motion.div
            animate={{ 
              scaleX: [0.6, 1.1, 0.6], 
              opacity: [0.2, 0.7, 0.2],
              background: [
                "linear-gradient(90deg, #22d3ee, #a78bfa)",
                "linear-gradient(90deg, #a78bfa, #22d3ee)",
                "linear-gradient(90deg, #22d3ee, #a78bfa)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full"
          />
        </motion.a>

        {/* Nav Links with "Ghost" breathing effect on numbers */}
        <div className="hidden lg:flex space-x-8 items-center">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ y: -2, color: "#22d3ee" }}
              className="text-sm font-medium text-zinc-400 transition-colors flex items-center group/link"
            >
              <motion.span 
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [0.95, 1.05, 0.95],
                  textShadow: ["0 0 0px rgba(34,211,238,0)", "0 0 10px rgba(34,211,238,0.5)", "0 0 0px rgba(34,211,238,0)"]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                className="text-cyan-500 mr-1.5 text-xs font-mono"
              >
                0{i + 1}.
              </motion.span>
              <span className="relative overflow-hidden">
                {item}
                <motion.div 
                  className="absolute bottom-0 left-0 h-[1px] bg-cyan-400 w-full"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Right Side Icons with counter-bobbing animations */}
        <div className="flex space-x-4 items-center">
          <motion.a
            animate={{ 
              y: [0, -4, 0],
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.15, filter: "brightness(1.2)" }}
            href={DATA.socials.github}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:text-white transition-all"
          >
            <FiGithub size={20} />
          </motion.a>

          <motion.a
            animate={{ 
              y: [0, 4, 0],
              rotate: [0, -2, 0, 2, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            whileHover={{ scale: 1.15, filter: "brightness(1.2)" }}
            href={DATA.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:text-white transition-all"
          >
            <FiLinkedin size={20} />
          </motion.a>

          {/* Intense breathing glow on Resume button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 15px rgba(34,211,238,0.1)",
                "0 0 35px rgba(34,211,238,0.4)",
                "0 0 15px rgba(34,211,238,0.1)",
              ],
              border: [
                "1px solid rgba(34,211,238,0.2)",
                "1px solid rgba(34,211,238,0.6)",
                "1px solid rgba(34,211,238,0.2)",
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            href="/resume.pdf"
            className="ml-4 flex items-center gap-2 px-5 py-2 text-sm font-medium bg-gradient-to-r from-cyan-500/10 to-violet-500/10 text-cyan-400 rounded-full hover:bg-cyan-500 hover:text-zinc-950 hover:border-transparent transition-all"
          >
            <Download size={16} /> Resume
          </motion.a>
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;