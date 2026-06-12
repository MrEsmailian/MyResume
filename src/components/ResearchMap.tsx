import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { MAP_NODES, MAP_LINKS } from '../data';
import { Network, HelpCircle, Activity, Brain, Zap, Eye, Dna, FileText } from 'lucide-react';

interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  description: string;
  radius: number;
}

interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  source: string | NetworkNode;
  target: string | NetworkNode;
  label: string;
}

export default function ResearchMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [hoveredLink, setHoveredLink] = useState<NetworkLink | null>(null);

  // Map icon name helpers
  const getIcon = (id: string, size = 18) => {
    switch (id) {
      case 'Computational Neuroscience':
        return <Brain className="text-pink-400" size={size} />;
      case 'Reinforcement Learning':
        return <Zap className="text-yellow-400" size={size} />;
      case 'Medical AI':
        return <Activity className="text-emerald-400" size={size} />;
      case 'Computer Vision':
        return <Eye className="text-blue-400" size={size} />;
      case 'Bioinformatics':
        return <Dna className="text-violet-400" size={size} />;
      case 'Large Language Models':
        return <FileText className="text-sky-400" size={size} />;
      default:
        return <HelpCircle className="text-slate-400" size={size} />;
    }
  };

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement || !containerRef.current) return;

    // Clear previous elements
    d3.select(svgElement).selectAll('*').remove();

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width || 600;
    const height = 400;

    const svg = d3.select(svgElement)
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('overflow', 'visible');

    // Create marker for arrows
    svg.append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 22)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#3b82f6')
      .style('opacity', 0.6);

    // Deep clones to prevent simulation mutation issues
    const nodes: NetworkNode[] = MAP_NODES.map(n => ({
      id: n.id,
      description: n.description,
      radius: n.radius,
      x: n.x * (width / 650), // Scale loaded coordinate ratios
      y: n.y * (height / 450)
    }));

    const links: NetworkLink[] = MAP_LINKS.map(l => ({
      source: l.source,
      target: l.target,
      label: l.label
    }));

    // Setup force simulation
    const simulation = d3.forceSimulation<NetworkNode>(nodes)
      .force('link', d3.forceLink<NetworkNode, NetworkLink>(links).id(d => d.id).distance(width > 600 ? 160 : 120))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<NetworkNode>().radius(d => d.radius * 2.2));

    // Dynamic rendering of links (edges)
    const linkGroup = svg.append('g').attr('class', 'links');
    const linksPaths = linkGroup.selectAll('g')
      .data(links)
      .enter()
      .append('g')
      .attr('class', 'link-item')
      .style('cursor', 'pointer');

    // Glow line path background
    const linkLinesBg = linksPaths.append('line')
      .attr('stroke', '#1e40af')
      .attr('stroke-width', 6)
      .style('opacity', 0)
      .style('transition', 'opacity 0.2s')
      .on('mouseenter', (_event, d) => {
        setHoveredLink(d);
        d3.select(_event.currentTarget).style('opacity', 0.15);
      })
      .on('mouseleave', (_event) => {
        setHoveredLink(null);
        d3.select(_event.currentTarget).style('opacity', 0);
      });

    // Main structural connector line
    const linkLines = linksPaths.append('line')
      .attr('stroke', 'url(#link-gradient)')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('marker-end', 'url(#arrow)')
      .style('opacity', 0.5);

    // Add glowing linear gradient for links
    const defs = svg.append('defs');
    const grad = defs.append('linearGradient')
      .attr('id', 'link-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '100%');
    grad.append('stop').attr('offset', '0%').attr('stop-color', '#3b82f6').attr('stop-opacity', 0.8);
    grad.append('stop').attr('offset', '100%').attr('stop-color', '#10b981').attr('stop-opacity', 0.8);

    // Node groups
    const nodeGroup = svg.append('g').attr('class', 'nodes');
    const nodesG = nodeGroup.selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node-item')
      .style('cursor', 'pointer')
      .on('click', (_event, d) => {
        setSelectedNode(d);
      });

    // Pulsing backdrop circle for high-importance node
    nodesG.append('circle')
      .attr('r', d => d.radius + 6)
      .attr('fill', '#1e3a8a')
      .attr('opacity', 0.22)
      .attr('class', 'pulse-glow')
      .style('animation', 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite');

    // Central structural node circle
    nodesG.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', '#020617')
      .attr('stroke', d => {
        if (d.id.includes('Computational')) return '#f472b6'; // pink
        if (d.id.includes('Reinforcement')) return '#facc15'; // yellow
        if (d.id.includes('Medical')) return '#34d399'; // emerald
        if (d.id.includes('Vision')) return '#60a5fa'; // blue
        if (d.id.includes('Bioinformatics')) return '#a78bfa'; // violet
        return '#38bdf8'; // sky
      })
      .attr('stroke-width', 2.5)
      .attr('class', 'node-circle')
      .style('transition', 'transform 0.2s, stroke-width 0.2s')
      .on('mouseenter', function() {
        d3.select(this)
          .attr('stroke-width', 4)
          .style('transform', 'scale(1.1)');
      })
      .on('mouseleave', function() {
        d3.select(this)
          .attr('stroke-width', 2.5)
          .style('transform', 'scale(1)');
      });

    // Node labels
    nodesG.append('text')
      .text(d => d.id)
      .attr('y', d => d.radius + 18)
      .attr('text-anchor', 'middle')
      .attr('fill', '#cbd5e1')
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .attr('font-family', 'sans-serif')
      .each(function(d) {
        // Simple wrap for small screens
        const text = d3.select(this);
        const words = d.id.split(/\s+/);
        if (words.length > 2) {
          text.text('');
          text.append('tspan').text(words.slice(0, 2).join(' ')).attr('x', 0).attr('dy', 0);
          text.append('tspan').text(words.slice(2).join(' ')).attr('x', 0).attr('dy', '1em');
        }
      });

    // Implement dragging behavior
    const drag = d3.drag<SVGGElement, NetworkNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodesG.call(drag as any);

    // Initial default selected node
    setSelectedNode(nodes[0]);

    // Fast-tick simulation updates
    simulation.on('tick', () => {
      linkLines
        .attr('x1', d => (d.source as NetworkNode).x || 0)
        .attr('y1', d => (d.source as NetworkNode).y || 0)
        .attr('x2', d => (d.target as NetworkNode).x || 0)
        .attr('y2', d => (d.target as NetworkNode).y || 0);

      linkLinesBg
        .attr('x1', d => (d.source as NetworkNode).x || 0)
        .attr('y1', d => (d.source as NetworkNode).y || 0)
        .attr('x2', d => (d.target as NetworkNode).x || 0)
        .attr('y2', d => (d.target as NetworkNode).y || 0);

      nodesG.attr('transform', d => `translate(${d.x || 0}, ${d.y || 0})`);
    });

    const observer = new ResizeObserver(() => {
      const parentRect = containerRef.current?.getBoundingClientRect();
      if (!parentRect) return;
      const w = parentRect.width;
      const h = 400;
      svg.attr('viewBox', `0 0 ${w} ${h}`);
      simulation.force('center', d3.forceCenter(w / 2, h / 2));
      simulation.alpha(0.2).restart();
    });

    observer.observe(containerRef.current);

    return () => {
      simulation.stop();
      observer.disconnect();
    };
  }, []);

  return (
    <div id="research-map-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Interactive Graph Display */}
      <div 
        ref={containerRef} 
        className="lg:col-span-2 relative border border-slate-800 bg-slate-900/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-inner p-4 min-h-[420px]"
      >
        <div className="absolute top-4 left-4 z-10 flex gap-1.5 items-center text-xs font-mono text-blue-400 bg-slate-950/70 border border-slate-800 px-3 py-1 rounded-full backdrop-blur">
          <Network size={12} className="animate-spin-slow" />
          <span>Interactive Force Field Map</span>
        </div>
        <div className="absolute top-4 right-4 z-10 text-xs font-mono text-slate-400 bg-slate-950/70 px-2 py-1 rounded border border-slate-800/60 hidden sm:block">
          Drag Nodes • Scroll Zoom
        </div>

        <svg ref={svgRef} className="w-full h-[400px]" />

        {/* Hover linkage indicator at the bottom */}
        {hoveredLink && (
          <div className="absolute bottom-4 left-4 right-4 z-10 animate-fade-in bg-slate-950/90 border border-emerald-500/30 p-2.5 rounded-lg text-center backdrop-blur text-xs">
            <span className="font-mono text-[#38bdf8] font-bold">
              {(hoveredLink.source as NetworkNode).id}
            </span>
            <span className="text-slate-400 mx-2">➔</span>
            <span className="text-emerald-300 italic font-medium">{hoveredLink.label}</span>
            <span className="text-slate-400 mx-2">➔</span>
            <span className="font-mono text-[#10b981] font-bold">
              {(hoveredLink.target as NetworkNode).id}
            </span>
          </div>
        )}
      </div>

      {/* Explanatory Context Card on Selection */}
      <div className="border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl flex flex-col justify-between h-full min-h-[420px]">
        <div>
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
            {selectedNode ? (
              <>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl shadow-lg">
                  {getIcon(selectedNode.id, 24)}
                </div>
                <div>
                  <h4 className="font-sans text-lg font-bold text-slate-100 tracking-tight leading-tight">
                    {selectedNode.id}
                  </h4>
                  <p className="font-mono text-[10px] text-blue-400">RESEARCH NODE ELEMENT</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl shadow-md">
                  <Network className="text-blue-400 animate-pulse" size={24} />
                </div>
                <div>
                  <h4 className="font-sans text-lg font-bold text-slate-100">Select a Core Node</h4>
                  <p className="font-mono text-xs text-slate-500">Interactive Connectivity</p>
                </div>
              </>
            )}
          </div>

          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Scope Description</span>
                <p className="font-sans text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/40">
                  {selectedNode.description}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block mb-2">Connected Research Pathways</span>
                <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
                  {MAP_LINKS.filter(
                    l => l.source === selectedNode.id || l.target === selectedNode.id
                  ).map((link, idx) => {
                    const isSource = link.source === selectedNode.id;
                    const neighbor = isSource ? link.target : link.source;
                    return (
                      <div 
                        key={idx} 
                        className="p-2.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-slate-700/80 transition flex flex-col gap-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium">
                            {isSource ? 'Directs towards' : 'Receives input from'}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/10">
                            {neighbor}
                          </span>
                        </div>
                        <span className="text-emerald-400 italic font-mono text-[11px] leading-tight">
                          ↳ {link.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <p className="font-sans text-sm text-slate-400">
              Please click or hover any key category node in the constellation graph to load scientific parameters, core relational links, and doctoral goals.
            </p>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/60">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-950/50 p-2.5 rounded border border-slate-800/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Synergetic Ph.D. roadmap active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
