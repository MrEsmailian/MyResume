import React from 'react';
import { motion } from 'motion/react';
import { Target, Compass, Network, BrainCircuit, HeartPulse, Sparkles, ChevronRight } from 'lucide-react';

interface VisionStep {
  phase: string;
  title: string;
  focus: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
}

const visionRoadmap: VisionStep[] = [
  {
    phase: "Phase 1: Foundations",
    title: "Neuro-inspired Credit Assignment",
    focus: "Computational Neuroscience & Deep RL",
    icon: BrainCircuit,
    deliverables: [
      "Simulate dendritic synaptic scaling rules on recurrent network connections",
      "Model continuous learning mechanisms bypassing standard catastrophical forgetting"
    ]
  },
  {
    phase: "Phase 2: Convergence",
    title: "Translational Bio-Informatics",
    focus: "Medical AI & Advanced Classifiers",
    icon: HeartPulse,
    deliverables: [
      "Develop ultra-robust generative models synthesizing missing patient biomarker arrays",
      "Validate interpretable clinical diagnostic engines on cross-institutional datasets"
    ]
  },
  {
    phase: "Phase 3: Ultimate Goal",
    title: "PhD Investigation & Thesis",
    focus: "Adaptive Autonomous Systems",
    icon: Compass,
    deliverables: [
      "Conceive brain-inspired learning algorithms scaling without reward signal sparsity limits",
      "Synthesize physical controllers for medical robotics with real-time feedback adaptation"
    ]
  }
];

export default function FutureVision() {
  return (
    <section id="future" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-4">
            <Target className="w-3.5 h-3.5" />
            <span>Graduate Trajectory</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-100 tracking-tight">
            Where I Want To Go: Research Vision
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            A defined doctoral roadmap seeking intersections between adaptive biological circuits and mathematical machine optimization.
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-8 max-w-4xl mx-auto relative">
          {/* Vertical indicator line connecting phases */}
          <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-slate-800" />

          {visionRoadmap.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-16 md:pl-20 group cursor-default"
              >
                {/* Visual marker element */}
                <div className="absolute left-3 md:left-5 top-1 z-10 w-7 h-7 rounded-full border border-slate-705 bg-slate-950 flex items-center justify-center group-hover:border-cyan-400 transition-colors duration-300">
                  <StepIcon className="w-3.5 h-3.5 text-cyan-400" />
                </div>

                <div className="p-6 bg-slate-900/40 border border-slate-850/80 hover:border-cyan-500/20 rounded-2xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold bg-cyan-950/30 px-2 py-0.5 border border-cyan-500/10 rounded">
                      {step.phase}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{step.focus}</span>
                  </div>

                  <h3 className="text-md font-bold text-slate-150 font-display text-slate-200">
                    {step.title}
                  </h3>

                  <ul className="mt-4 space-y-2 text-xs text-slate-400 font-sans border-t border-slate-850/60 pt-3">
                    {step.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
