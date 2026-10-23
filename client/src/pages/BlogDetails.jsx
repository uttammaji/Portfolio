import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import { blogPosts } from '@/data/blog';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function BlogDetails() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <div className="font-mono text-sm text-muted mb-4">404 — Article not found</div>
            <Link to="/blog" className="font-mono text-sm text-accent hover:underline">← Back to blog</Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12">
      <Container size="narrow">
        <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> cd ../blog
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-4 font-mono text-xs">
            <span className="text-accent">{post.category}</span>
            <span className="text-muted">{formatDate(post.date)}</span>
            <span className="text-muted">{post.readingTime}</span>
          </div>
          <h1 className="text-display font-bold mb-8 text-balance">{post.title}</h1>
          <p className="text-lg text-secondary leading-relaxed mb-12">{post.excerpt}</p>

          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-base text-foreground/90 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
