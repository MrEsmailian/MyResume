<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

```
<title>Mohammad-Reza Esmailian | AI Researcher</title>

<meta
    name="description"
    content="AI Researcher specializing in Reinforcement Learning, Computational Neuroscience, Medical AI, Computer Vision, and Deep Learning."
>

<meta
    name="keywords"
    content="AI Researcher, Reinforcement Learning, Medical AI, Computational Neuroscience, Deep Learning, Computer Vision"
>

<meta name="author" content="Mohammad-Reza Esmailian">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- CSS -->
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/responsive.css">

<!-- Libraries -->
<script defer src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/d3@7"></script>
```

</head>

<body>

```
<!-- ===================================================== -->
<!-- SCROLL PROGRESS -->
<!-- ===================================================== -->

<div id="scroll-progress"></div>

<!-- ===================================================== -->
<!-- PARTICLE BACKGROUND -->
<!-- ===================================================== -->

<canvas id="particle-canvas"></canvas>

<div class="gradient-orb orb-1"></div>
<div class="gradient-orb orb-2"></div>
<div class="gradient-orb orb-3"></div>

<!-- ===================================================== -->
<!-- COMMAND PALETTE -->
<!-- ===================================================== -->

<div id="command-palette" class="command-palette">
    <div class="command-container">

        <input
            type="text"
            id="command-input"
            placeholder="Search sections..."
            autocomplete="off"
        >

        <ul id="command-results"></ul>

    </div>
</div>

<!-- ===================================================== -->
<!-- NAVIGATION -->
<!-- ===================================================== -->

<nav id="navbar">

    <div class="nav-logo">
        MRE
    </div>

    <ul class="nav-links">

        <li><a href="#hero">Home</a></li>
        <li><a href="#timeline">Research</a></li>
        <li><a href="#publications">Publications</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#vision">Vision</a></li>
        <li><a href="#contact">Contact</a></li>

    </ul>

</nav>

<!-- ===================================================== -->
<!-- HERO -->
<!-- ===================================================== -->

<section id="hero">

    <div class="hero-content">

        <p class="hero-tag">
            AI Researcher
        </p>

        <h1>
            Mohammad-Reza
            <span>Esmailian</span>
        </h1>

        <h2>
            Reinforcement Learning |
            Computational Neuroscience |
            Medical AI
        </h2>

        <div class="typing-container">
            <span id="typing-text"></span>
        </div>

        <p class="hero-description">

            Master's student in Artificial Intelligence
            exploring how intelligent systems learn,
            adapt, and interact with complex environments.

            My work spans Reinforcement Learning,
            Deep Learning, Medical AI,
            Computer Vision, and emerging intersections
            with Computational Neuroscience.

        </p>

        <div class="hero-buttons">

            <a href="#" class="btn primary">
                GitHub
            </a>

            <a href="#" class="btn secondary">
                LinkedIn
            </a>

            <a href="assets/cv/CV.pdf"
               class="btn secondary"
               download>
                Download CV
            </a>

            <a href="#contact"
               class="btn secondary">
                Contact
            </a>

        </div>

    </div>

    <div id="hero-3d-container"></div>

</section>

<!-- ===================================================== -->
<!-- TIMELINE -->
<!-- ===================================================== -->

<section id="timeline">

    <div class="section-header">

        <p class="section-label">
            Journey
        </p>

        <h2>Research Timeline</h2>

    </div>

    <div class="timeline-container">

        <div class="timeline-item">
            <span class="year">2020</span>
            <h3>Bachelor's in Computer Engineering</h3>
        </div>

        <div class="timeline-item">
            <span class="year">2023</span>
            <h3>AI Department Manager</h3>
            <p>Bina Pardaz Shargh</p>
        </div>

        <div class="timeline-item">
            <span class="year">2024</span>
            <h3>International Informatics Olympiad</h3>
            <p>2nd Place</p>
        </div>

        <div class="timeline-item">
            <span class="year">2024</span>
            <h3>Teaching Assistant</h3>
            <p>Algorithms, Microprocessors, Compiler Design</p>
        </div>

        <div class="timeline-item">
            <span class="year">2025</span>
            <h3>Master's in Artificial Intelligence</h3>
            <p>Amirkabir University of Technology</p>
        </div>

        <div class="timeline-item">
            <span class="year">2025</span>
            <h3>Scientific Reports Publication</h3>
        </div>

    </div>

</section>

<!-- ===================================================== -->
<!-- RESEARCH INTERESTS -->
<!-- ===================================================== -->

<section id="research-interests">

    <div class="section-header">
        <h2>Research Interests</h2>
    </div>

    <div class="research-grid">

    </div>

</section>

<!-- ===================================================== -->
<!-- PUBLICATIONS -->
<!-- ===================================================== -->

<section id="publications">

    <div class="section-header">
        <h2>Publications</h2>
    </div>

    <div class="publication-card glass">

        <span class="journal">
            Scientific Reports
        </span>

        <h3>
            A Machine Learning-based Framework for
            Predicting Metabolic Syndrome using
            Serum Liver Function Tests and hs-CRP
        </h3>

        <div class="publication-actions">

            <button id="citation-btn">
                Citation
            </button>

            <button id="doi-btn">
                DOI
            </button>

            <button id="abstract-btn">
                Abstract
            </button>

        </div>

        <div id="impact-chart"></div>

    </div>

</section>

<!-- ===================================================== -->
<!-- PROJECTS -->
<!-- ===================================================== -->

<section id="projects">

    <div class="section-header">
        <h2>Projects</h2>
    </div>

    <div id="projects-grid">

    </div>

</section>

<!-- ===================================================== -->
<!-- SKILLS -->
<!-- ===================================================== -->

<section id="skills">

    <div class="section-header">
        <h2>Skills Network</h2>
    </div>

    <div id="skills-graph"></div>

</section>

<!-- ===================================================== -->
<!-- RESEARCH MAP -->
<!-- ===================================================== -->

<section id="research-map-section">

    <div class="section-header">
        <h2>Research Map</h2>
    </div>

    <div id="research-map"></div>

</section>

<!-- ===================================================== -->
<!-- GITHUB -->
<!-- ===================================================== -->

<section id="github">

    <div class="section-header">
        <h2>GitHub Activity</h2>
    </div>

    <div id="github-profile"></div>

    <div id="github-repositories"></div>

</section>

<!-- ===================================================== -->
<!-- EDUCATION -->
<!-- ===================================================== -->

<section id="education">

    <div class="section-header">
        <h2>Education</h2>
    </div>

    <div class="education-grid">

        <div class="education-card glass">

            <h3>
                Ferdowsi University of Mashhad
            </h3>

            <p>
                Bachelor of Computer Engineering
            </p>

        </div>

        <div class="education-card glass">

            <h3>
                Amirkabir University of Technology
            </h3>

            <p>
                Master's in Artificial Intelligence
            </p>

        </div>

    </div>

</section>

<!-- ===================================================== -->
<!-- ACHIEVEMENTS -->
<!-- ===================================================== -->

<section id="achievements">

    <div class="section-header">
        <h2>Achievements</h2>
    </div>

    <div class="achievement-grid">

        <div class="achievement-card">
            <span class="counter" data-target="1">0</span>
            <p>Scientific Reports Publication</p>
        </div>

        <div class="achievement-card">
            <span class="counter" data-target="4">0</span>
            <p>Teaching Assistantships</p>
        </div>

        <div class="achievement-card">
            <span class="counter" data-target="2">0</span>
            <p>Olympiad Rank</p>
        </div>

    </div>

</section>

<!-- ===================================================== -->
<!-- VISION -->
<!-- ===================================================== -->

<section id="vision">

    <div class="section-header">
        <h2>Where I Want To Go</h2>
    </div>

    <div class="roadmap">

        <div>MSc Artificial Intelligence</div>
        <div>Advanced Reinforcement Learning</div>
        <div>Brain-Inspired Intelligence</div>
        <div>Computational Neuroscience</div>
        <div>Medical Intelligence Systems</div>
        <div>PhD Research</div>

    </div>

</section>

<!-- ===================================================== -->
<!-- CONTACT -->
<!-- ===================================================== -->

<section id="contact">

    <div class="contact-info">

        <h2>Let's Connect</h2>

        <a href="mailto:your-email@example.com">
            Email
        </a>

        <a href="#">
            LinkedIn
        </a>

        <a href="#">
            GitHub
        </a>

    </div>

    <form id="contact-form">

        <input
            type="text"
            placeholder="Your Name"
            required
        >

        <input
            type="email"
            placeholder="Email"
            required
        >

        <textarea
            rows="6"
            placeholder="Message"
            required>
        </textarea>

        <button type="submit">
            Send Message
        </button>

    </form>

</section>

<!-- ===================================================== -->
<!-- PROJECT MODAL -->
<!-- ===================================================== -->

<div id="project-modal" class="modal">

    <div class="modal-content">

        <button class="close-modal">
            ×
        </button>

        <div id="modal-body"></div>

    </div>

</div>

<!-- ===================================================== -->
<!-- ABSTRACT MODAL -->
<!-- ===================================================== -->

<div id="abstract-modal" class="modal">

    <div class="modal-content">

        <button class="close-modal">
            ×
        </button>

        <div id="abstract-content"></div>

    </div>

</div>

<!-- ===================================================== -->
<!-- FOOTER -->
<!-- ===================================================== -->

<footer>

    <p>
        © 2026 Mohammad-Reza Esmailian
    </p>

</footer>

<!-- ===================================================== -->
<!-- JAVASCRIPT -->
<!-- ===================================================== -->

<script src="js/main.js"></script>
<script src="js/particles.js"></script>
<script src="js/github.js"></script>
<script src="js/commandPalette.js"></script>
<script src="js/timeline.js"></script>
<script src="js/researchMap.js"></script>
<script src="js/skillsGraph.js"></script>
```

</body>
</html>
