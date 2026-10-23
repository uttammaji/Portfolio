import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';
import { blogPosts } from '@/data/blog';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Writing() {
  return (
    <section id="writing" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          index="06"
          label="WRITING"
          terminal="ls ./blog"
          title="Articles and notes."
          description="Writing about the things I learn — real-time systems, databases, APIs, and React performance."
        />

        <div className="space-y-2">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group flex items-center justify-between gap-4 p-5 border border-border rounded-xl bg-card hover:border-accent/30 transition-all"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-xs text-accent">{post.category}</span>
                    <span className="font-mono text-xs text-muted">{formatDate(post.date)}</span>
                    <span className="font-mono text-xs text-muted">{post.readingTime}</span>
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                </div>
                <ArrowRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
