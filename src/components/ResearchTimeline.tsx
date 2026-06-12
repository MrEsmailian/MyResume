import React from 'react';
import { motion } from 'motion/react';
import { TimelineItem } from '../types';
import { Calendar, Award, GraduationCap, Briefcase, BookOpen } from 'lucide-react';

const timelineData: TimelineItem[] = [
  {
    year: '2020',
    title: "Bachelor's in Computer Engineering",
    institution: 'Ferdowsi University of Mashhad',
    description: 'Foundational studies focusing on computer architecture, algorithms, and cognitive software. Graduated with deep engagement in intelligence structures and automated design systems.',
    details: [
      'Focus areas: Data Structures & Algorithms, Systems Architecture',
      'Developed initial computer vision pipelines and sensor network frameworks'
    ],
    type: 'academic'
  },
  {
    year: '2023',
    title: 'AI Department Manager',
    institution: 'Bina Pardaz Shargh (BPS)',
    description: 'Headed the core artificial intelligence division, leading technical architecture and product design for industrial computer vision, automated surveillance systems, and real-time defect verification systems.',
    details: [
      'Led a team of engineering practitioners deploying CNN and model distillation models',
      'Coordinated visual classification pipeline products with 98.7% diagnostic yields'
    ],
    type: 'professional'
  },
  {
    year: '2024',
    title: 'International Informatics Olympiad',
    institution: 'Worldwide Competition',
    description: 'Awarded 2nd Place in the competitive worldwide tournament, demonstrating expertise in advanced algorithmic modeling, complex data structures, dynamic programming solvers, and graph computations.',
    details: [
      'Formulated hyper-optimized computational graphs and search models under constraint',
      'Tested against elite computer scientists globally'
    ],
    type: 'honor'
  },
  {
    year: '2024',
    title: 'Teaching Assistant',
    institution: 'Senior Academic Courses',
    description: 'Instructed and mentored elite student cohorts in advanced academic syllabics, hosting interactive labs and evaluating structures.',
    details: [
      'Subject Domains: Algorithms & Structures, Microprocessor Design, Compiler Theory Design',
      'Delivered lab demonstrations mapping code to concrete low-level architectures'
    ],
    type: 'academic'
  },
  {
    year: '2025',
    title: "Master's in Artificial Intelligence",
    institution: 'Amirkabir University of Technology',
    description: "Deep research in the prestigious postgraduate AI module. Actively synthesizing neural architectures, deep reinforcement learning policies, and medical diagnostic classification models.",
    details: [
      'Key fields: Deep Reinforcement Learning, Computational Neuroscience models',
      'Maintained peak positioning in machine intelligence seminars and lab sessions'
    ],
    type: 'academic'
  },
  {
    year: '2025',
    title: 'Published Research Paper',
    institution: 'Scientific Reports (Nature Publishing Group)',
    description: 'Co-authored and published groundbreaking research on biological prediction modeling. Conceived a metabolic prediction framework leveraging complex liver panel arrays.',
    details: [
      'Leveraged advanced feature engineering on serum liver biomarker metrics',
      'Built a highly interpretable diagnostics model praised for Clinical Actionability'
    ],
    type: 'honor'
  }
];

export default function ResearchTimeline() {
  const getIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'academic':
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      case 'professional':
        return <Briefcase className="w-5 h-5 text-purple-400" />;
      case 'honor':
        return <Award className="w-5 h-5 text-amber-400" />;
      default:
        return <Calendar className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getTypeStyle = (type: TimelineItem['type']) => {
    switch (type) {
      case 'academic': return 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300';
      case 'professional': return 'border-purple-500/30 bg-purple-950/20 text-purple-300';
      case 'honor': return 'border-amber-500/30 bg-amber-950/20 text-amber-300';
    }
  };

  return (
    <section id="timeline" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-4"
          >
            <ClockIcon className="w-3.5 h-3.5" />
            <span>Interactive Chronology</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold font-display heading-dark tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
          >
            Academic & Research Journey
          </motion.h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Timeline mapping academic milestones, professional executive experience, and publications.
          </p>
        </div>

        {/* Scroll timeline container */}
        <div className="relative">
          {/* Vertical core line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-slate-800/80 -translate-x-[1px]" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-stretch">
                  {/* Central Node Circle */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-[15px] top-6 z-10 w-8 h-8 rounded-full border border-slate-700 bg-slate-950 flex items-center justify-center cursor-pointer shadow-lg hover:border-cyan-400 transition-colors duration-300">
                    {getIcon(item.type)}
                  </div>

                  {/* Left Side Content */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 flex ${isEven ? 'md:justify-end' : 'md:opacity-0 pointer-events-none hidden md:flex'}`}>
                    {isEven && (
                      <TimelineCard item={item} isEven={isEven} />
                    )}
                  </div>

                  {/* Right Side Content */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-12 flex ${!isEven ? 'md:justify-start' : 'md:opacity-0 pointer-events-none hidden md:flex'}`}>
                    {!isEven && (
                      <TimelineCard item={item} isEven={isEven} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item, isEven }: { item: TimelineItem; isEven: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -25 : 25, y: 15 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative w-full max-w-lg bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/20 hover:bg-slate-900/60 transition-all duration-300 shadow-xl group cursor-default`}
    >
      <div className="flex items-center justify-between mb-3 border-b border-slate-800/40 pb-2">
        <span className="text-xl font-bold font-mono text-cyan-400 tracking-wider">
          {item.year}
        </span>
        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border ${item.type === 'academic' ? 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300' : item.type === 'professional' ? 'border-purple-500/30 bg-purple-950/20 text-purple-300' : 'border-amber-500/30 bg-amber-950/20 text-amber-300'}`}>
          {item.type}
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-100 font-display group-hover:text-cyan-300 transition-colors">
        {item.title}
      </h3>
      <p className="text-xs font-semibold text-slate-400 font-mono mt-0.5">
        {item.institution}
      </p>

      <p className="text-xs text-slate-300 mt-3 leading-relaxed">
        {item.description}
      </p>

      {item.details.length > 0 && (
        <ul className="mt-4 space-y-1 text-[11px] text-slate-400 border-t border-slate-850 pt-3">
          {item.details.map((detail, dIdx) => (
            <li key={dIdx} className="flex items-start gap-1.5 leading-normal">
              <span className="text-cyan-400 mt-1">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
