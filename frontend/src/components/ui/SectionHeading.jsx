import { motion } from 'framer-motion';

const SectionHeading = ({ title, number }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="flex items-center gap-4 mb-12"
  >
    <span className="text-cyan-400 font-mono text-xl md:text-2xl">0{number}.</span>
    <h2 className="text-3xl md:text-5xl font-bold text-white">{title}</h2>
    <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-grow ml-4 max-w-xs md:max-w-md"></div>
  </motion.div>
);

export default SectionHeading;