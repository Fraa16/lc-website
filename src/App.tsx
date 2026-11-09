import { useEffect } from 'react';
import AboutSection from './components/AboutSection';
import BenefitSystemSection from './components/BenefitSystemSection';
import BookingSection from './components/BookingSection';
import ComparisonSection from './components/ComparisonSection';
import FAQSection from './components/FAQSection';
import FiguresStrip from './components/FiguresStrip';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ImplementationSection from './components/ImplementationSection';
import NavBar from './components/NavBar';
import ProblemSection from './components/ProblemSection';
import SavingsCalculator from './components/SavingsCalculator';
import TestimonialsSection from './components/TestimonialsSection';
import { scrollToSection, type SectionId } from './lib/scroll';

function App() {
  // Arriving from /impressum via a nav link (/#termin etc.): jump to that section
  // once it is rendered; the browser's own hash scroll runs before React mounts.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id && document.getElementById(id)) {
      requestAnimationFrame(() => scrollToSection(id as SectionId));
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-cream text-navy">
      <NavBar />
      <main>
        <HeroSection />
        <FiguresStrip />
        <ProblemSection />
        <ComparisonSection />
        <BenefitSystemSection />
        <SavingsCalculator />
        <ImplementationSection />
        <AboutSection />
        <TestimonialsSection />
        <FAQSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
