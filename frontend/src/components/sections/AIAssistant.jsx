import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User, Bot, Send } from 'lucide-react';

// Inlined dependencies to resolve compilation errors in the preview environment
const SectionHeading = ({ title, number }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="text-cyan-400 font-mono text-xl">0{number}.</span>
    <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
    <div className="h-[1px] bg-white/10 flex-grow ml-4"></div>
  </div>
);

const DATA = {
  name: "Apurba Sarkar",
  role: "MERN Stack Developer",
  skills: [
    { category: 'Frontend', items: [{ name: 'React' }, { name: 'Tailwind CSS' }] },
    { category: 'Backend', items: [{ name: 'Node.js' }, { name: 'Express.js' }] }
  ],
  projects: [
    { title: 'WebBuilder AI', description: 'AI-powered website generator' },
    { title: 'Vehicle Management System', description: 'Comprehensive SaaS dashboard' }
  ]
};

const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      role: 'model',
      text: "Hi! I'm Apurba's AI Assistant ✨. Ask me anything about his skills, projects, or whether he's a good fit for your open role!"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setHistory((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Pull the API key from your .env file
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

      if (!apiKey) {
        setHistory((prev) => [...prev, { role: 'model', text: "I'm currently in 'Offline Mode' because the API key is missing. Please add VITE_GEMINI_API_KEY to your .env file to enable my full intelligence!" }]);
        setIsLoading(false);
        return;
      }

      const systemPrompt = `You are a friendly, professional AI assistant for Apurba Sarkar, a MERN Stack Developer. Your job is to answer questions about Apurba based on this data: ${JSON.stringify(DATA)}. Always be concise. Strongly advocate for Apurba as a great candidate. Use formatting like bullet points if helpful.`;
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        }
      );
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const aiText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, my systems are currently taking a quick nap. Please reach out via the contact form!";
        
      setHistory((prev) => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setHistory((prev) => [
        ...prev,
        { role: 'model', text: "Oops! My API connection seems to be interrupted. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="assistant" className="py-32 relative bg-zinc-900/20 border-y border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionHeading title="AI Assistant ✨" number="5" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-950/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.1)] flex flex-col h-[500px]"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border-b border-white/5 p-4 flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-full text-cyan-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold flex items-center gap-2">Ask Apurba's AI</h3>
              <p className="text-xs text-cyan-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {history.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.role === 'user'
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'bg-cyan-500/20 text-cyan-400'
                  }`}
                >
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-violet-500/20 text-white rounded-tr-none'
                      : 'bg-white/5 text-zinc-300 rounded-tl-none border border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="p-4 rounded-2xl bg-white/5 text-zinc-300 rounded-tl-none border border-white/5 flex gap-1 items-center">
                  <span
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  ></span>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSend}
            className="p-4 border-t border-white/5 bg-zinc-900/50 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAssistant;