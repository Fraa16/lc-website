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

function App() {
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
