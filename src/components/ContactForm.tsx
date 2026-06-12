import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Github, Send, Terminal, Phone, CheckCircle, Award } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('sending');

    // Simulate reliable form processing
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-4">
            <Mail className="w-3.5 h-3.5 animate-pulse" />
            <span>Scholarly Communications</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-100 tracking-tight">
            Initiate Contact
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Interested in PhD opportunities, collaboration, or research? Send a letter or secure channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Channel links card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 md:p-8 rounded-2xl flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-cyan-950/40 border border-cyan-500/20 rounded text-[10px] text-cyan-400 font-mono tracking-wider font-semibold">SECURE ADDRESS</span>
                </div>
                
                <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
                  Mohammad-Reza Esmailian
                </h3>
                <p className="text-xs text-slate-400">
                  AI Researcher & Master’s Candidate in Artificial Intelligence (AUT)
                </p>

                {/* Live Channels detail */}
                <div className="space-y-4 pt-6 text-xs text-slate-350">
                  <a
                    href="mailto:reza.esmailian.edu@gmail.com"
                    className="flex items-center gap-3 hover:text-cyan-400 transition-colors group cursor-pointer"
                  >
                    <div className="p-2.5 bg-slate-950/80 border border-slate-850 rounded-lg text-slate-400 group-hover:text-cyan-400 group-hover:scale-105 transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-mono uppercase">Primary Academic Email</span>
                      <span className="font-mono text-[11px] text-slate-200">reza.esmailian.edu@gmail.com</span>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/reza-esmailian"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 hover:text-cyan-400 transition-colors group cursor-pointer"
                  >
                    <div className="p-2.5 bg-slate-950/80 border border-slate-850 rounded-lg text-slate-400 group-hover:text-cyan-400 group-hover:scale-105 transition-all">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-mono uppercase">Professional Directory</span>
                      <span className="font-mono text-[11px] text-slate-200">linkedin.com/in/reza-esmailian</span>
                    </div>
                  </a>

                  <a
                    href="https://github.com/MrEsmailian"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 hover:text-cyan-400 transition-colors group cursor-pointer"
                  >
                    <div className="p-2.5 bg-slate-950/80 border border-slate-850 rounded-lg text-slate-400 group-hover:text-cyan-400 group-hover:scale-105 transition-all">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-mono uppercase">Open-Source Feed</span>
                      <span className="font-mono text-[11px] text-slate-200">github.com/MrEsmailian</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 font-mono mt-12 border-t border-slate-850 pt-3">
                Amirkabir University of Technology (Tehran Polytechnic), Department of Computer Engineering and Information Technology.
              </div>
            </div>
          </div>

          {/* Contact form screen */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 md:p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-mono uppercase tracking-wider mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Prof. Dr. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 text-slate-200 p-3 rounded-lg border border-slate-850 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-mono uppercase tracking-wider mb-1.5">Email Signature</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., colleague@institution.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 text-slate-200 p-3 rounded-lg border border-slate-850 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-xs transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono uppercase tracking-wider mb-1.5">Query Message Letter</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Inquire on PhD openings, research publications, or collaboration opportunities..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 p-3 rounded-lg border border-slate-850 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-xs transition-colors resize-none"
                  />
                </div>

                {/* Submitting Feedback states */}
                <div className="pt-2 flex justify-end">
                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Query Synced Successfully!</span>
                      </motion.div>
                    ) : (
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 font-bold active:scale-95 text-slate-950 rounded-lg text-xs font-semibold transition-transform duration-100 disabled:opacity-40 select-none cursor-pointer"
                      >
                        {status === 'sending' ? (
                          <>
                            <RefreshIcon className="w-3.5 h-3.5 animate-spin" />
                            <span>Processing Letter...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Ship Scholarly Query</span>
                          </>
                        )}
                      </button>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function RefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
  );
}
