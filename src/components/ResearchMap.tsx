import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitFork, Network, Eye, BrainCircuit, HeartPulse, Sparkles, Binary } from 'lucide-react';

interface MapNode {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  connections: string[]; // Node IDs connected
  description: string;
  contributions: string[];
}

const mapNodes: MapNode[] = [
  {
    id: 'comp-neuro',
    name: 'Computational Neuroscience',
    icon: BrainCircuit,
    x: 100,
    y: 80,
    connections: ['rl', 'med-ai'],
    description: 'Reverse-engineering natural credit assignment loops to create scalable, bio-inspired network updates.',
    contributions: ['Synaptic scaling policies', 'Spike rate representation frameworks']
  },
  {
    id: 'rl',
    name: 'Reinforcement Learning',
    icon: Network,
    x: 250,
    y: 110,
    connections: ['comp-neuro', 'med-ai', 'cv', 'llm'],
    description: 'Optimal state action controllers derived from Markov architectures and policy iteration methods.',
    contributions: ['Epsilon-greedy path solvers', 'Deep Temporal Difference convergence models']
  },
  {
    id: 'med-ai',
    name: 'Medical AI',
    icon: HeartPulse,
    x: 400,
    y: 90,
    connections: ['comp-neuro', 'rl', 'bio', 'cv'],
    description: 'Applying non-linear statistical classifiers to clinical biochemical screens to extract risk attributions.',
    contributions: ['Nature Scientific Reports liver risk models', 'Cell classification networks']
  },
  {
    id: 'cv',
    name: 'Computer Vision',
    icon: Eye,
    x: 120,
    y: 250,
    connections: ['rl', 'med-ai', 'bio'],
    description: 'Spatial feature extraction ranging from high-speed object detection to medical biopsy scanning.',
    contributions: ['Lightweight YOLOv8 edge engines', 'Dense histopathological cell segmentations']
  },
  {
    id: 'bio',
    name: 'Bioinformatics',
    icon: Binary,
    x: 380,
    y: 240,
    connections: ['med-ai', 'cv'],
    description: 'Formulating robust feature representations of highly noisy genomic, metabolomic, and biophysical datasets.',
    contributions: ['Serum biomarker liver test assessment indexes']
  },
  {
    id: 'llm',
    name: 'Large Language Models',
    icon: Sparkles,
    x: 250,
    y: 270,
    connections: ['rl'],
    description: 'Contextually aware generative engines aligned via fine-tuning and hierarchical vector semantic searches (RAG).',
    contributions: ['Context-guided document orchestrators']
  }
];

export default function ResearchMap() {
  const [activeNode, setActiveNode] = useState<MapNode | null>(mapNodes[1]); // Default to RL

  return (
    <section id="map" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-4">
            <GitFork className="w-3.5 h-3.5" />
            <span>Interactive Synergy Map</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-100 tracking-tight">
            Research Map & Synergies
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Click specific nodes in the network graph to observe how cross-disciplinary focuses converge on core research questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Active SVG Network Node Canvas */}
          <div className="lg:col-span-7 bg-slate-900/20 border border-slate-800 rounded-2xl p-6 min-h-[380px] flex items-center justify-center relative">
            
            <svg viewBox="0 0 500 350" className="w-full max-w-lg h-auto select-none">
              {/* Lines first (so they render behind nodes) */}
              <g>
                {mapNodes.map((node) => 
                  node.connections.map((connId) => {
                    const target = mapNodes.find((n) => n.id === connId);
                    if (!target) return null;

                    const isActiveLink = activeNode?.id === node.id || activeNode?.id === target.id;

                    return (
                      <line
                        key={`${node.id}-${connId}`}
                        x1={node.x}
                        y1={node.y}
                        x2={target.x}
                        y2={target.y}
                        stroke={isActiveLink ? 'rgb(0, 229, 255)' : '#1e293b'}
                        strokeWidth={isActiveLink ? '1.8' : '0.8'}
                        strokeDasharray={isActiveLink ? 'none' : '3 3'}
                        style={{ transition: 'all 0.4s ease' }}
                        opacity={isActiveLink ? '0.8' : '0.35'}
                      />
                    );
                  })
                )}
              </g>

              {/* Node Interactive Buttons */}
              <g>
                {mapNodes.map((node) => {
                  const NodeIcon = node.icon;
                  const isNodeActive = activeNode?.id === node.id;

                  return (
                    <g 
                      key={node.id} 
                      onClick={() => setActiveNode(node)}
                      className="cursor-pointer group"
                    >
                      {/* Interactive hover halo */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="18"
                        fill="none"
                        stroke="rgb(0, 229, 255)"
                        strokeWidth="1.5"
                        opacity={isNodeActive ? '0.8' : '0'}
                        className="group-hover:opacity-40"
                        style={{ transition: 'all 0.3s ease' }}
                      />

                      {/* Node core circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="11"
                        fill="#020617"
                        stroke={isNodeActive ? 'rgb(0, 229, 255)' : '#475569'}
                        strokeWidth="1.5"
                        style={{ transition: 'all 0.3s ease' }}
                      />

                      {/* Active indicator dot */}
                      {isNodeActive && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="3"
                          fill="rgb(0, 229, 255)"
                        />
                      )}

                      {/* Label Text */}
                      <text
                        x={node.x}
                        y={node.y + 24}
                        textAnchor="middle"
                        fill={isNodeActive ? 'rgb(0, 229, 255)' : '#94a3b8'}
                        fontSize="8.5"
                        fontFamily="Space Grotesk, sans-serif"
                        fontWeight={isNodeActive ? 'bold' : 'normal'}
                        style={{ transition: 'all 0.3s ease' }}
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Convergence / Synthesis detail explanation */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeNode && (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 rounded-2xl h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2.5 bg-cyan-950/40 border border-cyan-500/20 rounded-xl text-cyan-400">
                        <activeNode.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-md font-bold text-slate-100 font-display">
                        {activeNode.name}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans mt-2">
                      {activeNode.description}
                    </p>

                    <div className="mt-6">
                      <p className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">Interdisciplinary Outcomes</p>
                      <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
                        {activeNode.contributions.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-normal">
                            <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono mt-8 border-t border-slate-850 pt-3">
                    Click lines or dots on the map to evaluate different node properties.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
