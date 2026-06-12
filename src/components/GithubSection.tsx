import { useEffect, useState } from 'react';
import { Github, Star, GitFork, BookOpen, Terminal, Code2, RefreshCw } from 'lucide-react';

interface RepoData {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

interface UserProfile {
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  avatar_url: string;
}

export default function GithubSection() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback data in case of GitHub API rate limits or offline state
  const fallbackProfile: UserProfile = {
    name: 'Mohammad-Reza Esmailian',
    bio: "AI Researcher | Master's student @ AUT | Reinforcement Learning, Computational Neuroscience & Medical AI",
    public_repos: 18,
    followers: 42,
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop'
  };

  const fallbackRepos: RepoData[] = [
    {
      name: 'autonomous-deepracer-vision',
      description: 'Autonomous ROS2 vehicular sign recognition module utilizing continuous-control policies and custom YOLOv8 layers.',
      stars: 12,
      forks: 4,
      language: 'Python',
      url: 'https://github.com/MrEsmailian/autonomous-deepracer-vision'
    },
    {
      name: 'rag-scientific-assistant',
      description: 'Hierarchical chunking and vector storage document summarizer grounding LLM summaries to source pages.',
      stars: 9,
      forks: 2,
      language: 'TypeScript',
      url: 'https://github.com/MrEsmailian/rag-scientific-assistant'
    },
    {
      name: 'hexa-rehabilitation-robot',
      description: 'EMG-guided healthcare prosthesis and limb motion assistant using bio-signal Fourier pre-filtration.',
      stars: 15,
      forks: 3,
      language: 'C++',
      url: 'https://github.com/MrEsmailian/hexa-rehabilitation-robot'
    },
    {
      name: 'breast-histology-localization',
      description: 'Medical tumor detection and Grad-CAM coordinate highlight network trained on clinical breast tissues.',
      stars: 8,
      forks: 1,
      language: 'Python',
      url: 'https://github.com/MrEsmailian/breast-histology-localization'
    }
  ];

  const fetchGithubData = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s limit to prevent infinite blocking

      const profileRes = await fetch('https://api.github.com/users/MrEsmailian', { signal: controller.signal });
      const reposRes = await fetch('https://api.github.com/users/MrEsmailian/repos', { signal: controller.signal });

      clearTimeout(timeoutId);

      if (profileRes.ok && reposRes.ok) {
        const profileJson = await profileRes.json();
        const reposJson = await reposRes.json();

        setProfile({
          name: profileJson.name || 'Mohammad-Reza Esmailian',
          bio: profileJson.bio || fallbackProfile.bio,
          public_repos: profileJson.public_repos,
          followers: profileJson.followers,
          avatar_url: profileJson.avatar_url
        });

        // Parse top stars Repos
        const sortedRepos: RepoData[] = reposJson
          .map((r: any) => ({
            name: r.name,
            description: r.description || 'Scientific codebase repository',
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language || 'Python',
            url: r.html_url
          }))
          .sort((a: RepoData, b: RepoData) => b.stars - a.stars)
          .slice(0, 4);

        setRepos(sortedRepos);
      } else {
        throw new Error('Github API rate limit exceeded or endpoint error');
      }
    } catch (err) {
      // Use fallback
      setProfile(fallbackProfile);
      setRepos(fallbackRepos);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, []);

  return (
    <div className="glass p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl text-blue-400">
            <Github size={22} className={isLoading ? "animate-spin" : ""} />
          </div>
          <div>
            <h4 className="font-sans text-base font-bold text-slate-100 flex items-center gap-2">
              GitHub Profile Terminal
              {hasError && (
                <span className="text-[9px] font-mono bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded uppercase tracking-wider">
                  Cached API Data
                </span>
              )}
            </h4>
            <p className="font-mono text-xs text-slate-400">Real-time repository statistics and index tracking</p>
          </div>
        </div>

        <button
          onClick={fetchGithubData}
          disabled={isLoading}
          className="p-2 text-slate-400 hover:text-blue-400 border border-slate-800 hover:border-slate-700 bg-slate-950/40 rounded-lg text-xs font-mono flex items-center gap-2 disabled:opacity-40 transition"
        >
          <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
          <span>Sync API</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Profile Card Left Panel */}
        <div className="lg:col-span-4 glass p-5 border-none flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <img 
              src={profile?.avatar_url || fallbackProfile.avatar_url} 
              alt="GitHub Avatar" 
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full border border-slate-800 shadow-xl object-cover hover:rotate-6 transition duration-300" 
            />
            <div className="absolute -bottom-1 -right-1 p-1 bg-blue-500 border border-slate-950/80 rounded-full">
              <Github size={12} className="text-white" />
            </div>
          </div>

          <div className="space-y-1">
            <h5 className="font-sans text-sm font-bold text-slate-100">{profile?.name || fallbackProfile.name}</h5>
            <span className="font-mono text-[10px] text-blue-400 italic">@MrEsmailian</span>
          </div>

          <p className="text-xs text-slate-450 leading-relaxed font-sans max-w-[240px]">
            {profile?.bio || fallbackProfile.bio}
          </p>

          <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-slate-900 font-mono text-xs">
            <div className="text-center p-2.5 bg-slate-950/80 rounded-lg border border-slate-900">
              <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Public Repos</span>
              <span className="text-sm font-black text-blue-400">{profile?.public_repos ?? fallbackProfile.public_repos}</span>
            </div>
            <div className="text-center p-2.5 bg-slate-950/80 rounded-lg border border-slate-900">
              <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Followers</span>
              <span className="text-sm font-black text-blue-400">{profile?.followers ?? fallbackProfile.followers}</span>
            </div>
          </div>
        </div>

        {/* Repositories grid right side */}
        <div className="lg:col-span-8 space-y-3">
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block">Featured Research Codebases</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {repos.map((repo, i) => (
              <a
                key={i}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="group p-4 glass hover:border-blue-500/40 hover:bg-slate-905/70 hover:-translate-y-0.5 transition rounded-xl flex flex-col justify-between h-[152px] relative overflow-hidden"
              >
                {/* Micro tech vector graphic in bottom right */}
                <div className="absolute right-0 bottom-0 opacity-[0.03] text-[58px] font-mono select-none pointer-events-none group-hover:opacity-[0.08] transition text-blue-400 uppercase font-black">
                  {repo.language.slice(0, 2)}
                </div>

                <div className="space-y-1.5 z-10">
                  <div className="flex items-center justify-between">
                    <h5 className="font-sans text-xs font-black text-slate-100 group-hover:text-blue-400 group-hover:text-glow uppercase transition tracking-tight truncate max-w-[150px]">
                      {repo.name}
                    </h5>
                    <span className="text-[9px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-850">
                      {repo.language}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-450 leading-relaxed font-sans line-clamp-3">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 z-10 pt-2 border-t border-slate-900/50">
                  <span className="flex items-center gap-1 hover:text-yellow-400 transition">
                    <Star size={11} /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1 hover:text-blue-400 transition">
                    <GitFork size={11} /> {repo.forks}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Fallback code repo terminal action bar */}
          <div className="mt-4 p-3 bg-slate-950 border border-slate-900 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[10px] text-slate-500">
            <div className="flex items-center gap-2">
              <Terminal size={12} className="text-emerald-400 animate-pulse" />
              <span>TERMINAL: curl -s https://api.github.com/users/MrEsmailian</span>
            </div>
            <a 
              href="https://github.com/MrEsmailian" 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-400 hover:text-blue-300 transition flex items-center gap-1 font-bold bg-blue-500/5 border border-blue-500/10 px-2 py-1 rounded"
            >
              <BookOpen size={11} />
              <span>Open Profile</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
