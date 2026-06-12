import { TIMELINE_DATA } from '../data';
import { Award, GraduationCap, Briefcase, FileText, ChevronRight } from 'lucide-react';

export default function TimelineSection() {
  const getIcon = (category: string) => {
    switch (category) {
      case 'education':
        return <GraduationCap className="text-blue-400" size={16} />;
      case 'experience':
        return <Briefcase className="text-yellow-400" size={16} />;
      case 'achievement':
        return <Award className="text-[#a78bfa]" size={16} />;
      case 'research':
        return <FileText className="text-[#34d399]" size={16} />;
      default:
        return <Briefcase className="text-slate-400" size={16} />;
    }
  };

  return (
    <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-12 py-4">
      {TIMELINE_DATA.map((item, index) => (
        <div key={index} className="relative group pl-8 md:pl-12">
          
          {/* Timeline Node Ring Pulser */}
          <div className="absolute -left-[11px] top-1.5 z-10 p-1 rounded-full bg-slate-950 border-2 border-slate-800 group-hover:border-blue-500 group-hover:scale-110 transition duration-300 shadow-xl">
            <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center bg-slate-900 group-hover:bg-blue-900/40 transition">
              {getIcon(item.category)}
            </div>
          </div>

          {/* Large Hover Year indicators left of vertical bar */}
          <div className="hidden md:block absolute -left-36 top-1 text-right w-24">
            <span className="font-mono text-[11px] tracking-widest text-slate-500 group-hover:text-blue-400 font-black transition duration-300">
              {item.year}
            </span>
            <span className="block text-[8px] font-mono text-slate-650 tracking-wider">
              {item.category.toUpperCase()}
            </span>
          </div>

          {/* Main Content Node block */}
          <div className="glass group-hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 p-6 rounded-2xl relative max-w-3xl">
            
            {/* Small screen inline year indicator */}
            <div className="md:hidden flex items-center justify-between font-mono text-[10px] text-blue-400 font-bold mb-2">
              <span>{item.year}</span>
              <span className="uppercase text-slate-500 bg-slate-950 border border-slate-900 py-0.5 px-2 rounded">{item.category}</span>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[9px] text-blue-400 uppercase tracking-wider block">milestone node // es_research</span>
              <h4 className="font-sans text-base sm:text-lg font-black text-slate-100 group-hover:text-blue-300 group-hover:text-glow transition duration-300 tracking-tight leading-tight">
                {item.title}
              </h4>
              <p className="font-sans text-xs font-semibold text-slate-400">
                {item.organization}
              </p>
            </div>

            <p className="font-sans text-xs text-slate-450 leading-relaxed mt-3.5 border-t border-slate-950/45 pt-3">
              {item.description}
            </p>

            {/* Custom tags/pills accompanying timeline */}
            {item.tags && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono bg-slate-950/80 text-slate-500 group-hover:text-slate-350 py-0.5 px-2 rounded-md border border-slate-900 transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
