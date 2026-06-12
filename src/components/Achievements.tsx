import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Zap, Code2, Users, FileSpreadsheet, Building2, Flame } from 'lucide-react';

interface StatItem {
  number: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const stats: StatItem[] = [
  {
    number: 1,
    suffix: '',
    label: 'Published Paper',
    icon: FileSpreadsheet,
    description: 'Lead/Co-author on metabolic predictions in top-tier Nature Scientific Reports journal.'
  },
  {
    number: 2,
    suffix: 'nd',
    label: 'Olympiad Rank',
    icon: Award,
    description: 'Second place worldwide result in elite informatics computer science competitions.'
  },
  {
    number: 3,
    suffix: '+',
    label: 'TA Class Roles',
    icon: Code2,
    description: 'Instructing algorithms, compilation engineering, and microprocessor design.'
  },
  {
    number: 1,
    suffix: '',
    label: 'AI Dept Manager',
    icon: Building2,
    description: 'Led technical architecture core machine vision pipelines at Bina Pardaz Shargh.'
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-slate-950/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-4">
            <Flame className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Honors & Milestones</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-100 tracking-tight">
            Scientific Achievements & Impact
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Quantifiable metrics mapping academic milestones, competitive coding triumphs, and industrial leadership.
          </p>
        </div>

        {/* Counter items cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex">
              <AchievementCard stat={stat} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ stat, index }: { stat: StatItem; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = stat.number;
    if (start === end) {
      setCount(end);
      return;
    }

    const duration = 1500;
    const stepTime = 50;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, stat.number]);

  const StatIcon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative p-6 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-cyan-500/20 hover:bg-slate-900/60 transition-all duration-300 shadow-xl group cursor-pointer overflow-hidden z-10"
    >
      {/* Visual lighting beam spotlight on hover */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-cyan-405 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
            <StatIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline gap-1 mt-6">
          <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display glow-text-blue">
            {count}
          </span>
          <span className="text-xl font-bold font-display text-cyan-400">
            {stat.suffix}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-100 mt-2 font-mono uppercase tracking-wider">
          {stat.label}
        </h3>

        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          {stat.description}
        </p>
      </div>

      <div className="mt-6 border-t border-slate-850/60 pt-3 text-[10px] text-slate-500 font-mono flex items-center justify-between group-hover:text-cyan-400/80 transition-colors">
        <span>Verified Credential</span>
        <span>✓</span>
      </div>
    </motion.div>
  );
}
