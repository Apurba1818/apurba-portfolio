import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

const SectionHeading = ({ title, number }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="text-cyan-400 font-mono text-xl">0{number}.</span>
    <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
    <div className="h-[1px] bg-white/10 flex-grow ml-4"></div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Ensure VITE_API_URL is set in your .env (e.g., http://localhost:5000)
      const baseUrl = import.meta.env.VITE_API_URL;
      
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Mail Error:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <SectionHeading title="Get In Touch" number="5" />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-zinc-400 text-lg leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-mono">Email</p>
                  <p>apurba2003sarkar2003@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-mono">Location</p>
                  <p>Kolkata, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <textarea
                placeholder="Message"
                required
                rows={5}
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none transition-all resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
              
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                ) : status === 'success' ? (
                  <><CheckCircle2 size={20} /> Message Sent!</>
                ) : status === 'error' ? (
                  <><AlertCircle size={20} /> Failed to Send</>
                ) : (
                  <><Send size={18} /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
