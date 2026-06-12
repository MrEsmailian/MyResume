import { motion } from 'motion/react';
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react';
import { EducationItem } from '../types';

const educationData: EducationItem[] = [
  {
    degree: "Master of Science (M.Sc.)",
    program: "Artificial Intelligence & Machine Learning",
    institution: "Amirkabir University of Technology",
    duration: "2025 – Present",
    grade: "Top-tier standing",
    courses: [
      "Deep Reinforcement Learning",
      "Computational Neuroscience",
      "Advanced Machine Learning",
      "Computer Vision",
      "Medical Diagnostic Systems"
    ],
    logoText: "AUT"
  },
  {
    degree: "Bachelor of Science (B.Sc.)",
    program: "Computer Engineering",
    institution: "Ferdowsi University of Mashhad",
    duration: "2020 – 2024",
    grade: "Excellent standing",
    courses: [
      "Design & Analysis of Algorithms",
      "Microprocessor Systems",
      "Compiler Construction",
      "Probability & Artificial Systems",
      "Data Structures"
    ],
    logoText: "FUM"
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Credentials</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-100 tracking-tight animate-fade-in">
            Formal Education
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2 animate-fade-in delay-100">
            Postgraduate academic paths at top Persian institutions focusing on artificial intelligence and computing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {educationData.map((edu, idx) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-cyan-500/20 hover:bg-slate-900/60 transition-all duration-300 shadow-xl group cursor-default"
            >
              {/* Institution Row */}
              <div className="flex justify-between items-start gap-4 mb-6">
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-display text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400 font-mono mt-0.5">
                    {edu.program}
                  </p>
                </div>
                {/* Logo Badge */}
                <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">
                  {edu.logoText}
                </div>
              </div>

              {/* Institution Metadata */}
              <div className="space-y-2 mb-6 text-xs text-slate-400 font-sans">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-500/80" />
                  <span className="text-slate-300 font-medium">{edu.institution}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>{edu.duration}</span>
                </div>
                {edu.grade && (
                  <div className="flex items-center gap-2 text-cyan-400/90">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono font-bold">{edu.grade}</span>
                  </div>
                )}
              </div>

              {/* Course Highlights */}
              <div className="border-t border-slate-850 pt-5">
                <p className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">Syllabic Focus Nodes</p>
                <div className="flex flex-wrap gap-1.5">
                  {edu.courses.map((course) => (
                    <span
                      key={course}
                      className="text-[10px] px-2.5 py-1 bg-slate-950/60 border border-slate-850 text-slate-400 rounded-lg group-hover:text-slate-300 transition-colors"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
