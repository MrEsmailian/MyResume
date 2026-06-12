import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, HeartPulse, Cpu, Eye, Network, Code, Dna } from 'lucide-react';

interface InterestCard {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  directions: string[];
  projects: string[];
  color: string; // Tailwind glow classes
  iconColor: string;
}

const interestsData: InterestCard[] = [
  {
    title: 'Reinforcement Learning',
    icon: Network,
    description: 'Investigating optimal decision-making policies and sample complexity boundaries in dynamic/under-explored state spaces.',
    directions: ['Markov Decision Processes (MDPs)', 'Policy Optimization', 'Dynamic Reward Landscapes'],
    projects: ['Autonomous Q-Learning Solver', 'Adaptive Decision Models'],
    color: 'from-cyan-500/20 to-teal-500/20 hover:border-cyan-500/40 shadow-cyan-950/20',
    iconColor: 'text-cyan-400'
  },
  {
    title: 'Deep Reinforcement Learning',
    icon: Sparkles,
    description: 'Combining deep representation learning with temporal difference targets for robust control architectures.',
    directions: ['Value/Policy networks', 'Experience Replay Schemes', 'Offline Data Alignment'],
    projects: ['DeepRacer Robotic Control', 'Continuous Path Optimizations'],
    color: 'from-purple-500/20 to-pink-500/20 hover:border-purple-500/40 shadow-purple-950/20',
    iconColor: 'text-purple-400'
  },
  {
    title: 'Computational Neuroscience',
    icon: Brain,
    description: 'Simulating neural circuitry and studying biological learning rules to craft more natural, brain-inspired machine networks.',
    directions: ['Synaptic Plasticity Rules', 'Spiking Neural Networks', 'Hippocampal Memory Models'],
    projects: ['Hexa Neuro-Rehab Controller', 'Brain-inspired learning representations'],
    color: 'from-blue-500/20 to-indigo-500/20 hover:border-blue-500/40 shadow-blue-950/20',
    iconColor: 'text-blue-400'
  },
  {
    title: 'Medical AI',
    icon: HeartPulse,
    description: 'Harnessing clinical diagnostics and bio-pathology arrays to revolutionize early patient assessment and treatment paths.',
    directions: ['Serum Liver Panel Predictors', 'Early Stage Cancer Classifiers', 'Electronic Health Record Models'],
    projects: ['Scientific Reports Liver Risk Model', 'Breast Cancer Detection CNN'],
    color: 'from-emerald-500/20 to-teal-500/20 hover:border-emerald-500/40 shadow-emerald-950/20',
    iconColor: 'text-emerald-400'
  },
  {
    title: 'Explainable AI',
    icon: Cpu,
    description: 'Interrogating neural weights via saliency maps and integrated gradients to foster transparency in dense, safety-critical systems.',
    directions: ['SHAP & LIME Interpretability', 'Feature Attribution Alignment', 'Clinical Decision Transparency'],
    projects: ['Explainable Medical Biomarker Classifier'],
    color: 'from-amber-500/20 to-orange-500/20 hover:border-amber-500/40 shadow-amber-950/20',
    iconColor: 'text-amber-400'
  },
  {
    title: 'Computer Vision',
    icon: Eye,
    description: 'Designing advanced vision algorithms ranging from robust object localization to semantic segmentations under low light.',
    directions: ['Autonomous Traffic Detection', 'Industrial Vision Verification', 'Sensor Fusion Pipelines'],
    projects: ['DeepRacer Vision Core', 'Dairy Cow Recognition Systems'],
    color: 'from-rose-500/20 to-pink-500/20 hover:border-rose-500/40 shadow-rose-950/20',
    iconColor: 'text-rose-400'
  },
  {
    title: 'Large Language Models',
    icon: Code,
    description: 'Exploring alignment strategies, model context length expansions, and Retrieval-Augmented Generation interfaces text generation.',
    directions: ['RAG Architectures', 'Semantic Embedding search', 'Agentic Workflows'],
    projects: ['RAG Documentation Orchestrator'],
    color: 'from-violet-500/20 to-purple-500/20 hover:border-violet-500/40 shadow-violet-950/20',
    iconColor: 'text-violet-400'
  },
  {
    title: 'Bioinformatics',
    icon: Dna,
    description: 'Applying predictive analytics to genomic sequences, liver metabolic expressions, and high-throughput biomarkers.',
    directions: ['High-throughput Biomarker analysis', 'Genetic Alignment Models', 'Clinical Trial Analytics'],
    projects: ['Metabolic Syndrome liver panel assessment'],
    color: 'from-fuchsia-500/20 to-rose-500/20 hover:border-fuchsia-500/40 shadow-fuchsia-950/20',
    iconColor: 'text-fuchsia-400'
  }
];

export default function ResearchInterests() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="interests" className="py-24 relative bg-slate-950/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-4">
            <Brain className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Research Spheres</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-100 tracking-tight">
            Domains of Scientific Inquiry
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Intersections between mathematical optimization, neuroscience, and translational biophysical models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {interestsData.map((interest, idx) => {
            const Icon = interest.icon;
            const isHovered = activeCard === idx;

            return (
              <motion.div
                key={idx}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative rounded-2xl p-6 bg-gradient-to-br ${interest.color} border border-slate-800/80 hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between min-h-[280px] group shadow-xl cursor-pointer overflow-hidden z-10`}
                layout
              >
                {/* Visual Accent glow line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 ${interest.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-md font-bold text-slate-100 font-display group-hover:text-cyan-300 transition-colors">
                    {interest.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {interest.description}
                  </p>
                </div>

                <div className="mt-6">
                  {/* Interactive toggle block */}
                  <AnimatePresence>
                    {isHovered ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 pt-3 border-t border-slate-800/40"
                      >
                        <div>
                          <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider font-mono">Lines of Research</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {interest.directions.map((dir, dIdx) => (
                              <span key={dIdx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950/60 text-slate-300 border border-slate-800/40">
                                {dir}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider font-mono">Affiliated Work</p>
                          <div className="text-[9px] text-slate-400 mt-1 pl-1 line-clamp-2">
                            {interest.projects.join(', ')}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="h-6 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-cyan-400/80 transition-colors font-mono">
                        <span>Details & directions</span>
                        <span>→</span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
