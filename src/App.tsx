import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, FileText, ArrowDown, HelpCircle, Terminal, Cpu, Brain, CheckSquare, Gamepad2, Info } from 'lucide-react';

// Components imports
import Navbar from './components/Navbar';
import ParticleNetwork from './components/ParticleNetwork';
import ResearchTimeline from './components/ResearchTimeline';
import ResearchInterests from './components/ResearchInterests';
import Publications from './components/Publications';
import ProjectShowcase from './components/ProjectShowcase';
import SkillsNetwork from './components/SkillsNetwork';
import ResearchMap from './components/ResearchMap';
import GithubStats from './components/GithubStats';
import Education from './components/Education';
import Achievements from './components/Achievements';
import FutureVision from './components/FutureVision';
import ContactForm from './components/ContactForm';
import EasterEggRL from './components/EasterEggRL';
import CommandPalette from './components/CommandPalette';

export default function App() {
  const [showRlGame, setShowRlGame] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [introStep, setIntroStep] = useState(0);

  // Core navigation configurations
  const sections = [
    { id: 'home', label: 'Overview' },
    { id: 'timeline', label: 'Chronology' },
    { id: 'interests', label: 'Spheres' },
    { id: 'publications', label: 'Peer Literature' },
    { id: 'projects', label: 'Repositories' },
    { id: 'skills', label: 'Constellation' },
    { id: 'map', label: 'Synergies' },
    { id: 'github', label: 'Analytics' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'future', label: 'Vision' },
    { id: 'contact', label: 'Contact' }
  ];

  const dynamicTaglines = [
    'Exploring reward convergence architectures.',
    'Modeling synaptic credit assignment functions.',
    'Designing AI models inside clinical diagnostic records.',
    'Synthesizing computer vision feedback systems.'
  ];

  // Micro typewriter hook
  useEffect(() => {
    let currentIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const tick = () => {
      const currentFullText = dynamicTaglines[currentIdx];
      if (!isDeleting) {
        setTypingText(currentFullText.substring(0, charIdx + 1));
        charIdx++;
        
        if (charIdx === currentFullText.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2500); // Wait on complete phrase
        } else {
          timer = setTimeout(tick, 60);
        }
      } else {
        setTypingText(currentFullText.substring(0, charIdx - 1));
        charIdx--;

        if (charIdx === 0) {
          isDeleting = false;
          currentIdx = (currentIdx + 1) % dynamicTaglines.length;
          timer = setTimeout(tick, 400); // Gap before typing starts next
        } else {
          timer = setTimeout(tick, 30);
        }
      }
    };

    tick();
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    // Generate simulated CV schema
    const docText = `CURRICULUM VITAE - MOHAMMAD-REZA ESMAILIAN\n\nAI Researcher | M.Sc student in AI (Amirkabir University of Technology)\nEmail: reza.esmailian.edu@gmail.com\n\nSpecializations: Reinforcement Learning, Computational Neuroscience, Medical AI.\n\nBrowse full repository interactive nodes live on portfolio:\n${window.location.href}`;
    const blob = new Blob([docText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MREsmailian_Academic_CV.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Animated neural canvas background */}
      <ParticleNetwork />

      {/* Floating navigation dock */}
      <Navbar 
        onOpenRlEasterEgg={() => setShowRlGame(true)} 
        onNavigate={handleNavigate} 
        sections={sections} 
      />

      {/* Command Palette indexing */}
      <CommandPalette 
        onOpenRlEasterEgg={() => setShowRlGame(true)} 
        onNavigate={handleNavigate} 
      />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center py-24 select-none pr-4 pl-4 relative">
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/40 to-slate-950 pointer-events-none -z-10" />

        <div className="max-w-4xl text-center z-10 space-y-8">
          
          {/* Top category label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-950/30 border border-cyan-500/20 rounded-full text-xs font-mono font-bold text-cyan-400"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>PhD Target Trajectory: Computational Neuroscience & RL</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-black font-display tracking-tight text-white uppercase glow-text-blue"
            >
              Mohammad-Reza Esmailian
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xs md:text-sm font-semibold tracking-wider font-mono text-cyan-400 uppercase"
            >
              AI Researcher | Reinforcement Learning | Computational Neuroscience | Medical AI
            </motion.p>
          </div>

          {/* Typewriter text space */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-6 flex items-center justify-center font-mono text-xs text-slate-400"
          >
            <span className="text-slate-500 mr-2">&gt;_</span>
            <span className="text-cyan-300 font-semibold">{typingText}</span>
            <span className="w-1.5 h-4 ml-1 bg-cyan-400 animate-pulse" />
          </motion.div>

          {/* Summary Letter block */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            "Master's student in Artificial Intelligence exploring how intelligent systems learn, adapt, and interact with complex environments. My work spans Reinforcement Learning, Deep Learning, Medical AI, Computer Vision, and emerging intersections with Computational Neuroscience."
          </motion.p>

          {/* Core Action Call To Action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-3.5 pt-6"
          >
            {/* Primary Email query button */}
            <button
              onClick={() => handleNavigate('contact')}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-extrabold rounded-xl text-xs transition-transform transform active:scale-95 shadow-lg shadow-cyan-500/10 cursor-pointer"
            >
              Inquire / Contact
            </button>

            {/* Simulated CV download */}
            <button
              onClick={handleDownloadCV}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold rounded-xl text-xs transition-transform transform active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download CV</span>
            </button>

            {/* Social channels shortcuts */}
            <a
              href="https://github.com/MrEsmailian"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-400 rounded-xl transition-colors cursor-pointer"
              title="Open GitHub Feed"
            >
              <Github className="w-4.5 h-4.5" />
            </a>

            <a
              href="https://linkedin.com/in/reza-esmailian"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-400 rounded-xl transition-colors cursor-pointer"
              title="Open LinkedIn Link"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
          </motion.div>

          {/* Quick Info Box highlighting Easter Egg */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="max-w-md mx-auto p-3 bg-slate-900/60 backdrop-blur-md border border-slate-850 rounded-xl flex items-center gap-2.5 text-left text-[11px] text-slate-400"
          >
            <Info className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
            <div>
              <span className="font-bold text-slate-200">Interactive RL Showcase:</span> Click the <span className="text-cyan-400 font-bold">RL Solver</span> button above to trigger an active Q-learning agent solver grid game!
            </div>
          </motion.div>

          {/* Anchoring arrow button */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="pt-12 text-slate-500 hover:text-cyan-400 cursor-pointer flex justify-center"
            onClick={() => handleNavigate('timeline')}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>

        </div>
      </section>

      {/* Main academic body sections */}
      <main className="relative">
        <ResearchTimeline />
        <ResearchInterests />
        <Publications />
        <ProjectShowcase />
        <SkillsNetwork />
        <ResearchMap />
        <GithubStats />
        <Education />
        <Achievements />
        <FutureVision />
        <ContactForm />
      </main>

      {/* Structured professional footer */}
      <footer className="py-12 border-t border-slate-900 bg-slate-950 flex flex-col items-center justify-center text-center font-mono text-[10px] text-slate-500 space-y-2 select-none">
        <p>© 2026 Mohammad-Reza Esmailian. All research rights reserved.</p>
        <p>Synthesized with React 18, TypeScript, and interactive Tailwind CSS structures.</p>
      </footer>

      {/* Active RL Game dialog container */}
      <EasterEggRL isOpen={showRlGame} onClose={() => setShowRlGame(false)} />

    </div>
  );
}
