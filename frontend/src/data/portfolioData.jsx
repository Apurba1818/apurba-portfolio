import { Code, Database, Wrench } from 'lucide-react';

// Use 'export const' so other files can find it using { DATA }
export const DATA = {
  name: "Apurba Sarkar",
  role: "MERN Stack Developer",
  email: "apurba2003sarkar2003@gmail.com",
  socials: {
    github: "https://github.com/Apurba1818",
    linkedin: "https://linkedin.com/in/apurba-sarkar-a4883a28a"
  },
  // ... the rest of your data
  projects: [
    {
      title: "WebBuilder AI",
      description: "An AI-powered website generator that converts natural language prompts into production-ready, responsive HTML pages in seconds using Google Gemini 2.5 API.",
      image: "/webbuilder.png", 
      features: ["Real-time preview", "Live code editing via Monaco Editor", "Per-user search history powered by Clerk Auth"],
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/Apurba1818/web-builder",
      live: "https://web-builder-navy.vercel.app/", 
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Vehicle Management System",
      description: "A full-stack Vehicle Management System featuring secure JWT authentication with bcrypt password hashing. Includes an analytics dashboard providing real-time financial insights.",
      image: "/vms.png", 
      features: ["Vehicle tracking", "Driver salary management", "Income-expense logging", "RESTful API Architecture"],
      tech: ["Node.js", "Express.js", "SQLite", "React", "JWT"],
      github: "https://github.com/Apurba1818/vehicle-management-system",
      live: "https://vehicle-management-system-ten.vercel.app/login", 
      color: "from-emerald-500/20 to-cyan-500/20"
    }
  ],

  certificates: [
  {
    title: "Build & Deploy Apps with Google AI Studio",
    issuer: "GUVI",
    date: "2024",
    link: "https://www.guvi.in/share-certificate/79101if7o29T70dI6e",
    file: "/cert-guvi.jpeg",   
    tags: ["Google AI Studio", "Generative AI", "LLM"],
    icon: "🤖",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "IBM AI Foundations",
    issuer: "IBM",
    date: "2024",
    link: "https://skills.yourlearning.ibm.com/certificate/share/14da3e90adewogICJvYmplY3RJZCIgOiAiUExBTi03OTEzRUUxREIwMzAiLAogICJsZWFybmVyQ05VTSIgOiAiNzY2MzYyOVJFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIgp95cb2db197c-10",
    file: "/cert-ibm.jpg",    
    tags: ["AI Ethics", "Machine Learning", "Foundations"],
    icon: "🧠",
    color: "from-indigo-500/20 to-violet-500/20"
  }
]
};
