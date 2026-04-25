import { motion } from 'framer-motion';

// Inlined dependencies to resolve compilation errors in the preview environment
const SectionHeading = ({ title, number }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="text-cyan-400 font-mono text-xl">0{number}.</span>
    <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
    <div className="h-[1px] bg-white/10 flex-grow ml-4"></div>
  </div>
);

const DATA = {
  skills: [
    { category: 'Frontend', icon: '🎨', items: [{ name: 'React', level: 90 }, { name: 'Tailwind CSS', level: 85 }, { name: 'JavaScript', level: 85 }, { name: 'HTML5/CSS3', level: 95 }] },
    { category: 'Backend', icon: '⚙️', items: [{ name: 'Node.js', level: 80 }, { name: 'Express.js', level: 85 }, { name: 'Java', level: 75 }] },
    { category: 'Database', icon: '🗄️', items: [{ name: 'MongoDB', level: 80 }, { name: 'MySQL', level: 75 }, { name: 'SQLite', level: 80 }] },
    { category: 'Tools', icon: '🛠️', items: [{ name: 'Git & GitHub', level: 85 }, { name: 'VS Code', level: 90 }, { name: 'Postman', level: 80 }] },
  ]
};

// Dictionary mapping your exact skill names to emojis
const SKILL_EMOJIS = {
  'React': '⚛️',
  'Tailwind CSS': '🌊',
  'JavaScript': '⚡',
  'HTML5/CSS3': '🎨',
  'Node.js': '🟢',
  'Express.js': '🚂',
  'Java': '☕',
  'MongoDB': '🍃',
  'MySQL': '🐬',
  'SQLite': '🗄️',
  'Git & GitHub': '🐙',
  'VS Code': '💻',
  'Postman': '📮',
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 relative bg-zinc-900/20 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading title="Technical Arsenal" number="2" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DATA.skills.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-zinc-950/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:border-cyan-500/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 group-hover:-rotate-12">
                {category.icon}
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-lg text-cyan-400">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{category.category}</h3>
              </div>

              <div className="space-y-4">
                {category.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                        {skill.name}
                        {/* Animated Emoji Wrapper */}
                        <motion.span
                          animate={{
                            // If it's React, spin it 360 deg. Otherwise, make it bob up and down slightly.
                            y: skill.name === 'React' ? 0 : [-1.5, 1.5, -1.5],
                            rotate: skill.name === 'React' ? [0, 360] : [-5, 5, -5],
                          }}
                          transition={{
                            duration: skill.name === 'React' ? 4 : 2.5,
                            repeat: Infinity,
                            ease: skill.name === 'React' ? "linear" : "easeInOut",
                          }}
                          className="inline-block text-sm"
                        >
                          {SKILL_EMOJIS[skill.name] || '✨'}
                        </motion.span>
                      </span>
                      <span className="text-zinc-500 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.2 + idx * 0.1,
                          ease: "easeOut"
                        }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;