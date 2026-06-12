import { useState, useMemo } from 'react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data';
import { Search, FolderGit2, ArrowUpRight, Github, Cpu, KeyRound, Lightbulb, Code2, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Filter keys categories mapping
  const categories = useMemo(() => [
    { key: 'all', label: 'All Projects' },
    { key: 'medical-ai', label: 'Medical AI' },
    { key: 'computer-vision', label: 'Computer Vision' },
    { key: 'nlp', label: 'NLP / Generative AI' },
    { key: 'robotics', label: 'Robotics & Control' },
    { key: 'deep-learning', label: 'Core Deep Learning' }
  ], []);

  // Filter logic
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter(project => {
      const matchCat = selectedCategory === 'all' || project.category === selectedCategory || 
                       (selectedCategory === 'computer-vision' && project.id.includes('defect')) || 
                       (selectedCategory === 'computer-vision' && project.id.includes('cow'));
      const matchSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="project-showcase" className="space-y-8">
      {/* Filtering Actions Terminal */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass p-4 rounded-2xl">
        {/* Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none pr-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition whitespace-nowrap ${
                selectedCategory === cat.key
                  ? 'bg-blue-600 border border-blue-500 text-white shadow-lg'
                  : 'bg-slate-950/70 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Searching Terminal input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-2.5 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Search stack or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Grid of highly stylized project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              setSelectedProject(project);
              setActiveImageIndex(0);
            }}
            className="group relative glass hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between h-[410px]"
          >
            {/* Header Graphics (High tech SVG or grid styling to look like deep learning structures) */}
            <div className={`h-36 bg-gradient-to-br ${project.imagePlaceholderColor} p-4 flex flex-col justify-between border-b border-slate-950 relative`}>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40"></div>
              
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono font-bold bg-slate-950/80 text-blue-400 px-2 py-0.5 rounded border border-slate-800 uppercase tracking-widest">
                  {project.category.replace('-', ' ')}
                </span>
                {project.githubUrl && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.githubUrl, '_blank', 'noreferrer');
                    }}
                    className="p-1 px-2.5 rounded bg-slate-950/80 border border-slate-800 hover:border-slate-600 transition flex items-center gap-1.5 text-xs text-slate-300"
                  >
                    <Github size={12} />
                    <span className="font-mono text-[9px] font-bold">SOURCE</span>
                  </div>
                )}
              </div>

              {/* Graphic architecture drawing layout representation inside card to feel like a researcher's notebook */}
              <div className="w-full flex items-center justify-center opacity-25 group-hover:opacity-40 select-none pointer-events-none transition-opacity">
                {project.category === 'nlp' && (
                  <div className="font-mono text-[9px] text-center border border-slate-700/60 p-1.5 rounded leading-none">
                    [Doc] ➔ (Vector Embed) ➔ [RAG Context] ➔ Query G-GenAI
                  </div>
                )}
                {project.category === 'medical-ai' && (
                  <div className="w-16 h-12 border border-rose-500 rounded-full flex items-center justify-center">
                    <div className="w-10 h-7 border border-rose-400/40 rounded-full animate-ping"></div>
                  </div>
                )}
                {project.category === 'computer-vision' && (
                  <div className="grid grid-cols-3 gap-0.5 max-w-[80px]">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-slate-700 border border-slate-900 leading-none text-[6px] flex items-center justify-center">w</div>
                    ))}
                  </div>
                )}
                {project.category === 'robotics' && (
                  <div className="text-[14px] font-bold text-slate-500 tracking-widest leading-none">
                    🎛️ [PID_CRX_01]
                  </div>
                )}
                {project.category === 'deep-learning' && (
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                    <div className="w-0.5 h-6 bg-slate-700"></div>
                    <div className="flex flex-col gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="w-0.5 h-6 bg-slate-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                  </div>
                )}
                {project.category === 'infrastructure' && (
                  <div className="text-[10px] font-mono text-cyan-400">
                    Active Uncertainty CLI
                  </div>
                )}
              </div>

              <div className="flex items-end justify-between font-mono text-[10px] text-slate-400 z-10 leading-none">
                <span>0.0.0.0:3000 // ADDR</span>
                <span>METRIC_OK</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-sans text-xs sm:text-sm font-black text-slate-100 group-hover:text-blue-400 group-hover:text-glow transition uppercase tracking-tight leading-tight">
                    {project.title}
                  </h4>
                  <ArrowUpRight className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-200" size={18} />
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Technologies list */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5 overflow-hidden max-h-[85px]">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800/60"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-[9px] font-mono bg-slate-950 text-blue-400 px-1.5 py-0.5 rounded border border-slate-800/60">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 border border-slate-800 border-dashed rounded-2xl bg-slate-950/20">
          <FolderGit2 className="text-slate-600 mx-auto mb-3" size={32} />
          <p className="font-mono text-xs text-slate-500">No project nodes matched search vector parameters.</p>
        </div>
      )}

      {/* Case Study Modal Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header graphics inside modal */}
            <div className={`p-6 bg-gradient-to-br ${selectedProject.imagePlaceholderColor} border-b border-slate-950 flex flex-col justify-between relative`}>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40"></div>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-600 transition-all z-20"
              >
                <X size={16} />
              </button>

              <div className="space-y-2 z-10 pr-10">
                <span className="text-[10px] font-mono font-bold bg-slate-950 text-blue-400 px-2 py-0.5 rounded border border-slate-800 uppercase tracking-widest">
                  {selectedProject.category.replace('-', ' ')}
                </span>
                <h3 className="font-sans text-xl sm:text-2xl font-black text-slate-100 tracking-tight leading-tight">
                  {selectedProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 mt-4 text-xs font-mono text-slate-300 z-10">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 hover:border-slate-500 text-white px-3 py-1.5 rounded-lg transition"
                  >
                    <Github size={13} />
                    <span>Examine Repository</span>
                  </a>
                )}
                <span className="text-slate-500">Node_ID: {selectedProject.id}</span>
              </div>
            </div>

            {/* Scrollable Container Content */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-slate-300">
              
              {/* Concept / Scientific Summary */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-blue-400">
                  <Code2 size={13} />
                  <span>ARCHITECTURE & SYSTEM OVERVIEW</span>
                </div>
                <p className="font-sans text-sm text-slate-200 leading-relaxed bg-slate-950/20 p-4 rounded-xl border border-slate-800/40">
                  {selectedProject.longDescription}
                </p>
              </div>

              {/* Research Impact Metric (For PhD candidates, this is golden!) */}
              {selectedProject.researchImpact && (
                <div className="border border-emerald-500/20 bg-emerald-500/5 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                    <Lightbulb size={13} />
                    <span>ACADEMIC & SCIENTIFIC VALUE</span>
                  </div>
                  <p className="font-sans text-xs italic text-slate-300">
                    "{selectedProject.researchImpact}"
                  </p>
                </div>
              )}

              {/* Grid representation of Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-yellow-400">
                    <KeyRound size={13} />
                    <span>CORE FUNCTIONAL CAPABILITIES</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedProject.keyFeatures.map((feat, i) => (
                      <li key={i} className="text-xs flex items-start gap-2 text-slate-300 leading-relaxed">
                        <span className="text-yellow-400 text-xs font-mono select-none mt-0.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950/40 border border-slate-800/50 p-4 rounded-xl flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400">
                      <Cpu size={13} />
                      <span>DEVELOPMENT STACK</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-900/50 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>DEPLOY_STATUS: OFF_SHORE</span>
                    <span>RUNTIME: LOCALHOST</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom panel */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 flex justify-end gap-2.5 z-10 shadow-inner">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-500 font-mono text-xs rounded-xl transition"
              >
                Close Visualizer
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
