import { useEffect, useRef, useState } from 'react';
import { SKILLS_DATA, SKILL_CONNECTIONS } from '../data';
import { Terminal, Database, Cpu, Wrench, Share2 } from 'lucide-react';

interface VisualNode {
  name: string;
  category: string;
  proficiency: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
  radius: number;
}

interface VisualLink {
  source: VisualNode;
  target: VisualNode;
  pulseProgress: number;
  pulseSpeed: number;
}

export default function SkillsVisualization() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; category: string; proficiency: number } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Category visual helper tags
  const getCatLabel = (cat: string) => {
    switch (cat) {
      case 'programming': return 'Programming Syntaxes';
      case 'aiml': return 'AI / Deep Learning';
      case 'data': return 'Scientific Data Core';
      case 'tools': return 'DevOps & Toolsets';
      default: return cat;
    }
  };

  const getCatIcon = (cat: string) => {
    switch (cat) {
      case 'programming': return <Terminal className="text-blue-400" size={14} />;
      case 'aiml': return <Cpu className="text-yellow-400" size={14} />;
      case 'data': return <Database className="text-emerald-400" size={14} />;
      case 'tools': return <Wrench className="text-purple-400" size={14} />;
      default: return <Share2 className="text-slate-400" size={14} />;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = containerRef.current.clientWidth || 800);
    let height = (canvas.height = 450);

    const mouse = { x: -1000, y: -1000 };

    // Grouping nodes into spatial clusters depending on category
    const clusters: { [key: string]: { cx: number; cy: number } } = {
      programming: { cx: width * 0.22, cy: height * 0.3 },
      aiml: { cx: width * 0.45, cy: height * 0.72 },
      data: { cx: width * 0.75, cy: height * 0.35 },
      tools: { cx: width * 0.52, cy: height * 0.24 }
    };

    // Instantiate node coordinates based on clusters
    const nodes: VisualNode[] = SKILLS_DATA.map((s, index) => {
      const cluster = clusters[s.category];
      const angle = (index * 73) * (Math.PI / 180);
      const dist = 55 + Math.random() * 25;
      const x = cluster.cx + Math.cos(angle) * dist;
      const y = cluster.cy + Math.sin(angle) * dist;

      return {
        name: s.name,
        category: s.category,
        proficiency: s.proficiency,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        originalX: x,
        originalY: y,
        radius: 10 + (s.proficiency / 100) * 8
      };
    });

    // Populate links
    const links: VisualLink[] = [];
    SKILL_CONNECTIONS.forEach(conn => {
      const srcNode = nodes.find(n => n.name === conn.source);
      const tgtNode = nodes.find(n => n.name === conn.target);
      if (srcNode && tgtNode) {
        links.push({
          source: srcNode,
          target: tgtNode,
          pulseProgress: Math.random(),
          // Speed of electrical visual pulses is directly linked to node proficiency!
          pulseSpeed: 0.005 + ((srcNode.proficiency + tgtNode.proficiency) / 200) * 0.012
        });
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleCanvasClick = () => {
      // Find matches
      let clickedNode: VisualNode | null = null;
      for (const node of nodes) {
        const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        if (dist < node.radius + 6) {
          clickedNode = node;
          break;
        }
      }

      if (clickedNode) {
        setSelectedSkill({
          name: clickedNode.name,
          category: clickedNode.category,
          proficiency: clickedNode.proficiency
        });
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);

    // Initial selected skill selection
    setSelectedSkill({
      name: nodes[0].name,
      category: nodes[0].category,
      proficiency: nodes[0].proficiency
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Render outer category text markings in the canvas background coordinate zones
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      
      Object.keys(clusters).forEach(key => {
        const c = clusters[key];
        ctx.fillStyle = activeCategory === key ? '#60a5fa' : 'rgba(100, 116, 139, 0.2)';
        ctx.fillText(key.toUpperCase() + ' SECTOR', c.cx, c.cy - 100);
        
        ctx.strokeStyle = activeCategory === key ? 'rgba(96, 165, 250, 0.1)' : 'rgba(51, 65, 85, 0.1)';
        ctx.beginPath();
        ctx.arc(c.cx, c.cy, 90, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Update positions with subtle floating elastic anchor pull bounds
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;

        // Apply a spring logic to avoid drifting too far from original coordinates
        const dx = n.originalX - n.x;
        const dy = n.originalY - n.y;
        n.vx += dx * 0.002;
        n.vy += dy * 0.002;

        // Mouse avoidance/repelling force
        const mDist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (mDist < 80) {
          const force = (80 - mDist) / 80;
          const angle = Math.atan2(n.y - mouse.y, n.x - mouse.x);
          n.vx += Math.cos(angle) * force * 0.25;
          n.vy += Math.sin(angle) * force * 0.25;
        }

        // Speed dampener
        n.vx *= 0.95;
        n.vy *= 0.95;
      });

      // Draw Connection lines (Synapses)
      links.forEach(l => {
        const isActive = 
          (selectedSkill && (selectedSkill.name === l.source.name || selectedSkill.name === l.target.name)) ||
          (activeCategory && (l.source.category === activeCategory || l.target.category === activeCategory));

        ctx.beginPath();
        ctx.moveTo(l.source.x, l.source.y);
        ctx.lineTo(l.target.x, l.target.y);
        
        if (isActive) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)'; // Bright cyan
          ctx.lineWidth = 1.8;
        } else {
          ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)'; // Dark slate
          ctx.lineWidth = 1.0;
        }
        ctx.stroke();

        // Animate Traveling Impulse Tracers representing data transmission proficiency
        l.pulseProgress += l.pulseSpeed;
        if (l.pulseProgress > 1) {
          l.pulseProgress = 0;
        }

        const px = l.source.x + (l.target.x - l.source.x) * l.pulseProgress;
        const py = l.source.y + (l.target.y - l.source.y) * l.pulseProgress;

        ctx.beginPath();
        ctx.arc(px, py, isActive ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? '#38bdf8' : '#3b82f6';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = isActive ? 8 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Nodes (Synaptic Terminals)
      nodes.forEach(n => {
        const isSelected = selectedSkill && selectedSkill.name === n.name;
        const isHovered = Math.hypot(n.x - mouse.x, n.y - mouse.y) < n.radius + 6;
        const belongToActiveCat = activeCategory === n.category;

        // Node backdrop glow
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = n.category === 'aiml' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(59, 130, 246, 0.15)';
          ctx.fill();
        }

        // Circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        
        let strokeColor = 'rgba(51, 65, 85, 0.8)';
        if (isSelected) strokeColor = '#60a5fa';
        else if (isHovered) strokeColor = '#38bdf8';
        else if (belongToActiveCat) strokeColor = '#10b981';

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = isSelected || isHovered ? 2.5 : 1.5;
        ctx.fillStyle = '#020617';
        ctx.fill();
        ctx.stroke();

        // Inner core
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = n.category === 'aiml' ? '#eab308' : n.category === 'programming' ? '#3b82f6' : n.category === 'data' ? '#10b981' : '#a78bfa';
        ctx.fill();

        // Text labels inside / near nodes
        ctx.font = isSelected ? 'bold 11px sans-serif' : '10px sans-serif';
        ctx.fillStyle = isSelected ? '#ffffff' : isHovered ? '#38bdf8' : '#e2e8f0';
        ctx.textAlign = 'center';
        ctx.fillText(n.name, n.x, n.y - n.radius - 5);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      width = canvas.width = containerRef.current.clientWidth;
      draw();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleCanvasClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedSkill, activeCategory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      {/* Category Filters Left Panel */}
      <div className="space-y-3.5 order-2 lg:order-1 lg:col-span-1">
        <h4 className="font-mono text-xs text-slate-400 tracking-widest uppercase mb-1">Skill Sectors</h4>
        <button
          onClick={() => setActiveCategory(null)}
          className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between text-xs font-mono font-medium ${
            activeCategory === null
              ? 'bg-blue-950/40 border-blue-500/50 text-blue-300 shadow-md'
              : 'bg-slate-900/40 border-slate-800 hover:border-slate-700/80 text-slate-400'
          }`}
        >
          <span>✦ ALL INTEGRATED NODES</span>
          <span className="text-[10px] text-slate-500 font-bold bg-slate-950 py-0.5 px-2 rounded-full border border-slate-800">
            {SKILLS_DATA.length}
          </span>
        </button>

        {(['programming', 'aiml', 'data', 'tools'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between text-xs font-mono ${
              activeCategory === cat
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-md'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700/80 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {getCatIcon(cat)}
              <span className="uppercase font-medium">{getCatLabel(cat)}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold bg-slate-950 py-0.5 px-1.5 rounded-full border border-slate-800">
              {SKILLS_DATA.filter(s => s.category === cat).length}
            </span>
          </button>
        ))}

        {selectedSkill && (
          <div className="mt-6 border border-slate-800/80 bg-slate-950/50 p-4 rounded-xl backdrop-blur">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-wider">Synapse Focus</span>
              <h5 className="font-sans text-sm font-semibold text-slate-100">{selectedSkill.name}</h5>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-2">
                {getCatIcon(selectedSkill.category)}
                <span className="capitalize">{getCatLabel(selectedSkill.category)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-900 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Connection Density</span>
                <span className="text-blue-400 font-bold">{selectedSkill.proficiency}%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800/50">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-sky-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${selectedSkill.proficiency}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-slate-500 leading-tight">
                Synaptic charge dictates impulse speeds and routing density across related framework nodes.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Interactive Skills Net Canvas Panel */}
      <div 
        ref={containerRef}
        className="lg:col-span-3 border border-slate-800 bg-slate-900/30 backdrop-blur-md rounded-2xl overflow-hidden p-4 relative min-h-[450px] order-1 lg:order-2"
      >
        <div className="absolute top-4 left-4 z-10 flex gap-1.5 items-center text-xs font-mono text-slate-400 bg-slate-950/80 border border-slate-800/85 px-3 py-1 rounded-full backdrop-blur">
          <Share2 size={12} className="animate-pulse text-blue-400" />
          <span>Click individual synapses to focus</span>
        </div>

        <canvas ref={canvasRef} className="w-full h-[450px] cursor-crosshair block" />
      </div>
    </div>
  );
}
