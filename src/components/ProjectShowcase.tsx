import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Github, ExternalLink, Cpu, Tag, FileText, Check, HeartPulse, Sparkles, Sliders } from 'lucide-react';
import { Project } from '../types';

const projectsData: Project[] = [
  {
    title: 'RAG Documentation Assistant',
    description: 'A contextual QA agent that reads through heavy documentation files, indexing embeddings to resolve developer questions dynamically.',
    category: 'NLP & LLMs',
    technologies: ['LLMs', 'Retrieval-Augmented Generation', 'NLP', 'ChromaDB', 'LangChain'],
    githubUrl: 'https://github.com/MrEsmailian/RAG-Doc-Assistant',
    keyContributions: [
      'Engineered an optimized hybrid retrieval strategy combining BM25 keyword scans and deep embeddings',
      'Configured semantic metadata filters reducing hallucinations on versioned developer docs by 42%'
    ],
    metrics: '94.2% semantic correctness under medical domain challenges',
    extendedCaseStudy: 'Implemented a custom hierarchical recursive document splitter. Segmented docs are vectorized by OpenAI text-embedding-3-small and populated inside deep Chroma indexes. Evaluated through Ragas framework measuring precision, faithfulness, and semantic answer similarity.',
    imageAccent: 'from-blue-600/20 to-cyan-500/20 hover:border-blue-500/30'
  },
  {
    title: 'Data Annotation Platform',
    description: 'A low-latency, collaborative annotation tool optimized for custom keypoint tracking, bbox labelling, and audio signal parsing.',
    category: 'Dataset Engineering',
    technologies: ['Python', 'Dataset Engineering', 'FastAPI', 'React', 'MongoDB'],
    githubUrl: 'https://github.com/MrEsmailian/Data-Annotation-Platform',
    keyContributions: [
      'Developed pixel-precise labeling masks utilizing HTML5 Canvas overlays, supporting full undo history',
      'Deployed robust dataset backup and versioning routines for deep machine vision applications'
    ],
    metrics: 'Accelerated core labeling timelines for 4 model cycles',
    extendedCaseStudy: 'Created to resolve a major bottleneck in our in-house lab annotation pipeline. The tool coordinates labels between multi-users, enforcing active consensus where at least 2 labeling layers are compared using IoU filters before merging tags into the master dataset state.',
    imageAccent: 'from-amber-600/20 to-orange-500/20 hover:border-amber-500/30'
  },
  {
    title: 'CNN Digit Recognition',
    description: 'An optimized PyTorch neural model trained with custom dropout layers to recognize digits at ultra-high validation accuracy.',
    category: 'Computer Vision',
    technologies: ['PyTorch', 'CNNs', 'Computer Vision', 'Hyperparameter Tuning'],
    githubUrl: 'https://github.com/MrEsmailian/CNN-Digit-Recognition',
    keyContributions: [
      'Configured custom multi-layer CNN with convolutional kernels and pool matrices in PyTorch',
      'Implemented learning rate scheduler logic to smoothly scale weights as validation loss plateaued'
    ],
    metrics: '99.46% generalization score on testing datasets',
    extendedCaseStudy: 'Deep dive into spatial features using PyTorch. Leveraged progressive augmentation (rotations, random shears, and elastic deformations) to combat model overfitting, using TensorBoard visualization loops to audit individual filter weights.',
    imageAccent: 'from-purple-600/20 to-indigo-500/20 hover:border-purple-500/30'
  },
  {
    title: 'MNIST Clustering Engine',
    description: 'An unsupervised pipeline that projects hyper-dimensional indices into low-dimensional space to discover feature groupings.',
    category: 'Machine Learning',
    technologies: ['Machine Learning', 'Feature Engineering', 't-SNE', 'scikit-learn', 'K-Means'],
    githubUrl: 'https://github.com/MrEsmailian/MNIST-Clustering',
    keyContributions: [
      'Analyzed high-dimensional digit vectors mapping pixel coordinates to lower latent targets',
      'Successfully benchmarked feature clustering schemes against raw projection classifiers'
    ],
    metrics: '0.84 silhouette score without target indicators',
    extendedCaseStudy: 'Applied Principal Component Analysis (PCA) to filter high-frequency noise, feeding residual vectors into a custom K-Means model. Cluster alignments were validated against ground-truth classes with V-measure scoring calculations.',
    imageAccent: 'from-teal-600/20 to-emerald-500/20 hover:border-emerald-500/30'
  },
  {
    title: 'Breast Cancer Detection CNN',
    description: 'A computer vision model classifying histopathological scans to isolate malignant cells with high clinical sensitivity.',
    category: 'Medical AI',
    technologies: ['Medical Imaging', 'Deep Learning', 'PyTorch', 'ResNet-50', 'Focal Loss'],
    githubUrl: 'https://github.com/MrEsmailian/Breast-Cancer-Detection',
    keyContributions: [
      'Tuned pretrained ResNet structural layers for fine-grained cell division features',
      'Formulated custom weighted focal loss schemas addressing highly unbalanced malignant-benign datasets'
    ],
    metrics: '96.8% recall on clinical testing folds',
    extendedCaseStudy: 'Clinical diagnostics require low false-negative bounds. This pipeline leverages a combined ResNet and DenseNet architecture. Saliency maps were populated to outline specific pixels explaining why the model determined malignant classifications in high-variance biopsy tissues.',
    imageAccent: 'from-rose-600/20 to-pink-500/20 hover:border-rose-500/30'
  },
  {
    title: 'DeepRacer Traffic Sign Detection',
    description: 'A lightweight visual detector resolving traffic signs in real-time on small robotic platforms using edge hardware.',
    category: 'Robotics & Vision',
    technologies: ['Computer Vision', 'Robotics', 'YOLOv8-Nano', 'OpenCV', 'AWS DeepRacer'],
    githubUrl: 'https://github.com/MrEsmailian/DeepRacer-Sign-Detection',
    keyContributions: [
      'Optimized YOLO convolutional structures, quantizing parameters into float16 indices',
      'Fused OpenCV camera vectors to robustly reject temporal blur anomalies during turns'
    ],
    metrics: '34 FPS continuous detection rates on 0.5-watt edge systems',
    extendedCaseStudy: 'Deployed on AWS DeepRacer micro-controllers. Engineered a lightweight model capable of detecting and signaling intersections and signage prompts (stop, turn-left). Used INT8 quantization steps to fit weights in local SRAM limits.',
    imageAccent: 'from-violet-600/20 to-purple-500/20 hover:border-violet-500/30'
  },
  {
    title: 'Hexa Rehabilitation Robot',
    description: 'A bio-mechanical physical therapy platform coordinating joint movement protocols via medical sensor feedback.',
    category: 'Healthcare Robotics',
    technologies: ['Healthcare Robotics', 'Biomarkers', 'Arduino/C++', 'Feedback Systems', 'Signal Processing'],
    githubUrl: 'https://github.com/MrEsmailian/Hexa-Rehab-Robot',
    keyContributions: [
      'Synthesized a custom feedback-driven loop ensuring smooth joint extension rates',
      'Configured biosensor input channels reading patient muscle responses'
    ],
    metrics: 'Implemented dynamic torque adjustment within 15 milliseconds',
    extendedCaseStudy: 'Collaborating in biomechanical clinical setups. Hexa assists stroke patients in regaining digital dexterity. Sensor data is parsed in real-time, matching movement protocols to active patient intent thresholds.',
    imageAccent: 'from-emerald-600/20 to-cyan-500/20 hover:border-emerald-500/30'
  },
  {
    title: 'Industrial Defect Detector',
    description: 'A high-speed machine vision inspector verifying component alignment on rapid industrial assembly conveyers.',
    category: 'Computer Vision',
    technologies: ['Machine Vision', 'OpenCV', 'PyTorch', 'Template Matching', 'Edge Detection'],
    githubUrl: 'https://github.com/MrEsmailian/Industrial-Defect-Detection',
    keyContributions: [
      'Constructed robust pixel alignment templates filtering out high assembly glare',
      'Engineered multi-threaded camera grab loops eliminating image buffer overflows'
    ],
    metrics: '99.1% defect accuracy on rapid conveyers',
    extendedCaseStudy: 'Conceived during active work at Bina Pardaz Shargh. Combines classical image processing threshold rules with specialized custom ResNet classifiers. Successfully scales to capture assembly outputs moving at up to 3 meters per second.',
    imageAccent: 'from-sky-600/20 to-indigo-500/20 hover:border-sky-500/30'
  },
  {
    title: 'Dairy Cow Behavior Recognizer',
    description: 'A multi-sensor perception pipeline tracking cattle movements, feed times, and thermal metrics to identify anomalies.',
    category: 'Machine Learning',
    technologies: ['Computer Vision', 'Sensor Fusion', 'Machine Learning', 'IoT', 'LSTM Networks'],
    githubUrl: 'https://github.com/MrEsmailian/Cattle-Behavior-Recognition',
    keyContributions: [
      'Fused optical camera streams and accelerometer sensors into robust joint spatial-temporal graphs',
      'Tuned specialized LSTM networks classifying standing, feeding, and ruminating states'
    ],
    metrics: '92.1% accuracy under harsh structural interference',
    extendedCaseStudy: 'Designed for livestock monitoring systems. Fuses inertial sensors with computer vision to monitor animal health markers in farming setups, triggering automated vet alerts on detecting lethargies.',
    imageAccent: 'from-indigo-600/20 to-blue-500/20 hover:border-indigo-500/30'
  }
];

const categories = ['All', 'Medical AI', 'Computer Vision', 'Robotics & Vision', 'NLP & LLMs', 'Machine Learning'];

export default function ProjectShowcase() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCat === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCat);

  return (
    <>
      <section id="projects" className="py-24 relative bg-slate-950/20">
        <div className="max-w-6xl mx-auto px-6 font-sans">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-full text-xs font-mono text-cyan-400 mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>Research Pipelines</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-100 tracking-tight">
            Investigative Codebases
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Working repositories translating statistical design principles into durable algorithms.
          </p>

          {/* Tab Categories selector menu */}
          <div className="flex flex-wrap justify-center items-center gap-1.5 mt-8 max-w-2xl mx-auto bg-slate-900/40 border border-slate-805/40 p-1 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  selectedCat === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid display */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl border border-slate-800 bg-gradient-to-br ${project.imageAccent} p-6 flex flex-col justify-between min-h-[300px] shadow-xl hover:shadow-cyan-950/10 group cursor-pointer overflow-hidden z-10`}
                onClick={() => setSelectedProject(project)}
              >
                {/* Visual glow on hover */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono uppercase bg-slate-950/80 border border-slate-800 text-cyan-400 px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                    <Github className="w-4 h-4 text-slate-500 group-hover:text-slate-200 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold font-display text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 mt-6">
                    {project.technologies.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/40 text-slate-400 border border-slate-850">
                        {tag}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[9px] px-1 bg-slate-950/40 text-slate-500 flex items-center justify-center font-bold">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-805/40 flex items-center justify-between text-[11px] text-slate-400 font-mono group-hover:text-cyan-400 transition-colors">
                    <span>Explore Case Assessment</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>

    {/* Case Study Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              layoutId={`modal-${selectedProject.title}`}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-850 rounded-2xl p-6 md:p-8 overflow-hidden shadow-2xl z-10 flex flex-col justify-between max-h-[90vh]"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-2.5 py-0.5 bg-slate-950 border border-slate-800 rounded text-[10px] text-cyan-400 font-mono">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold font-display text-slate-100 mt-1.5">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-2 mt-4 text-xs font-sans text-slate-300 leading-relaxed">
                  <div>
                    <p className="font-semibold text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1">Architectural Overview</p>
                    <p className="bg-slate-950/40 p-3 rounded-lg border border-slate-850 text-slate-300">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-2">Technical Case Study</p>
                    <p className="text-slate-300 leading-relaxed font-sans">{selectedProject.extendedCaseStudy || 'Detailed microservices setup mapping real-time threads to diagnostic outputs.'}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-2">Key Research Contributions</p>
                    <ul className="space-y-1.5">
                      {selectedProject.keyContributions.map((contrib, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-400">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{contrib}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedProject.metrics && (
                    <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <div>
                        <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase block">Benchmark Metrics Achieved</span>
                        <span className="text-slate-300 font-medium text-[11px]">{selectedProject.metrics}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-2">Technologies Deployed</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.technologies.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-850">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t border-slate-800 pt-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                >
                  Close Insights
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
