import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Codepen, Code, Cpu, Database, Settings } from 'lucide-react';
import { SkillCategory } from '../types';

const skillsData: SkillCategory[] = [
  {
    title: 'Programming',
    icon: 'code',
    color: 'rgb(6, 182, 212)', // Cyan
    skills: [
      { name: 'Python', proficiency: 96 },
      { name: 'C++', proficiency: 85 },
      { name: 'Java', proficiency: 78 }
    ]
  },
  {
    title: 'AI/ML Core',
    icon: 'cpu',
    color: 'rgb(168, 85, 247)', // Purple
    skills: [
      { name: 'PyTorch', proficiency: 95 },
      { name: 'TensorFlow', proficiency: 82 },
      { name: 'Scikit-Learn', proficiency: 90 }
    ]
  },
  {
    title: 'Data Systems',
    icon: 'database',
    color: 'rgb(16, 185, 129)', // Emerald
    skills: [
      { name: 'Pandas', proficiency: 92 },
      { name: 'NumPy', proficiency: 94 },
      { name: 'MySQL', proficiency: 80 }
    ]
  },
  {
    title: 'Architecture & Tools',
    icon: 'settings',
    color: 'rgb(244, 63, 94)', // Rose
    skills: [
      { name: 'Docker', proficiency: 86 },
      { name: 'Kubernetes', proficiency: 70 },
      { name: 'Apache Superset', proficiency: 75 },
      { name: 'Git', proficiency: 90 }
    ]
  }
];

export default function SkillsNetwork() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string; val: number } | null>(null);

  const activeColor = selectedCategory !== null ? skillsData[selectedCategory].color : 'rgb(0, 229, 255)';

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-4">
            <Network className="w-3.5 h-3.5" />
            <span>Synergistic Constellation</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-100 tracking-tight">
            Scientific Proficiencies & Stack
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Skill weights mapped as an interactive neural constellation. Click categories to light up related synaptic pathways.
          </p>
        </div>

        {/* Constellation Canvas area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* List side selectors */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">Category Nodes</h3>
            
            {skillsData.map((cat, idx) => {
              const isSelected = selectedCategory === idx;
              return (
                <button
                  key={cat.title}
                  onClick={() => setSelectedCategory(isSelected ? null : idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group cursor-pointer ${
                    isSelected 
                      ? 'bg-slate-900 border-cyan-500/30 shadow-lg shadow-cyan-950/10' 
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 transition-colors"
                      style={{ color: isSelected ? cat.color : '#94a3b8' }}
                    >
                      {cat.icon === 'code' && <Code className="w-4 h-4" />}
                      {cat.icon === 'cpu' && <Cpu className="w-4 h-4" />}
                      {cat.icon === 'database' && <Database className="w-4 h-4" />}
                      {cat.icon === 'settings' && <Settings className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold transition-colors ${isSelected ? 'text-slate-100' : 'text-slate-300 group-hover:text-slate-100'}`}>
                        {cat.title}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                        {cat.skills.length} interactive skill connections
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Constellation SVG Representation */}
          <div className="lg:col-span-8 bg-slate-900/20 rounded-2xl p-6 border border-slate-800 flex items-center justify-center min-h-[400px] relative select-none">
            
            {/* Tooltip prompt overlay */}
            <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-500 bg-slate-950/40 px-2 py-1 rounded">
              {hoveredSkill ? (
                <span>Skill Weight: <span className="text-cyan-400 font-bold">{hoveredSkill.val}%</span></span>
              ) : (
                <span>Hover active nodes for parameter scores</span>
              )}
            </div>

            <svg viewBox="0 0 500 350" className="w-full max-w-lg h-auto">
              {/* Central Nucleus */}
              <g>
                <circle cx="250" cy="175" r="14" fill="#020617" stroke={activeColor} strokeWidth="1.5" className="animate-pulse" />
                <circle cx="250" cy="175" r="5" fill={activeColor} />
                <path d="M250 161 A 14 14 0 0 1 264 175" fill="none" stroke={activeColor} strokeWidth="1" strokeDasharray="2 2" />
              </g>

              {/* Network Connection Lines & Nodes */}
              {skillsData.map((cat, idx) => {
                const isCatActive = selectedCategory === null || selectedCategory === idx;
                
                // Polar coordinates calculations for 4 categories mapping to 4 quadrants
                const angle = (idx * Math.PI) / 2 - Math.PI / 4; 
                const catDist = 95;
                const catX = 250 + Math.cos(angle) * catDist;
                const catY = 175 + Math.sin(angle) * catDist;

                return (
                  <g key={cat.title} opacity={isCatActive ? 1 : 0.2} style={{ transition: 'all 0.5s ease' }}>
                    
                    {/* Core Hub Line connector */}
                    <line 
                      x1="250" 
                      y1="175" 
                      x2={catX} 
                      y2={catY} 
                      stroke={cat.color} 
                      strokeWidth={selectedCategory === idx ? '2' : '1'} 
                      strokeDasharray={selectedCategory === idx ? 'none' : '4 4'}
                    />

                    {/* Category Hub Node */}
                    <circle cx={catX} cy={catY} r="10" fill="#020617" stroke={cat.color} strokeWidth="2" />
                    <circle cx={catX} cy={catY} r="4" fill={cat.color} />

                    {/* Outer Skills branching */}
                    {cat.skills.map((skill, sIdx) => {
                      const skillCount = cat.skills.length;
                      // Branching angular dispersion from the category hub outwards
                      const dispAngle = angle + ((sIdx - (skillCount - 1) / 2) * Math.PI) / 6;
                      const skillDist = 75;
                      const skillX = catX + Math.cos(dispAngle) * skillDist;
                      const skillY = catY + Math.sin(dispAngle) * skillDist;

                      // Glow scale proportional to mastery representation instead of flat metrics progress bars
                      const glowRadius = 5 + (skill.proficiency / 100) * 10;

                      return (
                        <g 
                          key={skill.name}
                          onMouseEnter={() => setHoveredSkill({ name: skill.name, val: skill.proficiency })}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className="cursor-pointer group"
                        >
                          {/* Synaptic Pathway Line */}
                          <line 
                            x1={catX} 
                            y1={catY} 
                            x2={skillX} 
                            y2={skillY} 
                            stroke={isCatActive ? cat.color : '#475569'} 
                            strokeWidth="0.8" 
                            opacity="0.6"
                          />

                          {/* Skill Node halo representation */}
                          <circle 
                            cx={skillX} 
                            cy={skillY} 
                            r={glowRadius} 
                            fill="none" 
                            stroke={cat.color} 
                            strokeWidth="1" 
                            strokeDasharray="2 1"
                            opacity={(hoveredSkill?.name === skill.name) ? "0.9" : "0.35"}
                            style={{ transition: 'all 0.3s ease' }}
                          />

                          {/* Central Skill core point */}
                          <circle 
                            cx={skillX} 
                            cy={skillY} 
                            r="4.5" 
                            fill={cat.color} 
                            opacity="0.9"
                          />

                          {/* Node Label Title */}
                          <text 
                            x={skillX} 
                            y={skillY - (glowRadius + 6)} 
                            textAnchor="middle" 
                            fill="#cbd5e1" 
                            fontSize="8" 
                            fontFamily="JetBrains Mono, monospace"
                            fontWeight={(hoveredSkill?.name === skill.name) ? "bold" : "normal"}
                            style={{ transition: 'all 0.2s ease' }}
                          >
                            {skill.name}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
