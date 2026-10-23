import { motion } from 'framer-motion';
import About from '@/components/about/About';
import StatusPanel from '@/components/about/StatusPanel';
import Experience from '@/components/experience/Experience';
import EngineeringPrinciples from '@/components/architecture/EngineeringPrinciples';
import Container from '@/components/ui/Container';

export default function AboutPage() {
  return (
    <div className="pt-24">
      <About />
      <StatusPanel />
      <EngineeringPrinciples />
      <Experience />
    </div>
  );
}
