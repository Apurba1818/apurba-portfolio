import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { DATA } from '../../data/portfolioData';
import SectionHeading from '../ui/SectionHeading';

const Certificates = () => {
  return (
    <section id="certificates" className="py-32 relative bg-zinc-950/30">
      <div className="container mx-auto px-6 max-w-5xl">

        <SectionHeading title="Certifications" number="4" />

        <div className="grid md:grid-cols-2 gap-8">
          {DATA.certificates.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-500 shadow-xl overflow-hidden"
            >
              {/* Decorative Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Floating Icon */}
              <div className="absolute -top-4 -right-4 text-6xl opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                {cert.icon}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-white/5 rounded-2xl text-cyan-400 group-hover:bg-cyan-400 group-hover:text-zinc-950 transition-all duration-300 shadow-inner">
                    <Award size={28} />
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-500 hover:text-cyan-400 p-2"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 text-zinc-400 mb-4">
                    <ShieldCheck size={16} className="text-violet-400" />
                    <span className="font-medium">{cert.issuer}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-6 text-sm font-mono text-zinc-500">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                      <Calendar size={14} /> {cert.date}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {cert.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded-lg border border-white/5 group-hover:border-cyan-500/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 bg-white/5 group-hover:bg-cyan-500 border border-white/10 group-hover:border-transparent rounded-2xl text-zinc-300 group-hover:text-zinc-950 font-bold flex items-center justify-center gap-3 transition-all duration-300"
                >
                  Verify Credential
                  <ExternalLink size={18} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center space-y-4"
        >
          <p className="text-zinc-500 text-sm font-mono italic">
            "Education is not the learning of facts, but the training of the mind to think."
          </p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500/20" />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Certificates;