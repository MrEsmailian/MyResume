import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Brain, Menu, X, Terminal, HelpCircle, Code2, GraduationCap, Award, Map, Bookmark } from 'lucide-react';

interface NavbarProps {
  onOpenRlEasterEgg: () => void;
  onNavigate: (sectionId: string) => void;
  sections: { id: string; label: string }[];
}

export default function Navbar({ onOpenRlEasterEgg, onNavigate, sections }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Scroll Progress lines
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll position to set active tabs
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      
      const matched = sections.find((sect) => {
        const el = document.getElementById(sect.id);
        if (!el) return false;
        const top = el.offsetTop;
        const h = el.offsetHeight;
        return scrollPos >= top && scrollPos < top + h;
      });

      if (matched) {
        setActiveSection(matched.id);
      } else if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleSectClick = (id: string) => {
    onNavigate(id);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Scroll indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 origin-left z-50 glow-border-blue"
        style={{ scaleX }}
      />

      {/* Main floating navigation dock */}
      <header className="fixed top-4 inset-x-0 z-40 max-w-5xl mx-auto px-4">
        <nav className="glass-panel py-3 px-6 rounded-2xl flex items-center justify-between shadow-2xl border border-slate-805/40 relative">
          
          <div 
            onClick={() => handleSectClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-1.5 bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <Brain className="w-4.5 h-4.5 text-cyan-400" />
            </div>
            <span className="text-xs font-bold font-display text-slate-100 tracking-wider group-hover:text-cyan-300 transition-colors">
              MRE.<span className="text-cyan-400">RESEARCH</span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono font-medium">
            {sections.slice(0, 8).map((sect) => (
              <button
                key={sect.id}
                onClick={() => handleSectClick(sect.id)}
                className={`px-2.5 py-1 rounded-lg transition-all duration-300 cursor-pointer ${
                  activeSection === sect.id
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {sect.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Interactive RL game entry trigger */}
            <button
              onClick={onOpenRlEasterEgg}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-[10px] font-mono font-bold text-cyan-400 hover:text-cyan-300 shadow-lg cursor-pointer flex items-center gap-1 transition-all"
              title="Activate Q-Learning grid demonstration game!"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">RL Solver</span>
            </button>

            {/* Mobile menu triggers */}
            <button
              onClick={() => setIsOpenMobile((p) => !p)}
              className="p-1 px-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 lg:hidden cursor-pointer"
            >
              {isOpenMobile ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Draw menu slide down */}
          <AnimatePresence>
            {isOpenMobile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-16 right-4 left-4 bg-slate-950/95 border border-slate-850 p-4 rounded-xl shadow-2xl flex flex-col gap-2 z-50 font-mono text-xs text-left"
              >
                {sections.map((sect) => (
                  <button
                    key={sect.id}
                    onClick={() => handleSectClick(sect.id)}
                    className={`w-full text-left p-2 rounded hover:bg-slate-900 transition-colors ${
                      activeSection === sect.id ? 'text-cyan-400 font-bold bg-slate-900' : 'text-slate-400'
                    }`}
                  >
                    _ {sect.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
}
