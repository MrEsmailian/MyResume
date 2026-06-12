import { TimelineEvent, ResearchInterest, Publication, Project, SkillNode, SkillLink } from './types';

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: '2020',
    title: "Bachelor's in Computer Engineering",
    organization: 'Ferdowsi University of Mashhad',
    description: 'Began academic foundation in computing, specializing in high-performance algorithms, system architecture, and machine learning foundations. Conducted early exploration of computational models.',
    category: 'education',
    tags: ['Algorithms', 'Systems', 'FUM']
  },
  {
    year: '2023',
    title: 'AI Department Manager',
    organization: 'Bina Pardaz Shargh',
    description: 'Led a team of engineers in developing commercial-grade computer vision and machine learning solutions. Overlooked system design, model deployment integration, and industrial automation algorithms.',
    category: 'experience',
    tags: ['Leadership', 'Computer Vision', 'Deep Learning']
  },
  {
    year: '2024',
    title: 'International Informatics Olympiad',
    organization: 'Global Informatics Arena',
    description: 'Secured 2nd Place globally, demonstrating advanced capabilities in algorithmic problem solving, complex structures, and real-time computational math.',
    category: 'achievement',
    tags: ['2nd Place', 'Competitive Programming', 'Algorithms']
  },
  {
    year: '2024',
    title: 'Teaching Assistant',
    organization: 'Academic Department',
    description: 'Instructed next-generation engineers in classical Algorithms design, low-level Microprocessors architectures, and Compiler Design methodologies. Created advanced labs for students.',
    category: 'experience',
    tags: ['Algorithms', 'Microprocessors', 'Compilers']
  },
  {
    year: '2025',
    title: "Master's in Artificial Intelligence",
    organization: 'Amirkabir University of Technology',
    description: 'Advanced research focusing on Reinforcement Learning, deep probabilistic models, healthcare informatics, and brain-computer interfaces. Formulating novel approaches for smart adaptive agents.',
    category: 'education',
    tags: ['AUT', 'Deep RL', 'Neuroscience']
  },
  {
    year: '2025',
    title: 'Published Research Paper in Scientific Reports',
    organization: 'Nature Portfolio',
    description: 'Co-authored and published peer-reviewed research analyzing metabonomic configurations in public health datasets using explainable ensemble predictors.',
    category: 'research',
    tags: ['Nature Scientific Reports', 'Explainable AI', 'Biomedical']
  }
];

export const RESEARCH_INTERESTS: ResearchInterest[] = [
  {
    id: 'rl',
    title: 'Reinforcement Learning',
    directions: [
      'Model-based RL for high-dimensional control',
      'Sample efficiency in sparse-reward environments',
      'Safe exploration strategies under constraints'
    ],
    projects: ['DeepRacer autonomous traffic-sign adaptive system', 'Hexa robotic limb rehabilitation RL workspace'],
    description: 'Exploring how agents formulate optimal policies by interacting with structural environments. Focusing on continuous control stability and transfer learning bounds.',
    iconName: 'Zap'
  },
  {
    id: 'drl',
    title: 'Deep Reinforcement Learning',
    directions: [
      'Representation learning in DQN and Actor-Critic models',
      'Value function approximation using neural networks',
      'Transfer learning between virtual models and physical hardware'
    ],
    projects: ['DeepRacer autonomous traffic-sign adaptive system'],
    description: 'Marrying deep neutral networks with temporal difference learning to handle raw pixel inputs and complex action spaces.',
    iconName: 'Network'
  },
  {
    id: 'comp-neuro',
    title: 'Computational Neuroscience',
    directions: [
      'Biologically plausible neural networks & SNNs',
      'Cognitive architecture mapping into artificial agents',
      'Hippocampal replay models for continuous learning'
    ],
    projects: ['Brain-inspired memory buffering for reinforcement agents'],
    description: 'Analyzing neural coding and biological reinforcement patterns to design robust architectures that resist catastrophic forgetting.',
    iconName: 'Brain'
  },
  {
    id: 'medical-ai',
    title: 'Medical AI',
    directions: [
      'Explainable diagnostics using multi-modal serum and imaging data',
      'Deep classifier validation on unbalanced clinical reports',
      'Adaptive treatment sequencing via clinical MDPs'
    ],
    projects: ['Metabolic Syndrome Predictor (Scientific Reports)', 'Breast Cancer Deep Localization system'],
    description: 'Developing high-stakes clinical decision frameworks that maintain structural transparency, reliability, and academic precision.',
    iconName: 'Activity'
  },
  {
    id: 'xai',
    title: 'Explainable AI (XAI)',
    directions: [
      'Shapley value optimization for medical ensemble models',
      'Integrated Gradients for deep vision transparency',
      'Interpretable symbolic policies in reinforcement learning'
    ],
    projects: ['Spectral Shapley feature engineering in Metabolic Syndrome prediction'],
    description: 'Demystifying the "black-box" nature of neural systems, especially in high-stakes fields like clinical medicine and autonomous robotics.',
    iconName: 'Search'
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    directions: [
      'Adversarial robustness in real-time visual classifiers',
      'Object detection networks in low-light and high-noise settings',
      'Multi-spectral segmentation for industrial quality assurance'
    ],
    projects: ['Dairy Cow Behavior Recognition', 'Industrial Defect Detection', 'CNN Digit Localization'],
    description: 'Designing robust vision engines that map visual cues to downstream robotic controls and high-accuracy diagnostic markers.',
    iconName: 'Eye'
  },
  {
    id: 'llms',
    title: 'Large Language Models',
    directions: [
      'Retrieval-Augmented Generation (RAG) with local knowledge trees',
      'Context compression and lightweight vector embedding retrievers',
      'Agentic reasoning loops with scientific document synthesis'
    ],
    projects: ['RAG Scientific Documentation Assistant'],
    description: 'Harnessing transformer models for specialized reasoning, search, and synthesis of research repositories and clinical files.',
    iconName: 'FileText'
  },
  {
    id: 'bioinformatics',
    title: 'Bioinformatics',
    directions: [
      'Predictive mapping of serum liver functions and inflammation markers',
      'Gene expression profiling using unsupervised autoencoders',
      'Protein interaction network representation learning'
    ],
    projects: ['Predicting Metabolic Syndrome via serum-liver tests and hs-CRP'],
    description: 'Decoding biochemical pathways and systemic health vulnerabilities through computational pipelines and clinical data networks.',
    iconName: 'Dna'
  }
];

export const FEATURE_PUBLICATION: Publication = {
  title: 'A Machine Learning-based Framework for Predicting Metabolic Syndrome using Serum Liver Function Tests and hs-CRP',
  journal: 'Scientific Reports (Nature Portfolio)',
  year: '2025',
  authors: ['M.R. Esmailian', 'et al.'],
  doi: '10.1038/s41598-025-xxxx',
  citation: 'Esmailian, M.R., et al. "A Machine Learning-based Framework for Predicting Metabolic Syndrome using Serum Liver Function Tests and hs-CRP." Scientific Reports 15, 1204 (2025).',
  abstract: 'Metabolic syndrome (MetS) is a major global health risk linked with diabetes and cardiovascular diseases. Traditional diagnoses require intensive bio-measurements. In this work, we propose an explainable machine learning ensemble model integrating serum liver function tests and High-Sensitivity C-Reactive Protein (hs-CRP) to identify metabolic anomalies early. Our framework achieves superior sensitivity (AUC of 0.89) while employing SHAP explanation metrics to guarantee medical interpretability, offering a scalable screening protocol for secondary prevention.',
  impactMetrics: [
    { label: 'Impact Factor', value: '4.6', description: 'Journal Citation Reports (Clarivate)' },
    { label: 'AUC Score', value: '0.89', description: 'Metabolic syndrome classification accuracy' },
    { label: 'SHAP Analysis', value: '100%', description: 'Transparent local explaining of clinical risk variables' },
    { label: 'Peer Review', value: 'Double-Blind', description: 'Rigorous scholarly evaluation' }
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'rag-assistant',
    title: 'RAG Documentation Assistant',
    technologies: ['LLMs', 'Retrieval-Augmented Generation', 'NLP', 'Vector Databases', 'LangChain'],
    description: 'An advanced conversational agent capable of semantic searching and summarizing large volumes of complex scientific literature using compact vector stores.',
    longDescription: 'This system implements local retrieval pipelines using hierarchical chunking, dual-stage cross-encoder re-ranking, and advanced embedding representations. It allows researchers to upload multi-page academic papers, construct a dynamic knowledge graph, and perform factual chat synthesis without exposing API credentials to arbitrary public services.',
    githubUrl: 'https://github.com/MrEsmailian/rag-scientific-assistant',
    category: 'nlp',
    imagePlaceholderColor: 'from-blue-900 to-indigo-950',
    keyFeatures: [
      'Structured vector retrieval layout using cosine clustering',
      'Document re-ranking utilizing light neural cross-encoders',
      'Context-anchored source citation targeting precise pages'
    ],
    researchImpact: 'Reduces literature review exploration overhead by compiling localized contextual responses with robust grounding diagnostics.'
  },
  {
    id: 'data-anno',
    title: 'Data Annotation Platform',
    technologies: ['Python', 'Dataset Engineering', 'OpenCV', 'FastAPI', 'Active Learning'],
    description: 'A custom, collaborative annotation tool designed for rapid tagging and dataset verification using integrated active learning queues.',
    longDescription: 'To address the bottlenecks in medical and agricultural datasets, this system integrates pre-trained deep classifiers that suggest bounding boxes and segmentation masks. The system prioritizes uncertain images using an active reinforcement loop, cutting down total annotation hours by up to 60%.',
    githubUrl: 'https://github.com/MrEsmailian/active-annotation-engine',
    category: 'infrastructure',
    imagePlaceholderColor: 'from-sky-950 to-slate-900',
    keyFeatures: [
      'Active learning uncertainty queue for dataset curation',
      'Slick web-based drag and tag with visual feedback',
      'Multi-format export supporting COCO, YOLO, and TFRecord structures'
    ],
    researchImpact: 'Accelerates visual research workflow iterations by bridging human labeling with predictive AI assistance.'
  },
  {
    id: 'cnn-digits',
    title: 'CNN Digit Recognition',
    technologies: ['PyTorch', 'CNNs', 'Computer Vision', 'Hyperparameter Tuning'],
    description: 'A deep convolutional neural network built from scratch in PyTorch, exploring structural optimization boundaries on spatial representation metrics.',
    longDescription: 'Designed as a deep analysis of model parameters, this implementation investigates how activation functions, learning rate schedules, and kernel sizes impact learning convergence. Explains spatial feature maps at each network layer using localized convolutional activation maps (Grad-CAM).',
    githubUrl: 'https://github.com/MrEsmailian/pytorch-cnn-digit-explorer',
    category: 'deep-learning',
    imagePlaceholderColor: 'from-indigo-900 to-slate-950',
    keyFeatures: [
      'Layer-by-layer parameter activation map visualizers',
      'Robust optimization techniques using Cosine Annealing',
      'Out-of-distribution adversarial noise stress tests'
    ],
    researchImpact: 'Serves as an analytical bedrock demonstrating how internal layers capture structural stroke geometry, vital for robust optical character recognition.'
  },
  {
    id: 'mnist-clustering',
    title: 'MNIST Clustering Space',
    technologies: ['Machine Learning', 'Feature Engineering', 't-SNE', 'PCA', 'Gaussian Mixtures'],
    description: 'A comprehensive study of unsupervised clustering algorithms on high-dimensional data, extracting latent structural embeddings without labels.',
    longDescription: 'This research project maps the MNIST image distribution using PCA, t-SNE, and UMAP into lower dimensions, benchmarking how traditional algorithms like K-Means, DBSCAN, and Gaussian Mixture Models partition latent topological manifold structures.',
    githubUrl: 'https://github.com/MrEsmailian/unsupervised-manifold-clustering',
    category: 'machine-learning',
    imagePlaceholderColor: 'from-cyan-950 to-neutral-900',
    keyFeatures: [
      'Interactive visual t-SNE projection scatter grid in 2D space',
      'Silhouette coefficient benchmark comparisons',
      'Dynamic noise filtering via high-pass pre-filters'
    ],
    researchImpact: 'Demonstrates cluster separability boundaries, giving structural hints on how deep classification layers automatically partition feature zones.'
  },
  {
    id: 'breast-cancer',
    title: 'Breast Cancer Diagnostic Detection',
    technologies: ['Medical Imaging', 'Deep Learning', 'PyTorch', 'ResNet-50', 'Explainable AI'],
    description: 'A high-accuracy diagnostic localization network classifying histopathological images and highlighting suspicious cellular clusters.',
    longDescription: 'In high-stakes breast cancer diagnosis, false negatives are critical. This project applies custom transfer-trained deep systems (ResNet, DenseNet) on histological datasets. Integrated CAM (Class Activation Mapping) outputs absolute cell-region heatmaps, offering clinicians visual diagnostic pathways.',
    githubUrl: 'https://github.com/MrEsmailian/breast-histology-localization',
    category: 'medical-ai',
    imagePlaceholderColor: 'from-rose-950 to-slate-950',
    keyFeatures: [
      'High-precision pixel segmentation targeting target regions',
      'Explainable heatmaps displaying cellular attention scores',
      'Precision-Recall curve thresholds customized for surgical sensitivity'
    ],
    researchImpact: 'Enhances clinician diagnostic speed and confidence, translating numeric probabilities into localized biological features.'
  },
  {
    id: 'deepracer-vision',
    title: 'DeepRacer Traffic Sign Adaptor',
    technologies: ['Computer Vision', 'Robotics', 'ROS2', 'Reinforcement Learning', 'YOLO'],
    description: 'Autonomous hardware module enabling small-scale vehicles to dynamically adjust velocities based on real-time visual road indicators.',
    longDescription: 'By combining a YOLO-based sign detection thread with an actor-critic control policy, this robotic vehicle translates monocular camera frames into steering and throttle vectors. Tested on custom physical tracks with dynamic shadow and glare factors.',
    githubUrl: 'https://github.com/MrEsmailian/autonomous-deepracer-vision',
    category: 'robotics',
    imagePlaceholderColor: 'from-sky-900 to-indigo-950',
    keyFeatures: [
      'YOLOv8 real-time sign detection pipeline',
      'ROS2 middleware integration managing sensory telemetry',
      'Reinforcement learning feedback loop for track center alignment'
    ],
    researchImpact: 'Validates sim-to-real transfer learning strategies, confirming that vision sub-modules stabilize policy gradients on tangible hardware.'
  },
  {
    id: 'hexa-rehab',
    title: 'Hexa Rehabilitation Workspace',
    technologies: ['Healthcare Robotics', 'Biomimicking', 'Control Theory', 'Arduino', 'Sensor Fusion'],
    description: 'A robotic orthotic interface designed to support range-of-motion recovery utilizing multi-channel biosensor feedback.',
    longDescription: 'The Hexa robot implements complex trajectory tracking to support neurological limb rehabilitation. Reading EMG (electromyographic) skin sensors, the platform predicts movement intentions and activates stepper motors to safely guide joint rotation limits.',
    githubUrl: 'https://github.com/MrEsmailian/hexa-rehabilitation-robot',
    category: 'robotics',
    imagePlaceholderColor: 'from-emerald-950 to-stone-900',
    keyFeatures: [
      'EMG signal pre-processing using Fourier filter pools',
      'Torque feedback control mechanisms safeguarding patient limbs',
      'Patient progress tracking graphs analyzing structural flexibility offsets'
    ],
    researchImpact: 'Advances biomechanic engineering by aligning active physical support with biological signal processing vectors.'
  },
  {
    id: 'industrial-defect',
    title: 'Industrial Quality Defect Locator',
    technologies: ['Machine Vision', 'Deep OCR', 'PyTorch', 'Autoencoders', 'Anomaly Detection'],
    description: 'A high-speed manufacturing visual inspection terminal classifying metallic fractures and serial print errors.',
    longDescription: 'Built for industrial deployment, this pipeline employs autoencoders trained exclusively on perfect product samples. Deviating outputs reveal defects as reconstruction residuals, enabling zero-shot detection of completely novel faults.',
    githubUrl: 'https://github.com/MrEsmailian/industrial-anomaly-detector',
    category: 'computer-vision',
    imagePlaceholderColor: 'from-teal-950 to-neutral-900',
    keyFeatures: [
      'Unsupervised reconstruction residual defect mapping',
      'Sub-millisecond processing windows for high-output setups',
      'Robust optical character recognition checking stamped codes'
    ],
    researchImpact: 'Empowers high-output plants to prevent micro-fracture escapes without requiring thousands of negative training labels.'
  },
  {
    id: 'cow-behavior',
    title: 'Dairy Cow Behavior Analyzer',
    technologies: ['Computer Vision', 'Sensor Fusion', 'Machine Learning', 'YOLO-Pose', 'LSTM'],
    description: 'An agricultural analysis pipeline classifying cattle structural stances (standing, eating, lying, limping) for herd-level health insights.',
    longDescription: 'Combining collar-mounted IMUs with long-range corral video feeds, this system fuses movement data into a deep classifier (YOLO-Pose + LSTM). It tracks daily activities to report lameness or feeding issues 48 hours before physical symptoms escalate.',
    githubUrl: 'https://github.com/MrEsmailian/dairy-bovine-behavior-recognition',
    category: 'computer-vision',
    imagePlaceholderColor: 'from-cyan-900 to-indigo-950',
    keyFeatures: [
      'YOLO-Pose estimation tracking dairy joint coordinates',
      'LSTM recurrent layers classifying temporal behavior series',
      'Sensor fusion synchronization aligning video frames with IMU signals'
    ],
    researchImpact: 'Brings high-accuracy welfare analytics to livestock farms, proving model scalability in highly unstructured environmental regimes.'
  }
];

export const SKILLS_DATA: SkillNode[] = [
  // Programming
  { name: 'Python', category: 'programming', proficiency: 95 },
  { name: 'C++', category: 'programming', proficiency: 85 },
  { name: 'Java', category: 'programming', proficiency: 80 },
  
  // AI / ML
  { name: 'PyTorch', category: 'aiml', proficiency: 93 },
  { name: 'TensorFlow', category: 'aiml', proficiency: 85 },
  { name: 'Scikit-Learn', category: 'aiml', proficiency: 90 },
  
  // Data
  { name: 'Pandas', category: 'data', proficiency: 92 },
  { name: 'NumPy', category: 'data', proficiency: 94 },
  { name: 'MySQL', category: 'data', proficiency: 85 },
  
  // Tools
  { name: 'Docker', category: 'tools', proficiency: 88 },
  { name: 'Kubernetes', category: 'tools', proficiency: 75 },
  { name: 'Apache Superset', category: 'tools', proficiency: 80 },
  { name: 'Git', category: 'tools', proficiency: 90 }
];

export const SKILL_CONNECTIONS: SkillLink[] = [
  { source: 'Python', target: 'PyTorch' },
  { source: 'Python', target: 'TensorFlow' },
  { source: 'Python', target: 'Scikit-Learn' },
  { source: 'Python', target: 'Pandas' },
  { source: 'Python', target: 'NumPy' },
  { source: 'PyTorch', target: 'TensorFlow' },
  { source: 'PyTorch', target: 'Scikit-Learn' },
  { source: 'Pandas', target: 'NumPy' },
  { source: 'Pandas', target: 'MySQL' },
  { source: 'C++', target: 'PyTorch' },
  { source: 'C++', target: 'Git' },
  { source: 'Java', target: 'MySQL' },
  { source: 'Docker', target: 'Kubernetes' },
  { source: 'Docker', target: 'Git' },
  { source: 'Apache Superset', target: 'MySQL' },
  { source: 'Apache Superset', target: 'Pandas' },
  { source: 'PyTorch', target: 'Docker' }
];

export const MAP_NODES = [
  { id: 'Computational Neuroscience', description: 'Brain mechanisms, spiking networks, neuro-mimicking mechanisms.', x: 150, y: 150, radius: 18 },
  { id: 'Reinforcement Learning', description: 'Interactive policy optimizations, continuous control metrics.', x: 320, y: 100, radius: 20 },
  { id: 'Medical AI', description: 'High-precision explainable screening systems & clinical diagnostics.', x: 190, y: 350, radius: 19 },
  { id: 'Computer Vision', description: 'Feature map extraction, active visual attention structures.', x: 450, y: 220, radius: 18 },
  { id: 'Bioinformatics', description: 'Decryption of sequence profiles and serum metabolism.', x: 400, y: 380, radius: 17 },
  { id: 'Large Language Models', description: 'Advanced agentic search networks and medical RAG contexts.', x: 550, y: 120, radius: 17 }
];

export const MAP_LINKS = [
  { source: 'Computational Neuroscience', target: 'Reinforcement Learning', label: 'Biological Replay & Dopaminergic Signals' },
  { source: 'Reinforcement Learning', target: 'Computer Vision', label: 'Monocular Pixel-to-Action Gradients' },
  { source: 'Medical AI', target: 'Bioinformatics', label: 'Serum Factor Metabolics Data Modeling' },
  { source: 'Medical AI', target: 'Computer Vision', label: 'Cellular Segmentations & Histology CAM Heatmaps' },
  { source: 'Large Language Models', target: 'Medical AI', label: 'Factual Semantic Healthcare Reasoning' },
  { source: 'Reinforcement Learning', target: 'Medical AI', label: 'Markov Diagnostics & Treatment Paths' }
];
