import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, Terminal, GraduationCap, Award, Mail, BookOpen, BrainCircuit } from 'lucide-react';

interface CommandPaletteProps {
  onOpenRlEasterEgg: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function CommandPalette({ onOpenRlEasterEgg, onNavigate }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl+K or Cmd+K mapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  const commands = [
    { id: 'timeline', label: 'Go to Research Timeline', desc: 'View academic and professional history', icon: GraduationCap },
    { id: 'interests', label: 'Go to Research Interests', desc: 'Explore core focuses and directions', icon: BrainCircuit },
    { id: 'publications', label: 'Go to Publications', desc: 'Read Scientific Reports journal paper', icon: BookOpen },
    { id: 'projects', label: 'Go to Projects Gallery', desc: 'Browse code and active system showcases', icon: Terminal },
    { id: 'skills', label: 'Go to Skills Constellation', desc: 'View interactive proficiency network', icon: BrainCircuit },
    { id: 'achievements', label: 'Go to Achievements & Stats', desc: 'View honors, Olympiads, rankings', icon: Award },
    { id: 'future', label: 'Go to PhD Research Vision', desc: 'Explore future academic trajectory', icon: GraduationCap },
    { id: 'contact', label: 'Go to Contact', desc: 'Send an email or social query', icon: Mail },
    { 
      id: 'easter-egg', 
      label: 'Launch RL GridWorld Simulation', 
      desc: 'Play with Q-learning agent training in real-time!', 
      icon: Terminal, 
      action: () => {
        onOpenRlEasterEgg();
        setIsOpen(false);
      }
    }
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase()) || 
    cmd.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleCommandClick = (cmd: typeof commands[0]) => {
    if (cmd.action) {
      cmd.action();
    } else {
      onNavigate(cmd.id);
      setIsOpen(false);
    }
    setQuery('');
  };

  return (
    <>
      {/* Floating shortcut tip */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 border border-slate-700/50 rounded-lg text-xs font-mono text-slate-400 cursor-pointer shadow-lg hover:border-cyan-500/30 transition-all duration-300"
        >
          <span>Command Palette</span>
          <kbd className="px-1.5 py-0.5 bg-slate-950 text-[10px] border border-slate-800 rounded font-bold text-cyan-400">Ctrl + K</kbd>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="relative w-full max-w-lg mx-4 bg-slate-900/95 border border-slate-800 rounded-xl overflow-hidden shadow-2xl z-10 font-sans"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-950/50">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search sections..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-slate-100 text-sm placeholder-slate-500 focus:ring-0"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-mono px-1.5 py-0.5 border border-slate-800 rounded text-slate-500 hover:text-slate-300 transition-colors"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-[300px] overflow-y-auto py-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => handleCommandClick(cmd)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800/60 text-left transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-slate-890 rounded-lg text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-950/20 transition-all duration-300">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                              {cmd.label}
                            </p>
                            <p className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors">
                              {cmd.desc}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </button>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No results found for "{query}"
                  </div>
                )}
              </div>

              <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/50 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>Use arrows & enter to choose (mouse click supported)</span>
                <span>Press ESC to exit</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
