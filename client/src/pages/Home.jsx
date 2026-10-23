import Hero from '@/components/hero/Hero';
import ProfilePhoto from '@/components/about/ProfilePhoto';
import About from '@/components/about/About';
import StatusPanel from '@/components/about/StatusPanel';
import Stack from '@/components/skills/Stack';
import Projects from '@/components/projects/Projects';
import ArchitectureDiagram from '@/components/architecture/ArchitectureDiagram';
import EngineeringPrinciples from '@/components/architecture/EngineeringPrinciples';
import Experience from '@/components/experience/Experience';
import Writing from '@/components/blog/Writing';
import BuildLog from '@/components/github/BuildLog';
import GitHubSection from '@/components/github/GitHubSection';
import Contact from '@/components/contact/Contact';
import Terminal from '@/components/terminal/Terminal';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Home() {
  return (
    <>
      <Hero />
      <ProfilePhoto />
      <About />
      <StatusPanel />
      <Stack />
      <Projects />

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            index="04"
            label="TERMINAL"
            terminal="explore uttam"
            title="Try the interactive terminal."
            description="A real, functional terminal. Type commands, explore projects, and discover what I build."
          />
          <div className="max-w-2xl mx-auto">
            <Terminal />
          </div>
        </Container>
      </section>

      <ArchitectureDiagram />
      <EngineeringPrinciples />
      <Experience />
      <Writing />

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            index="07"
            label="BUILD LOG"
            terminal="cat build.log"
            title="Recent activity."
            description="A log of what I've been building, learning, and exploring."
          />
          <div className="max-w-2xl mx-auto">
            <BuildLog />
          </div>
        </Container>
      </section>

      <GitHubSection />
      <Contact />
    </>
  );
}
