import { useState, useEffect } from 'react';
import NeuralBackground from './components/NeuralBackground';
import TimelineSection from './components/TimelineSection';
import ResearchMap from './components/ResearchMap';
import SkillsVisualization from './components/SkillsVisualization';
import ProjectShowcase from './components/ProjectShowcase';
import AchievementsSection from './components/AchievementsSection';
import GithubSection from './components/GithubSection';
import RLEasterEgg from './components/RLEasterEgg';
import ContactSection from './components/ContactSection';
import CommandPalette from './components/CommandPalette';
import { RESEARCH_INTERESTS, FEATURE_PUBLICATION } from './data';
import { ResearchInterest } from './types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  GraduationCap, 
  ArrowRight, 
  BookOpen, 
  Quote, 
  Compass, 
  Sparkles, 
  Activity, 
  Brain, 
  Zap, 
  Eye, 
  Dna, 
  FileText, 
  Search, 
  HelpCircle,
  Menu,
  X,
  Plus
} from 'lucide-react';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubInterest, setActiveSubInterest] = useState<ResearchInterest | null>(RESEARCH_INTERESTS[0]);
  const [typedIndex, setTypedIndex] = useState(0);
  const [selectedPaperAbstract, setSelectedPaperAbstract] = useState(false);

  // Cycling titles in research portfolio (Typing effect)
  const typingPhrases = [
    'Model-Based Reinforcement Learning',
    'Cognitive Replay & Spiking Network Topologies',
    'Multimodal Serum Metabolic Forecasting',
    'Vision-Guided Trajectory Traversal Policies'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedIndex((prev) => (prev + 1) % typingPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getInterestIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case 'Zap': return <Zap className="text-yellow-400" size={size} />;
      case 'Network': return <Sparkles className="text-blue-400" size={size} />;
      case 'Brain': return <Brain className="text-pink-400" size={size} />;
      case 'Activity': return <Activity className="text-emerald-400" size={size} />;
      case 'Search': return <Search className="text-amber-400" size={size} />;
      case 'Eye': return <Eye className="text-sky-400" size={size} />;
      case 'FileText': return <FileText className="text-blue-400" size={size} />;
      case 'Dna': return <Dna className="text-violet-400" size={size} />;
      default: return <HelpCircle className="text-slate-400" size={size} />;
    }
  };

  const handleCitationCopy = () => {
    navigator.clipboard.writeText(FEATURE_PUBLICATION.citation);
    alert('Academic citation copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 relative font-sans selection:bg-blue-600 selection:text-white pb-16 overflow-x-hidden">
      
      {/* Neural particle canvas active background */}
      <NeuralBackground />

      {/* Floating command palette controller */}
      <CommandPalette />

      {/* Scroll indicator linear loading bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Glass Navigation Bar header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl h-14 bg-slate-950/70 border border-slate-900 rounded-2xl flex items-center justify-between px-6 backdrop-blur-md z-40 shadow-xl transition-all">
        <div className="flex items-center gap-2">
          <Brain className="text-blue-500 animate-spin-slow" size={20} />
          <span className="font-mono text-xs font-bold tracking-widest text-slate-100 uppercase">
            REZA.ESMAILIAN // AI_LAB
          </span>
        </div>

        {/* Desktop Links navigation */}
        <nav className="hidden lg:flex items-center gap-5 text-[11px] font-mono tracking-wider">
          <a href="#home-hero" className="text-slate-400 hover:text-white transition">Presentation</a>
          <a href="#interactive-timeline-section" className="text-slate-400 hover:text-white transition">Timeline</a>
          <a href="#research-interests-section" className="text-slate-400 hover:text-white transition">Interests</a>
          <a href="#publications" className="text-slate-400 hover:text-white transition">Publications</a>
          <a href="#features-case-studies" className="text-slate-400 hover:text-white transition">Gallery</a>
          <a href="#skills-map-visualization" className="text-slate-400 hover:text-white transition">Synapse Nodes</a>
          <a href="#research-map-section font-bold" className="text-blue-400 hover:text-blue-300 transition">Network Graph</a>
          <a href="#professional-academic-contact" className="text-slate-400 hover:text-white transition">Contact</a>
        </nav>

        {/* Desktop CV Downloader social anchor */}
        <a
          href="mailto:reza.esmailian81@gmail.com?subject=Requesting Academic CV - MR Esmailian"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-blue-500/35 hover:text-blue-300 text-slate-300 rounded-xl transition text-[10px] font-mono"
        >
          <Download size={12} />
          <span>Curriculum Vitae</span>
        </a>

        {/* Mobile toggler */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 focus:outline-none text-slate-400 hover:text-white rounded border border-slate-900 bg-slate-950"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </header>

      {/* Mobile Menu Backdrop & drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8 animate-fade-in font-mono text-sm">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-4 border border-slate-800 bg-slate-900/40 rounded-full text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col gap-6 items-center text-center">
            <a href="#home-hero" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition text-base">Presentation</a>
            <a href="#interactive-timeline-section" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition text-base">Timeline</a>
            <a href="#research-interests-section" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition text-base">Interests</a>
            <a href="#publications" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition text-base">Publications</a>
            <a href="#features-case-studies" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition text-base">Gallery</a>
            <a href="#skills-map-visualization" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition text-base">Synapse Nodes</a>
            <a href="#professional-academic-contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-white transition text-base">Contact</a>
          </div>

          <a
            href="mailto:reza.esmailian81@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl text-white font-mono text-xs"
          >
            <Download size={14} />
            <span>Download Curriculum Vitae</span>
          </a>
        </div>
      )}

      {/* Primary Container space holding single page layouts */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-32 space-y-28 relative">

        {/* SECTION 1: HERO CONTAINER AREA */}
        <section id="home-hero" className="min-h-[75vh] flex flex-col justify-center relative py-12">
          {/* Subtle decoration vector grid card */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none hidden xl:block select-none">
            <pre className="font-mono text-[7px] leading-tight text-blue-400">
{`   // Synaptic feedback weight calculation matrix
   W_T = WeightTensor([512, 1024, 1024, 256])
   policy = SoftmaxActor(critic=DQNCell())
   
          ◯ ------- ◯ ------- ◯
        / \\     / \\     / \\
       /   \\   /   \\   /   \\
      ◯     ◯     ◯     ◯     ◯
       \\   /   \\   /   \\   /
        \\ /     \\ /     \\ /
          ◯ ------- ◯ ------- ◯
   
   state_loss = MeanSquareError(target_q - active_q)
   optimizer = AdamW(weight_decay=1e-4, lr=3e-4)
   
   // Loop feedback converges under limits where G = gamma`}
            </pre>
          </div>

          <div className="max-w-3xl space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-blue-400 flex items-center gap-1.5 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                ACTIVE DOCTORAL CANDIDACY PROSPECT // AUT_AI
              </span>
              <h1 className="font-sans text-4xl sm:text-5xl md:text-7xl font-black text-slate-100 tracking-tighter leading-none text-glow uppercase">
                MOHAMMAD-REZA ESMAILIAN
              </h1>
              
              {/* Dynamic typing loop */}
              <div className="h-6 flex items-center font-mono text-xs sm:text-sm text-sky-400">
                <span>&gt;&nbsp;</span>
                <span className="font-bold underline decoration-blue-500/50">{typingPhrases[typedIndex]}</span>
                <span className="animate-pulse ml-0.5">_</span>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-slate-355 leading-relaxed">
              Master's student in Artificial Intelligence exploring how intelligent systems learn, adapt, and interact with complex environments. My work spans Reinforcement Learning, Deep Learning, Medical AI, Computer Vision, and emerging intersections with Computational Neuroscience.
            </p>

            {/* Social Anchor Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#professional-academic-contact"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 border border-blue-500 text-white font-mono text-xs rounded-xl transition flex items-center gap-2 shadow-lg shadow-blue-600/10 cursor-pointer"
              >
                <span>Contact Terminal</span>
                <ArrowRight size={13} />
              </a>

              <a
                href="https://github.com/MrEsmailian"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-slate-900/80 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white rounded-xl transition flex items-center gap-2 text-xs font-mono"
              >
                <Github size={13} />
                <span>GitHub Codebase</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-slate-900/80 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white rounded-xl transition flex items-center gap-2 text-xs font-mono"
              >
                <Linkedin size={13} />
                <span>LinkedIn Connect</span>
              </a>
            </div>
          </div>
        </section>


        {/* SECTION 2: THE INTERACTIVE RESEARCH TIMELINE */}
        <section id="interactive-timeline-section" className="space-y-10 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-500 tracking-wider uppercase block font-bold">&gt;_ CAREER_TOPOLOGY</span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-slate-100 tracking-tighter uppercase text-glow">
              Interactive Research Timeline
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Academic milestones, industrial deployment experience, and competitive awards representing a progressive trajectory toward PhD-level research.
            </p>
          </div>

          <TimelineSection />
        </section>


        {/* SECTION 3: INTERACTIVE RESEARCH INTERESTS CARDS */}
        <section id="research-interests-section" className="space-y-10 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#a78bfa] tracking-wider uppercase block font-bold">&gt;_ KNOWLEDGE_SECTORS</span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-slate-100 tracking-tighter uppercase text-glow">
              In-depth Research Ecosystem
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-normal">
              Exploring multi-disciplinary interfaces in artificial intelligence. Select any quadrant block below to review research focus items and active implementations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESEARCH_INTERESTS.map((interest) => (
              <div
                key={interest.id}
                onClick={() => setActiveSubInterest(interest)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-[180px] ${
                  activeSubInterest?.id === interest.id
                    ? 'bg-slate-900/70 border-blue-500/50 text-white shadow-xl scale-102'
                    : 'bg-slate-900/10 border-slate-850 hover:border-slate-700/80 text-slate-300 hover:bg-slate-900/30'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl">
                      {getInterestIcon(interest.iconName)}
                    </div>
                    {activeSubInterest?.id === interest.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
                    )}
                  </div>
                  <h4 className="font-sans text-sm font-bold tracking-tight">
                    {interest.title}
                  </h4>
                </div>

                <p className="font-sans text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>

          {/* Sub-interest detail context panel display */}
          {activeSubInterest && (
            <div className="p-6 md:p-8 bg-slate-950/60 border border-slate-850 rounded-2xl md:rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 items-start font-mono animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-[0.03] text-[90px] uppercase font-black tracking-widest text-[#a78bfa] pointer-events-none select-none">
                {activeSubInterest.id}
              </div>

              <div className="space-y-4 md:w-1/2 pr-0 md:pr-6 border-b md:border-b-0 md:border-r border-slate-900 pb-5 md:pb-0">
                <span className="text-[10px] text-slate-500 tracking-widest block uppercase">Quadrant FOCUS Parameters</span>
                <h4 className="font-sans text-base sm:text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
                  {getInterestIcon(activeSubInterest.iconName, 18)}
                  <span>{activeSubInterest.title}</span>
                </h4>
                <p className="font-sans text-xs text-slate-350 leading-relaxed font-normal">
                  {activeSubInterest.description}
                </p>
              </div>

              <div className="space-y-4 md:w-1/2 md:pl-6">
                <div>
                  <span className="text-[10px] text-slate-500 tracking-widest block uppercase mb-2">RESEARCH_DIRECTIONS</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {activeSubInterest.directions.map((dir, i) => (
                      <li key={i} className="flex items-start gap-1 p-1 max-w-[420px] leading-relaxed">
                        <span className="text-blue-400 font-bold mr-1">&gt;</span>
                        <span>{dir}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>


        {/* SECTION 4: PUBLICATIONS HIGHLIGHT SECTION */}
        <section id="publications" className="space-y-10 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#34d399] tracking-wider uppercase block font-bold">&gt;_ SCHOLAR_REPORTS</span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-slate-100 tracking-tighter uppercase text-glow">
              Featured Scientific Publication
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Peer-reviewed academic research outlining predictive biosensor pipelines published under nature portfolio.
            </p>
          </div>

          <div className="glass publication-card overflow-hidden shadow-2xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col xl:flex-row justify-between gap-6">
              
              {/* Publication Context Block */}
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded">
                    Scientific Reports
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
                    Nature Portfolio
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    DOI: {FEATURE_PUBLICATION.doi}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-sans text-lg sm:text-xl font-black text-slate-100 tracking-tight leading-tight hover:text-blue-300 transition-all">
                    "{FEATURE_PUBLICATION.title}"
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Quote size={12} className="text-slate-500" />
                    <span>Authors: {FEATURE_PUBLICATION.authors.join(', ')}</span>
                  </div>
                </div>

                <p className="font-sans text-xs text-slate-400 leading-relaxed font-normal">
                  {FEATURE_PUBLICATION.abstract.slice(0, 190)}...
                </p>

                {/* Citation Actions triggers */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <button
                    onClick={() => setSelectedPaperAbstract(true)}
                    className="px-3.5 py-1.5 bg-slate-950/80 border border-slate-850 hover:border-slate-650 hover:text-white text-slate-300 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <BookOpen size={13} />
                    <span>View Scientific Abstract</span>
                  </button>
                  <button
                    onClick={handleCitationCopy}
                    className="px-3.5 py-1.5 bg-slate-950/80 border border-slate-850 hover:border-slate-650 hover:text-white text-slate-300 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer transition"
                  >
                    <span>Cite Paper</span>
                  </button>
                </div>
              </div>

              {/* Publication Impact metrics visuals cards */}
              <div className="grid grid-cols-2 gap-3 xl:w-[350px]">
                {FEATURE_PUBLICATION.impactMetrics.map((met, i) => (
                  <div key={i} className="p-3 bg-slate-950/50 rounded-xl border border-slate-850 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase block leading-tight">{met.label}</span>
                      <strong className="text-base font-black font-mono text-blue-400 mt-1 block">{met.value}</strong>
                    </div>
                    <span className="text-[9px] font-mono text-slate-600 mt-2 block leading-none">{met.description}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>


        {/* SECTION 5: THE INTERACTIVE RESEARCH MAP NETWORK */}
        <section id="academic-research-concentric-map" className="space-y-10 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase block font-bold">&gt;_ FORCE_RELATIONAL_SPACE</span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-slate-100 tracking-tighter uppercase text-glow">
              Integrated Research Fields Map
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Force-directed constellation demonstrating how biologically inspired AI frameworks fuse with medical decision logs and computer vision grids.
            </p>
          </div>

          <ResearchMap />
        </section>


        {/* SECTION 6: HIGHLY INTERACTIVE PROJECT EXHIBITS */}
        <section id="features-case-studies" className="space-y-10 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#38bdf8] tracking-wider uppercase block font-bold">&gt;_ RESEARCH_PORTFOLIO_ARCD</span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-slate-100 tracking-tighter uppercase text-glow">
              Select Case Studies & Repositories
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-normal">
              A curated catalog of open-source frameworks, deep vision segmenters, medical predictors, and robotic control modules compiled over years.
            </p>
          </div>

          <ProjectShowcase />
        </section>


        {/* SECTION 7: SKILLS SYNAPTIC CONSTELLATION */}
        <section id="skills-map-visualization" className="space-y-10 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono text-pink-400 tracking-wider uppercase block font-bold">&gt;_ INTEGRATED_COMPENTENCY_NODES</span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-slate-100 tracking-tighter uppercase text-glow">
              Interactive Synaptic Skill Constellation
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-normal">
              Modeling stack capabilities as active neuronal terminals. Proficient libraries (like PyTorch and Python) feature faster electrical visual synapse pulses.
            </p>
          </div>

          <SkillsVisualization />
        </section>


        {/* SECTION 8: GITHUB SECTION PROFILE */}
        <section id="github-section-and-profile" className="space-y-10 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase block font-bold">&gt;_ CODEBASE_SYNCHRONIZATION</span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-slate-100 tracking-tighter uppercase text-glow">
              Dynamic Open Source Contribution
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Live integration linking the portfolio directly into GitHub profile repositories and sync registries.
            </p>
          </div>

          <GithubSection />
        </section>


        {/* SECTION 9: INTERACTIVE ACADEMIC EDUCATION & COMPETITIVE HIGHLIGHTS */}
        <section id="education-academic-curriculum" className="space-y-10 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono text-yellow-400 tracking-wider uppercase block font-bold">&gt;_ ACADEMIC_CREDENTIALS</span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-slate-100 tracking-tighter uppercase text-glow">
              Educational Foundations
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Scholarly pathways at top regional research institutes, specializing in computational models and artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bachelor Card */}
            <div className="border border-slate-800 bg-slate-900/10 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300 h-[280px]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-blue-400">
                    <GraduationCap size={20} />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 bg-slate-950 border border-slate-850 px-2 py-0.5 rounded">
                    2020 GPA: TOP_TIER
                  </span>
                </div>
                <div>
                  <h4 className="font-sans text-base font-bold text-slate-100">Bachelor's in Computer Engineering</h4>
                  <span className="font-sans text-xs text-slate-400 block mt-0.5">Ferdowsi University of Mashhad</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 text-xs text-slate-400 space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-wider block text-slate-500">Focus curriculum</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Data Structures', 'Operating Systems', 'Probability for Computer Engineering', 'Artificial Intelligence'].map((crs) => (
                    <span key={crs} className="text-[10px] font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-slate-850/50">
                      {crs}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Master Card */}
            <div className="border border-slate-800 bg-slate-900/10 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300 h-[280px]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-yellow-400">
                    <GraduationCap size={20} />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 bg-slate-950 border border-slate-850 px-2 py-0.5 rounded animate-pulse">
                    2025 MASTER_NODE
                  </span>
                </div>
                <div>
                  <h4 className="font-sans text-base font-bold text-slate-100">Master's in Artificial Intelligence</h4>
                  <span className="font-sans text-xs text-slate-400 block mt-0.5">Amirkabir University of Technology</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 text-xs text-slate-400 space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-wider block text-slate-500">Advanced doctoral preps</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Deep Reinforcement Learning', 'Probabilistic Graphical Models', 'Intelligent Robotic Control', 'Advanced Machine Learning'].map((crs) => (
                    <span key={crs} className="text-[10px] font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-slate-850/50">
                      {crs}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 10: ACHIEVEMENTS COUNT HIGHLIGHT GRID */}
        <section id="academic-spotlight-achievements" className="space-y-10 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#fbbf24] tracking-wider uppercase block font-bold">&gt;_ HIGH_SPARK_HIGHLIGHTS</span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-slate-100 tracking-tighter uppercase text-glow">
              Academic & Leadership Spotlights
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Consolidated, verifiable milestones covering international podium finishes, managerial appointments, and instructional operations.
            </p>
          </div>

          <AchievementsSection />
        </section>


        {/* SECTION 11: FUTURE RESEARCH ROADMAP (PhD target) */}
        <section id="doctoral-research-aspirations" className="space-y-10 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#a78bfa] tracking-wider uppercase block font-bold">&gt;_ FUTURE_HORIZON_DIAGNOSTIC</span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-slate-100 tracking-tighter uppercase text-glow">
              Where I Want To Go (PhD Aspirations)
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Framing my upcoming research parameters toward a doctoral pipeline, integrating brain-inspired computational mechanisms with resilient temporal difference policy controls.
            </p>
          </div>

          <div className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden flex flex-col md:flex-row gap-6 justify-between items-start">
            <div className="space-y-4 max-w-2xl font-sans">
              <span className="font-mono text-[10px] text-blue-400 block tracking-widest leading-none">&gt; ROADMAP / 2026-2030</span>
              <h4 className="text-md sm:text-lg font-bold text-slate-100">
                Plausible Neural Coding for Continuous Adaptive Agents
              </h4>
              
              <p className="text-xs text-slate-350 leading-relaxed font-normal">
                My overarching goal is to decipher continuous reinforcement algorithms by modeling dopaminergic reward relays inside high-dimensional synthetic environments. Specifically, I intend to bridge the gap between Spiking Neural Networks (SNNs) and classical model-based deep RL to build robust controllers that demonstrate quick sim-to-real transfer and low power ceilings.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-900">
                <div className="space-y-1">
                  <strong className="text-xs font-mono text-pink-400 block">&gt; Computational Neuroscience</strong>
                  <span className="text-[11px] text-slate-450 block leading-relaxed">
                    Analyzing cerebellar sensory feedback pathways to design self-repairing actor-critic policies.
                  </span>
                </div>
                <div className="space-y-1">
                  <strong className="text-xs font-mono text-emerald-400 block">&gt; High-Precision Medical AI</strong>
                  <span className="text-[11px] text-slate-450 block leading-relaxed">
                    Formalizing clinical sequential decision processes (MDPs) to formulate adaptive treatment regimens.
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-950/80 border border-slate-850 rounded-xl space-y-4 font-mono text-xs w-full md:w-[280px]">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Core doctoral focuses</span>
              
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-450">Sample Efficiency</span>
                  <span className="text-emerald-400 font-bold">CRITICAL</span>
                </div>
                <div className="flex justify-between pointer-events-none">
                  <span className="text-slate-440">Biologic Replay</span>
                  <span className="text-blue-400 font-bold">SNNs / STDP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-450">Interpretability</span>
                  <span className="text-yellow-400 font-bold">XAI (SHAP)</span>
                </div>
              </div>

              <div className="pt-3.5 border-t border-slate-900 text-center">
                <span className="text-[10px] text-slate-500 italic block leading-tight">
                  Actively examining calls for PhD applications in top global laboratories.
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 12: THE HIDDEN REINFORCEMENT LEARNING EASTER EGG */}
        <section id="reinforcement-sandbox" className="scroll-mt-24">
          <RLEasterEgg />
        </section>


        {/* SECTION 13: THE CONTACT TERMINAL PANEL */}
        <section id="professional-academic-contact" className="space-y-10 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono text-rose-400 tracking-wider uppercase block font-bold">&gt;_ COMM_UPLINK</span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-slate-100 tracking-tighter uppercase text-glow">
              Avenue of Academic Contact
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              If you have reviews of preprint publications, admissions calls, or collaborative agenda packages, establish secure contact below.
            </p>
          </div>

          <ContactSection />
        </section>

      </main>

      {/* Primary Site Footer */}
      <footer className="max-w-7xl mx-auto px-4 md:px-8 mt-24 pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2">
          <Brain className="text-blue-500" size={14} />
          <span>© 2026 Mohammad-Reza Esmailian • Aut-AI Research Lab Terminal</span>
        </div>
        <div className="flex gap-4">
          <span className="text-emerald-500 animate-pulse">● CONTAINER_STATUS: ACTIVE</span>
          <span>STATIC_BUILD_DEPL_OK</span>
        </div>
      </footer>

      {/* Abstract display popup modal overlay */}
      {selectedPaperAbstract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-slate-950 relative bg-gradient-to-br from-indigo-950 to-slate-950">
              <button
                onClick={() => setSelectedPaperAbstract(false)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-600 transition"
              >
                <X size={14} />
              </button>
              <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/15 px-2 py-0.5 rounded">
                Nature Scientific Reports Abstract
              </span>
              <h3 className="font-sans text-base sm:text-lg font-black text-slate-100 mt-3 leading-tight">
                {FEATURE_PUBLICATION.title}
              </h3>
            </div>

            <div className="p-6 overflow-y-auto text-slate-300 text-xs font-sans leading-relaxed space-y-4">
              <p className="bg-slate-950/30 p-4 border border-slate-850/50 rounded-xl">
                {FEATURE_PUBLICATION.abstract}
              </p>
              
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 block">STANDARD ACM / IEEE CITATION FORM</span>
                <div className="p-3 bg-slate-950 font-mono text-[10px] rounded border border-slate-900/80 select-all leading-relaxed whitespace-pre-wrap">
                  {FEATURE_PUBLICATION.citation}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedPaperAbstract(false)}
                className="px-4 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-mono"
              >
                Close abstract view
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
