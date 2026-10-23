import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, AlertCircle, Loader2, Mail, Terminal, ArrowUpRight } from 'lucide-react';
import Container from '@/components/ui/Container';

const EMAIL = 'uttammaji842@gmail.com';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrors({});
    setServerMessage('');

    try {
      // REPLACE WITH YOUR ACTUAL BACKEND URL IN PRODUCTION
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          // Map validation errors from express-validator
          const newErrors = {};
          data.errors.forEach((err) => { newErrors[err.field] = err.message; });
          setErrors(newErrors);
          setStatus('idle');
        } else {
          throw new Error(data.message || 'Failed to send message');
        }
      } else {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      setStatus('error');
      setServerMessage(err.message || 'Network error. Please try again.');
    }
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <Container>
        {/* Header ... (Keep your existing header code) */}

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-3">
             {/* ... Keep your existing email/github/linkedin cards ... */}
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-3 relative border border-border bg-card overflow-hidden"
          >
             {/* ... Keep your existing form header ... */}

            <div className="p-5 space-y-5">
              {/* Name */}
              <div>
                <label className="block font-mono text-xs text-muted mb-2">
                  <span className="text-accent">$</span> name:
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  className={`w-full bg-[#0a0a0a] border ${errors.name ? 'border-red-500/50' : 'border-border focus:border-accent/60'} px-4 py-3 text-sm text-foreground outline-none font-mono`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block font-mono text-xs text-muted mb-2">
                  <span className="text-accent">$</span> email:
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  className={`w-full bg-[#0a0a0a] border ${errors.email ? 'border-red-500/50' : 'border-border focus:border-accent/60'} px-4 py-3 text-sm text-foreground outline-none font-mono`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div>
                <label className="block font-mono text-xs text-muted mb-2">
                  <span className="text-accent">$</span> subject:
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={handleChange('subject')}
                  className={`w-full bg-[#0a0a0a] border ${errors.subject ? 'border-red-500/50' : 'border-border focus:border-accent/60'} px-4 py-3 text-sm text-foreground outline-none font-mono`}
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block font-mono text-xs text-muted mb-2">
                  <span className="text-accent">$</span> message:
                </label>
                <textarea
                  value={form.message}
                  onChange={handleChange('message')}
                  rows={5}
                  className={`w-full bg-[#0a0a0a] border ${errors.message ? 'border-red-500/50' : 'border-border focus:border-accent/60'} px-4 py-3 text-sm text-foreground outline-none font-mono resize-none`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full flex items-center justify-center gap-2 bg-accent text-background font-mono text-sm font-medium py-3 hover:bg-accent/90 transition-colors disabled:opacity-60"
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <span>$ send_message</span>
                      <Send className="w-4 h-4" />
                    </motion.span>
                  )}
                  {status === 'loading' && (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>sending...</span>
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>message sent</span>
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>try again</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Error message */}
              {serverMessage && (
                <p className="text-center font-mono text-xs text-red-400 mt-2">{serverMessage}</p>
              )}
            </div>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}