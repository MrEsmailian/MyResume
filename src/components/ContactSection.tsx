import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Research Collaboration Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API pipeline transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: 'Research Collaboration Inquiry', message: '' });
      setTimeout(() => setIsSuccess(false), 5000); // clear success msg after 5s
    }, 1200);
  };

  return (
    <div id="contact-panel-anchor" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Contact Cards List (Left Side) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass hover:shadow-2xl p-6 rounded-2xl space-y-4">
          <h4 className="font-sans text-md font-black text-slate-100 uppercase tracking-tight leading-none text-glow">Research Headquarters</h4>
          <p className="font-sans text-xs text-slate-400 leading-relaxed">
            I am always seeking to connect with fellow researchers, doctoral advisors, and industry engineers pushing limits in continuous control and computational modeling. Feel free to reach out for preprints, data requests, or academic opportunities.
          </p>
        </div>

        {/* Info Rows */}
        <div className="space-y-3">
          {/* Email */}
          <div className="flex items-center gap-4 p-4 rounded-xl glass hover:border-blue-500/40 hover:-translate-y-0.5 transition duration-300">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-blue-400">
              <Mail size={18} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider font-bold">Primary Scholar Email</span>
              <a href="mailto:reza.esmailian81@gmail.com" className="text-xs font-mono text-slate-200 hover:text-blue-400 tracking-tight font-semibold">
                reza.esmailian81@gmail.com
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 p-4 rounded-xl glass hover:border-blue-500/40 hover:-translate-y-0.5 transition duration-300">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400">
              <MapPin size={18} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider font-bold">Academic Placement</span>
              <span className="text-xs font-sans text-slate-200 font-semibold">
                Amirkabir University of Technology, Tehran
              </span>
            </div>
          </div>

          {/* Social connections links */}
          <div className="flex gap-3 pt-2">
            <a
              href="https://github.com/MrEsmailian"
              target="_blank"
              rel="noreferrer"
              className="flex-1 p-3 rounded-xl border border-slate-850 bg-slate-950/50 hover:bg-slate-950 text-slate-300 hover:text-white hover:border-slate-700 transition flex items-center justify-center gap-2 text-xs font-mono"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex-1 p-3 rounded-xl border border-slate-850 bg-slate-950/50 hover:bg-slate-950 text-slate-300 hover:text-[#0a66c2] hover:border-[#0a66c2]/30 transition flex items-center justify-center gap-2 text-xs font-mono"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Animated Contact Form (Right Side) */}
      <div className="lg:col-span-7 glass hover:shadow-2xl hover:shadow-blue-500/5 p-6 md:p-8 rounded-2xl relative overflow-hidden">
        {/* Aesthetic horizontal line grids */}
        <div className="absolute top-0 left-0 right-0 h-[10px] bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-transparent"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g., Dr. Emily Carter"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:border-blue-500/70 text-xs font-sans text-slate-100 placeholder-slate-600 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g., advisor@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:border-blue-500/70 text-xs font-sans text-slate-100 placeholder-slate-600 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Inquiry Type / Subject</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:border-blue-500/70 text-xs font-sans text-slate-300 transition"
            >
              <option value="Research Collaboration Inquiry">Research Collaboration Inquiry</option>
              <option value="Ph.D. Academic Advisory Option">Ph.D. Academic Advisory Option</option>
              <option value="Preprint Review / Feedback request">Preprint Review / Feedback request</option>
              <option value="Other Project Integration">Other Project Integration</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Message Context</label>
            <textarea
              required
              rows={4}
              placeholder="State your prospective agenda or request..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:border-blue-500/70 text-xs font-sans text-slate-100 placeholder-slate-600 transition resize-none leading-relaxed"
            />
          </div>

          {/* Action triggers */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {isSuccess && (
                <div className="flex items-center gap-2.5 text-xs text-emerald-400 font-mono animate-fade-in bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 size={13} className="animate-pulse" />
                  <span>Inquiry Transmitted Successfully!</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 border border-blue-500 text-white font-mono text-xs flex items-center justify-center gap-2 disabled:opacity-40 transition shadow-lg shadow-blue-600/15 cursor-pointer"
            >
              <span>{isSubmitting ? 'Transmitting...' : 'Send Inquiry'}</span>
              <Send size={12} className={isSubmitting ? "animate-pulse" : ""} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
