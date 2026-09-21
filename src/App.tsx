import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import MiniCTASection from './components/MiniCTASection';
import ConsequencesSection from './components/ConsequencesSection';
import ContactFormSection from './components/ContactFormSection';
import BenefitSystemSection from './components/BenefitSystemSection';
import ImplementationSection from './components/ImplementationSection';
import TrustSection from './components/TrustSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import FooterCTASection from './components/FooterCTASection';

function App() {
  return (
    <div className="min-h-screen bg-[#000022]">
      <NavBar />
      <HeroSection />
      <ProblemSection />
      <MiniCTASection />
      <ConsequencesSection />
      <ContactFormSection />

      {/* Transition Band: Navy to Light Cream */}
      <div
        className="h-[240px] md:h-[320px] lg:h-[400px]"
        style={{
          background: 'linear-gradient(to bottom, #000022 0%, #000022 15%, rgba(0, 0, 34, 0.8) 30%, rgba(0, 0, 34, 0.4) 45%, rgba(0, 0, 34, 0) 55%, rgba(244, 243, 238, 0.4) 70%, rgba(244, 243, 238, 0.8) 85%, #F4F3EE 100%)'
        }}
      />

      {/* Light Mode Sections */}
      <BenefitSystemSection />
      <ImplementationSection />
      <TrustSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterCTASection />
    </div>
  );
}

export default App;
