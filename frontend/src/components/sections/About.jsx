import { motion } from 'framer-motion';
import { User } from 'lucide-react';

// Inlined dependencies to resolve compilation errors in the preview environment
const SectionHeading = ({ title, number }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="text-cyan-400 font-mono text-xl">0{number}.</span>
    <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
    <div className="h-[1px] bg-white/10 flex-grow ml-4"></div>
  </div>
);

// Mock DATA structure to match your portfolioData.js
const DATA = {
  about: "I am a passionate software developer based in Kolkata, dedicated to building robust and scalable web applications. My expertise lies in the MERN stack, where I leverage React for dynamic interfaces and Node.js/Express for efficient RESTful APIs. I take pride in designing secure systems featuring JWT authentication and clean UI implementations.",
  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "Kalyani Government Engineering College",
      location: "Kalyani, India",
      period: "2023 - 2027",
      score: "CGPA: 7.66"
    },
    {
      degree: "Higher Secondary (Class XII) WBHSE",
      institution: "Palashipara MGS Vidyapith",
      location: "India",
      period: "2022",
      score: "92.6%"
    }
  ]
};

const About = () => {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading title="About Me" number="1" />

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 text-zinc-400 leading-relaxed text-lg space-y-6"
          >
            <p>{DATA?.about}</p>
            <p>Here are a few technologies I've been working with recently:</p>
            <ul className="grid grid-cols-2 gap-2 font-mono text-sm mt-4">
              {['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JavaScript (ES6+)'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2 text-zinc-300">
                    <span className="text-cyan-400">▹</span> {item}
                  </li>
                )
              )}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6"
          >
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/30 to-violet-500/30">
              <div className="bg-zinc-900/80 backdrop-blur-xl p-6 rounded-2xl h-full border border-white/5">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <User className="text-cyan-400" /> Education
                </h3>
                <div className="space-y-6">
                  {/* Added optional chaining ?. to prevent crashes if education is missing */}
                  {DATA?.education?.map((edu, idx) => (
                    <div
                      key={idx}
                      className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-cyan-400 before:rounded-full before:ring-4 before:ring-cyan-400/20"
                    >
                      <h4 className="text-zinc-100 font-medium">{edu.degree}</h4>
                      <p className="text-zinc-400 text-sm">{edu.institution}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-cyan-400/80 text-xs font-mono">{edu.period}</span>
                        <span className="text-violet-400/80 text-xs font-mono">{edu.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;