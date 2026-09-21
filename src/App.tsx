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
import FooterCTASection, { SiteFooter } from './components/FooterCTASection';
import StructuredData from './components/StructuredData';

function App() {
  return (
    <>
      <StructuredData />
      <NavBar />

      {/* One navy ground throughout. Sections alternate between navy-0 and
          navy-1 for rhythm, and lift content onto navy-2 panels — the light
          card inside the contact form is the page's single bright surface. */}
      <main id="hauptinhalt" className="bg-navy">
        <HeroSection />
        <ProblemSection />
        <MiniCTASection />
        <ConsequencesSection />
        <ContactFormSection />
        <BenefitSystemSection />
        <ImplementationSection />
        <TrustSection />
        <TestimonialsSection />
        <FAQSection />
        <FooterCTASection />
      </main>

      <SiteFooter />
    </>
  );
}

export default App;
