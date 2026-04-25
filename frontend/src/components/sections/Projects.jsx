import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';

// Inlined dependencies to resolve compilation errors in the preview environment
const SectionHeading = ({ title, number }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="text-cyan-400 font-mono text-xl">0{number}.</span>
    <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
    <div className="h-[1px] bg-white/10 flex-grow ml-4"></div>
  </div>
);

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.23 4.3 4.3 0 0 0-.12-3.21s-1.12-.35-3.5 1.25a12.1 12.1 0 0 0-6.5 0C8.12 1.15 7 1.5 7 1.5a4.3 4.3 0 0 0-.12 3.21 4.6 4.6 0 0 0-1.39 3.23c0 5.6 3.36 6.65 6.5 7a4.8 4.8 0 0 0-1 3.02V22"></path>
    <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
  </svg>
);

// Updated DATA with example live links for you to replace with your actual URLs
const DATA = {
  projects: [
    {
      title: 'WebBuilder AI',
      description: 'An AI-powered website generator that converts natural language prompts into production-ready, responsive HTML pages in seconds using Google Gemini 2.5 API.',
      image: '/webbuilder.png', 
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      features: ['Real-time live preview tab', 'Live code editing via Monaco Editor', 'Per-user search history powered by Clerk Auth'],
      github: 'https://github.com/Apurba1818/web-builder',
      live: 'https://web-builder-navy.vercel.app/', // <-- Replace with your live URL
      color: 'from-purple-500/20 to-indigo-500/20'
    },
    {
      title: 'Vehicle Management System',
      description: 'A comprehensive SaaS dashboard for managing fleet operations. Allows administrators to track vehicles, drivers, and monitor financial performance.',
      image: '/vms.png', 
      tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
      features: ['Real-time analytics dashboard', 'Daily income and expense logging', 'Secure user authentication system'],
      github: 'https://github.com/Apurba1818/vehicle-management-system',
      live: 'https://vehicle-management-system-ten.vercel.app/', // <-- Replace with your live URL
      color: 'from-blue-500/20 to-cyan-500/20'
    }
  ]
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading title="Some Things I've Built" number="3" />

        <div className="space-y-32">
          {DATA.projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Project Image/Preview Area */}
              <div className="w-full md:w-3/5 relative group">
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noreferrer"
                  className={project.live === '#' ? 'cursor-default' : 'cursor-pointer'}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`relative z-10 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/80 backdrop-blur-sm aspect-[4/3] md:aspect-[16/10] flex items-center justify-center bg-gradient-to-br ${project.color} shadow-2xl`}
                  >
                    <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 relative z-0"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000';
                        }}
                      />
                    ) : (
                      <>
                        <Code size={64} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
                      </>
                    )}
                  </motion.div>
                </a>
              </div>

              {/* Project Info Area */}
              <div
                className={`w-full md:w-2/5 flex flex-col ${
                  idx % 2 !== 0 ? 'md:items-end md:text-right' : 'md:items-start'
                }`}
              >
                <p className="text-cyan-400 font-mono text-sm mb-2 font-medium">Featured Project</p>
                <a href={project.live} target="_blank" rel="noreferrer">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-6 hover:text-cyan-400 transition-colors cursor-pointer">
                    {project.title}
                  </h3>
                </a>

                <div
                  className={`relative z-20 bg-zinc-900/95 backdrop-blur-xl border border-white/5 p-6 rounded-2xl text-zinc-300 shadow-xl mb-6 md:w-[120%] ${
                    idx % 2 !== 0 ? 'md:mr-[-20%]' : 'md:ml-[-20%]'
                  }`}
                >
                  <p className="mb-4 leading-relaxed">{project.description}</p>
                  <ul className="text-sm space-y-2 text-zinc-400">
                    {project.features?.map((feat) => (
                      <li
                        key={feat}
                        className={`flex items-center gap-2 ${
                          idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        <span className="text-violet-400 shrink-0">▹</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <ul
                  className={`flex flex-wrap gap-3 font-mono text-xs text-cyan-400/80 mb-8 ${
                    idx % 2 !== 0 ? 'md:justify-end' : ''
                  }`}
                >
                  {project.tech?.map((tech) => (
                    <li
                      key={tech}
                      className="bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div
                  className={`flex items-center gap-6 ${
                    idx % 2 !== 0 ? 'md:justify-end' : ''
                  }`}
                >
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <GithubIcon size={20} /> <span className="text-sm font-medium">Code</span>
                  </motion.a>
                  {project.live && project.live !== '#' && (
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-violet-400 transition-colors flex items-center gap-2"
                    >
                      <ExternalLink size={22} />{' '}
                      <span className="text-sm font-medium">Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
