import { Award, GraduationCap, Users2, NotebookTabs, Compass, Sparkles } from 'lucide-react';

export default function AchievementsSection() {
  const highlights = [
    {
      id: 'pub',
      icon: <NotebookTabs className="text-[#34d399]" size={24} />,
      count: '1',
      title: 'Scientific Reports Publication',
      description: 'Nature Portfolio scientific paper proposing an interpretability-dense medical framework for Metabolic Syndrome predictive diagnostics.',
      metric: 'IF: 4.6'
    },
    {
      id: 'olymp',
      icon: <Award className="text-[#fbbf24]" size={24} />,
      count: '2nd',
      title: 'International Informatics Olympiad',
      description: 'Awarded podium finish globally in structural informatics, showcasing outstanding algorithmic mapping and high-stakes problem-solving under pressure.',
      metric: 'Podium'
    },
    {
      id: 'manager',
      icon: <Users2 className="text-[#60a5fa]" size={24} />,
      count: '1st',
      title: 'AI Department Manager',
      description: 'Chaired and streamlined intelligence operations at Bina Pardaz Shargh, bridging industrial machine vision targets with scalable deep neural networks.',
      metric: 'Leadership'
    },
    {
      id: 'ta',
      icon: <GraduationCap className="text-[#a78bfa]" size={24} />,
      count: '3',
      title: 'Teaching Assistant Roles',
      description: 'Supervised student modules in core academic computer structures: Algorithms execution, low-latency Microprocessors, and optimizing Compiler Design.',
      metric: 'Pedagogy'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {highlights.map((item) => (
        <div
          key={item.id}
          className="group relative glass hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 rounded-2xl p-6 overflow-hidden flex flex-col justify-between h-[260px]"
        >
          {/* Spotlight laser grid lines in background */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          
          <div className="space-y-4">
            {/* Header Icon + Metric Badge */}
            <div className="flex items-center justify-between">
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl group-hover:scale-110 transition duration-300 animate-pulse-slow">
                {item.icon}
              </div>
              <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-400 bg-slate-950 border border-slate-850 px-2 py-0.5 rounded-md transition duration-300 uppercase tracking-widest font-bold">
                {item.metric}
              </span>
            </div>

            {/* Counts & Header Title */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-black text-slate-100 tracking-tighter text-glow select-none">
                  {item.count}
                </span>
                <span className="font-mono text-[10px] text-blue-500 group-hover:animate-pulse">▶ RECORD</span>
              </div>
              <h4 className="font-sans text-xs sm:text-sm font-black text-slate-100 group-hover:text-sky-400 group-hover:text-glow transition uppercase tracking-tight leading-tight">
                {item.title}
              </h4>
            </div>
          </div>

          {/* Description */}
          <p className="font-sans text-xs text-slate-450 leading-relaxed max-w-[280px]">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
