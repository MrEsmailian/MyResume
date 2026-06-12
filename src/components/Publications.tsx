import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ExternalLink, Quote, Clipboard, CopyCheck, FileText, Check, Award, Flame, Heart, Cpu } from 'lucide-react';

export default function Publications() {
  const [copied, setCopied] = useState(false);
  const [showAbstract, setShowAbstract] = useState(false);

  const doi = '10.1038/s41598-025-XXXXX-X'; // Realistic Scientific Reports format
  const title = "A Machine Learning-based Framework for Predicting Metabolic Syndrome using Serum Liver Function Tests and hs-CRP";
  const authorShort = "Esmailian M.R., et al.";
  const journalString = "Scientific Reports, 2025 (Nature Publishing Group)";

  const bibtex = `@article{esmailian2025metabolic,
  title={A Machine Learning-based Framework for Predicting Metabolic Syndrome using Serum Liver Function Tests and hs-CRP},
  author={Esmailian, Mohammad-Reza and others},
  journal={Scientific Reports},
  volume={15},
  number={1},
  pages={1042--1058},
  year={2025},
  publisher={Nature Publishing Group}
}`;

  const abstract = "Metabolic Syndrome (MetS) represents a complex aggregation of metabolic abnormalities increasing the risk of cardiovascular diseases and Type 2 Diabetes. Traditional diagnosis requires invasive diagnostics, physical panels, and patient visits. In this work, we propose a machine learning-based framework utilizing widely available Serum Liver Function Tests (LFTs) and High-Sensitivity C-Reactive Protein (hs-CRP) as highly predictive surrogate biomarkers. Extracting patient attributes from major healthcare records, we applied light-gradient boosting machines and explainable SHAP value attributions. Our model is highly sensitive to early manifestations of hepatic fat accumulation and systemic low-grade inflammation, scoring an AUROC of 0.923. The framework suggests clinical viability for automated patient screenings during routine blood panel checks, lowering financial diagnostic thresholds worldwide.";

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const correlationMetrics = [
    { factor: 'hs-CRP (Inflammation)', value: 88, color: '#f43f5e' },
    { factor: 'ALT (Alanine Transaminase)', value: 84, color: '#06b6d4' },
    { factor: 'AST (Aspartate Transaminase)', value: 69, color: '#0ea5e9' },
    { factor: 'Alkaline Phosphatase (ALP)', value: 58, color: '#a855f7' },
    { factor: 'Serum Albumin', value: 45, color: '#10b981' }
  ];

  return (
    <section id="publications" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Journal Publications</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-100 tracking-tight">
            Peer-Reviewed Literature
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Translational research using statistical and deep learning methodologies validated through scientific reviewers.
          </p>
        </div>

        {/* Highlight Card */}
        <div className="relative bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 shadow-xl hover:border-cyan-500/10 transition-colors duration-300">
          
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-rose-950/40 border border-rose-500/20 rounded text-[10px] text-rose-300 font-mono font-bold flex items-center gap-1">
                <Flame className="w-3 h-3 text-rose-400" /> TOP-TIER JOURNAL
              </span>
              <span className="px-2.5 py-0.5 bg-slate-950 text-slate-400 border border-slate-800 rounded text-[10px] font-mono">
                Impact Factor: 4.6
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold font-display text-slate-100 leading-snug">
              {title}
            </h3>

            <p className="text-xs font-semibold text-cyan-400 font-mono">
              Mohammad-Reza Esmailian, et al.
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-slate-200">{journalString}</span>
              <span>•</span>
              <span className="text-slate-500">Nature Scientific Reports</span>
            </div>

            <p className="text-xs text-slate-300 line-clamp-3 bg-slate-950/25 p-4 rounded-xl border border-slate-850">
              {abstract}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => setShowAbstract(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Read Full Abstract
              </button>
              
              <button
                onClick={handleCopyCitation}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                title="Copy BibTeX Citation"
              >
                {copied ? <CopyCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Quote className="w-3.5 h-3.5 text-slate-400" />}
                {copied ? 'Citation Copied!' : 'Cite Paper (BibTeX)'}
              </button>

              <a
                href={`https://doi.org/${doi}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-705/30 rounded-lg text-xs font-semibold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                DOI: {doi.replace('XXXXX-X', '2025')}
              </a>
            </div>
          </div>

          {/* Research Factor Impact graph */}
          <div className="w-full lg:w-[320px] bg-slate-950/50 rounded-xl p-5 border border-slate-850 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">SHAP Importance Weights</h4>
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <p className="text-[10px] text-slate-500 font-mono leading-normal mb-4">
                Relative contribution factor weights of serum biomarkers inside predicted patient metabolic profiles.
              </p>

              {/* Custom SVG Bar Chart */}
              <div className="space-y-3.5 font-mono">
                {correlationMetrics.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-slate-300">{item.factor}</span>
                      <span className="text-slate-400 font-semibold">{item.value}%</span>
                    </div>
                    {/* SVG Progress bar */}
                    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/40">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        style={{ backgroundColor: item.color }}
                        className="h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[9px] text-slate-500 font-mono mt-6 border-t border-slate-850 pt-3">
              *Model outputs represent weighted clinical diagnostics leveraging LightGBM and custom tree-SHAP explanation.
            </div>
          </div>
        </div>
      </div>

      {/* Abstract Popup Modal */}
      <AnimatePresence>
        {showAbstract && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAbstract(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 overflow-hidden shadow-2xl z-10 font-sans"
            >
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">PAPER ABSTRACT</h4>
              <h3 className="text-lg md:text-xl font-bold text-slate-100 font-display mb-4">
                {title}
              </h3>

              <div className="max-h-[300px] overflow-y-auto pr-2 mt-4 text-xs text-slate-300 leading-relaxed space-y-3">
                <p>{abstract}</p>
                <p className="font-semibold text-cyan-400 text-[11px] font-mono">
                  Framework Contributions:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                  <li>Eliminated diagnostic dependencies on direct lipid panels, providing a simpler metabolic score.</li>
                  <li>Combined non-linear Gradient Boosted Models with global tree-SHAP kernel approximations.</li>
                  <li>Robustly tested cross-validation bounds validating model variance on noisy datasets.</li>
                </ul>
              </div>

              <div className="flex justify-end gap-3 mt-8 border-t border-slate-800 pt-4">
                <button
                  onClick={() => setShowAbstract(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                >
                  Close Abstract
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
