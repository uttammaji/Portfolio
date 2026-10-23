import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Star,
  GitFork,
  Users,
  BookMarked,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Code2,
} from 'lucide-react';
import Container from '@/components/ui/Container';

/* ================================================================== */
/*  CONFIG                                                             */
/* ================================================================== */

const GITHUB_USERNAME = 'uttammaji';
const API_BASE = 'https://api.github.com';

/* GitHub language → color (official GitHub palette) */
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
};

/* ================================================================== */
/*  FETCHERS                                                           */
/* ================================================================== */

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) {
    if (res.status === 403) throw new Error('rate-limit');
    if (res.status === 404) throw new Error('not-found');
    throw new Error('fetch-failed');
  }
  return res.json();
}

function fetchUser() {
  return fetchJSON(`${API_BASE}/users/${GITHUB_USERNAME}`);
}

function fetchRepos() {
  return fetchJSON(
    `${API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
  );
}

/* ================================================================== */
/*  HOOK — GitHub profile + repos                                      */
/* ================================================================== */

function useGitHub() {
  const [state, setState] = useState({
    loading: true,
    error: null,
    user: null,
    repos: [],
  });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const [user, repos] = await Promise.all([fetchUser(), fetchRepos()]);
      /* Filter out forks, then sort by stars then by updated date */
      const owned = repos
        .filter((r) => !r.fork)
        .sort((a, b) => {
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return new Date(b.updated_at) - new Date(a.updated_at);
        });
      setState({ loading: false, error: null, user, repos: owned });
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: err.message }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, retry: load };
}

/* ================================================================== */
/*  SKELETON + ERROR                                                   */
/* ================================================================== */

function SkeletonCard() {
  return (
    <div className="border border-border bg-card p-5">
      <div className="h-4 w-32 bg-border/40 mb-3" />
      <div className="h-3 w-full bg-border/30 mb-2" />
      <div className="h-3 w-3/4 bg-border/30 mb-4" />
      <div className="h-3 w-20 bg-border/30" />
    </div>
  );
}

function ErrorState({ code, onRetry }) {
  const message =
    code === 'rate-limit'
      ? 'GitHub API rate limit reached. Try again in a few minutes.'
      : code === 'not-found'
      ? 'GitHub profile not found.'
      : 'Could not load GitHub data.';

  return (
    <div className="border border-border bg-card p-6 flex items-start gap-3">
      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="font-mono text-sm text-foreground mb-1">{message}</div>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline"
        >
          <RefreshCw className="w-3 h-3" />
          retry
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  REPO CARD                                                          */
/* ================================================================== */

function RepoCard({ repo, index }) {
  const langColor =
    LANGUAGE_COLORS[repo.language] || '#888888';

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="group relative border border-border bg-card p-5 hover:border-accent/40 transition-colors block"
    >
      {/* top edge highlight */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5F5F5]/15 to-transparent"
      />

      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Github className="w-4 h-4 text-muted shrink-0" />
          <span className="font-mono text-sm font-bold text-foreground group-hover:text-accent transition-colors truncate">
            {repo.name}
          </span>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors shrink-0" />
      </div>

      <p className="text-sm text-secondary mb-4 line-clamp-2 min-h-[40px]">
        {repo.description || 'No description provided.'}
      </p>

      <div className="flex items-center gap-4 font-mono text-[11px] text-muted">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: langColor }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3 h-3" />
          {repo.forks_count}
        </span>
        {repo.updated_at && (
          <span className="ml-auto text-muted/60">
            {new Date(repo.updated_at).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        )}
      </div>
    </motion.a>
  );
}

/* ================================================================== */
/*  STATS BAR                                                          */
/* ================================================================== */

function StatsBar({ user, repoCount }) {
  const items = [
    { icon: BookMarked, label: 'REPOS',     value: repoCount },
    { icon: Users,      label: 'FOLLOWERS', value: user.followers },
    { icon: Users,      label: 'FOLLOWING', value: user.following },
    { icon: Star,       label: 'STARS',     value: user.public_gists + '' }, // placeholder replaced below
  ];

  /* Compute real stars total */
  const totalStars = user._totalStars ?? 0;

  const display = [
    { icon: BookMarked, label: 'PUBLIC REPOS', value: repoCount },
    { icon: Users,      label: 'FOLLOWERS',    value: user.followers },
    { icon: Users,      label: 'FOLLOWING',    value: user.following },
    { icon: Star,       label: 'TOTAL STARS',  value: totalStars },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border border-border bg-card divide-x divide-y md:divide-y-0 divide-border">
      {display.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="p-5 flex flex-col gap-1"
          >
            <div className="flex items-center gap-2 font-mono text-[10px] text-muted tracking-widest">
              <Icon className="w-3 h-3 text-accent" />
              {item.label}
            </div>
            <div className="font-mono text-2xl font-bold text-foreground tabular-nums">
              {item.value}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ================================================================== */
/*  CONTRIBUTION HEATMAP — via github-contributions-api                 */
/* ================================================================== */

function ContributionHeatmap() {
  const [state, setState] = useState({ loading: true, days: [], total: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        /* Public, CORS-friendly contribution API */
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (!res.ok) throw new Error('fetch-failed');
        const data = await res.json();
        if (cancelled) return;

        const contributions = data.contributions || [];
        const total = contributions.reduce(
          (sum, d) => sum + (d.count || 0),
          0
        );

        /* Bucket into 5 levels — 0..4 */
        const max = Math.max(1, ...contributions.map((d) => d.count));
        const days = contributions.map((d) => {
          const count = d.count || 0;
          if (count === 0) return 0;
          const ratio = count / max;
          if (ratio < 0.25) return 1;
          if (ratio < 0.5) return 2;
          if (ratio < 0.75) return 3;
          return 4;
        });

        setState({ loading: false, days, total });
      } catch (err) {
        if (!cancelled) setError('fetch-failed');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const LEVEL_CLASSES = [
    'bg-border/30',
    'bg-accent/25',
    'bg-accent/45',
    'bg-accent/70',
    'bg-accent',
  ];

  /* Pad to full 52 weeks × 7 days grid, pad at the end */
  const totalCells = 52 * 7;
  const cells =
    state.days.length >= totalCells
      ? state.days.slice(0, totalCells)
      : [...state.days, ...Array(totalCells - state.days.length).fill(0)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="relative border border-border bg-card p-6"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5F5F5]/15 to-transparent"
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-accent" />
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            / contribution-activity
          </span>
        </div>
        {!state.loading && !error && (
          <span className="font-mono text-xs text-muted">
            <span className="text-accent font-bold">{state.total}</span>{' '}
            contributions · last 12 months
          </span>
        )}
      </div>

      {state.loading && (
        <div className="font-mono text-xs text-muted">loading…</div>
      )}

      {error && (
        <div className="font-mono text-xs text-muted">
          contribution data unavailable
        </div>
      )}

      {!state.loading && !error && (
        <>
          <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2">
            {cells.map((level, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-sm ${LEVEL_CLASSES[level]}`}
                title={`${level} contributions`}
              />
            ))}
          </div>
          <div className="flex items-center justify-end gap-1.5 mt-3">
            <span className="font-mono text-xs text-muted">Less</span>
            {LEVEL_CLASSES.map((c, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
            ))}
            <span className="font-mono text-xs text-muted">More</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ================================================================== */
/*  GITHUB SECTION                                                     */
/* ================================================================== */

export default function GitHubSection() {
  const { loading, error, user, repos, retry } = useGitHub();

  /* Total stars across all owned repos */
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  /* Top 4 repos for the grid */
  const topRepos = repos.slice(0, 4);

  /* Compute user._totalStars for StatsBar */
  const enrichedUser = user ? { ...user, _totalStars: totalStars } : null;

  return (
    <section id="github" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <Container>
        {/* Section header — handwritten style */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm text-accent">07</span>
            <span className="font-mono text-sm text-muted uppercase tracking-widest">
              GITHUB
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="font-mono text-xs text-muted mb-4">
            <span className="text-accent">$</span> git log --author=uttammaji
          </div>

          <h2
            className="font-handwritten"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              color: '#F5F5F5',
              transform: 'rotate(-1deg)',
              transformOrigin: 'left center',
            }}
          >
            Building in{' '}
            <span className="relative inline-block">
              public
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute left-0 right-0 -bottom-1 w-full h-3 pointer-events-none"
              >
                <path
                  d="M2 8 C 40 3, 90 3, 130 6 S 180 9, 198 5"
                  fill="none"
                  stroke="#7CFF9B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h2>

          <p className="mt-4 text-base text-secondary leading-relaxed max-w-2xl">
            Live repositories and contribution activity pulled directly from
            GitHub.
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-8">
            <ErrorState code={error} onRetry={retry} />
          </div>
        )}

        {/* Stats bar */}
        {loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 border border-border bg-card divide-x divide-y md:divide-y-0 divide-border mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-5">
                <div className="h-3 w-20 bg-border/30 mb-2" />
                <div className="h-6 w-12 bg-border/40" />
              </div>
            ))}
          </div>
        )}

        {enrichedUser && (
          <div className="mb-8">
            <StatsBar user={enrichedUser} repoCount={repos.length} />
          </div>
        )}

        {/* Repo grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {loading &&
            !error &&
            Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}

          {!loading &&
            !error &&
            topRepos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
        </div>

        {/* Contribution heatmap */}
        <ContributionHeatmap />

        {/* Footer link */}
        <div className="mt-8 flex items-center justify-center">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-4 py-2.5 font-mono text-xs text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>github.com/{GITHUB_USERNAME}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </Container>
    </section>
  );
}