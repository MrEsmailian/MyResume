import React, { useEffect, useState, useMemo } from 'react';
import { Search, Compass, BookOpen, Terminal, Sparkles, LayoutGrid, Award, Brain, Mail, Phone, Moon, HelpCircle } from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Handle Ctrl+K shortcut key trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const commands: CommandItem[] = useMemo(() => [
    {
      id: 'sec-hero',
      title: 'Navigate to Presentation / Hero',
      category: 'Pages & Anchors',
      description: 'Introductory bio, researcher credentials, social buttons',
      icon: <Compass className="text-blue-400" size={14} />,
      action: () => scrollToSection('home-hero')
    },
    {
      id: 'sec-timeline',
      title: 'Navigate to Research Career Timeline',
      category: 'Pages & Anchors',
      description: 'Academic timeline covering 2020 - 2025 milestones',
      icon: <Terminal className="text-[#a78bfa]" size={14} />,
      action: () => scrollToSection('interactive-timeline-section')
    },
    {
      id: 'sec-interests',
      title: 'Navigate to Interests Node',
      category: 'Pages & Anchors',
      description: 'Review RL, Computational Neuroscience and Medical decision models',
      icon: <LayoutGrid className="text-yellow-400" size={14} />,
      action: () => scrollToSection('research-interests-section')
    },
    {
      id: 'sec-pub',
      title: 'Navigate to Nature Scientific Reports',
      category: 'Pages & Anchors',
      description: 'Publications abstract and metabolic metrics data',
      icon: <BookOpen className="text-emerald-400" size={14} />,
      action: () => scrollToSection('publications')
    },
    {
      id: 'sec-projects',
      title: 'Navigate to Project Exhibition',
      category: 'Pages & Anchors',
      description: 'RAG LLMs assistant, YOLO object detection and diagnostic neural networks',
      icon: <Sparkles className="text-[#38bdf8]" size={14} />,
      action: () => scrollToSection('features-case-studies')
    },
    {
      id: 'sec-sk',
      title: 'Navigate to Skills Neural Graph',
      category: 'Pages & Anchors',
      description: 'Synaptic particle cluster displaying stack proficiencies',
      icon: <Brain className="text-pink-400" size={14} />,
      action: () => scrollToSection('skills-map-visualization')
    },
    {
      id: 'sec-rl',
      title: 'Navigate to Q-Learning Easter Egg',
      category: 'Pages & Anchors',
      description: 'Dynamic sandbox agent simulation and Bellman equation policy maker',
      icon: <Award className="text-indigo-400" size={14} />,
      action: () => scrollToSection('reinforcement-sandbox')
    },
    {
      id: 'sec-contact',
      title: 'Navigate to Contact Terminal',
      category: 'Pages & Anchors',
      description: 'Write an email context, request PhD reviews, link credentials',
      icon: <Mail className="text-rose-400" size={14} />,
      action: () => scrollToSection('professional-academic-contact')
    },
    {
      id: 'act-cv',
      title: 'Academic CV Download',
      category: 'Special Actions',
      description: 'Simulate download of curriculum-vitae PDF file parameters',
      icon: <LayoutGrid className="text-emerald-400" size={14} />,
      action: () => {
        setIsOpen(false);
        alert('Curriculum Vitae Download Triggered: esmailian_academic_cv.pdf (Placeholder API)');
      }
    }
  ], []);

  const filteredCommands = useMemo(() => {
    if (!search) return commands;
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, commands]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 p-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-xl flex items-center gap-2 text-slate-400 hover:text-white transition duration-200 shadow-xl backdrop-blur text-xs font-mono"
        title="Command Palette Shortcut"
      >
        <Terminal size={14} className="animate-pulse text-blue-400" />
        <span className="hidden sm:inline">Ctrl + K for search terminal</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      {/* Click-out backdrop anchor */}
      <div className="absolute inset-0 cursor-pointer" onClick={() => setIsOpen(false)}></div>

      <div className="bg-slate-900/95 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 animate-scale-up flex flex-col max-h-[460px]">
        {/* Visual search bar */}
        <div className="relative p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Type a section, action or parameter (e.g. RL, skills, contacts)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-xs sm:text-sm font-mono"
            autoFocus
          />
          <span 
            onClick={() => setIsOpen(false)}
            className="text-[10px] font-mono text-slate-500 bg-slate-950 py-0.5 px-2 rounded cursor-pointer hover:text-slate-200 border border-slate-800"
          >
            ESC
          </span>
        </div>

        {/* Command list menu elements */}
        <div className="p-2 overflow-y-auto flex-1 divide-y divide-slate-800/20 max-h-[340px] scrollbar-none">
          {filteredCommands.length > 0 ? (
            (Object.entries(
              filteredCommands.reduce((groups, item) => {
                const cat = item.category;
                if (!groups[cat]) groups[cat] = [];
                groups[cat].push(item);
                return groups;
              }, {} as Record<string, CommandItem[]>)
            ) as [string, CommandItem[]][]).map(([category, items]) => (
              <div key={category} className="py-2.5 px-2 space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1 px-2">{category}</span>
                <div className="space-y-1">
                  {items.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/40 transition flex items-center gap-3 group text-xs font-mono"
                    >
                      <div className="p-2 bg-slate-950 border border-slate-850 rounded-lg group-hover:scale-105 transition duration-200">
                        {cmd.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-slate-200 font-medium group-hover:text-blue-400 transition block truncate">{cmd.title}</span>
                        <span className="text-slate-400 font-normal block truncate text-[10px]">{cmd.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 font-mono text-xs text-slate-500">
              No matching commands or navigation vectors.
            </div>
          )}
        </div>

        {/* Console footer */}
        <div className="p-2 px-4 bg-slate-950 border-t border-slate-800/80 flex justify-between items-center text-[9px] font-mono text-slate-500">
          <span>Active Command Palette Workspace</span>
          <span>SYSTEM_OK_V01</span>
        </div>
      </div>
    </div>
  );
}
