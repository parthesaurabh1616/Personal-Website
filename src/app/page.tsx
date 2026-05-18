import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { ExperienceSection } from '@/components/sections/Experience';
import { TechStack } from '@/components/sections/TechStack';
import { Metrics } from '@/components/sections/Metrics';
import { Research } from '@/components/sections/Research';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <Navbar />
      <Hero />
      <FeaturedProjects />
      <ExperienceSection />
      <TechStack />
      <Metrics />
      <Research />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
