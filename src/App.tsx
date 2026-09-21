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

      <main id="hauptinhalt" className="bg-navy">
        {/* Dark half — problem and urgency. */}
        <HeroSection />
        <ProblemSection />
        <MiniCTASection />
        <ConsequencesSection />
        <ContactFormSection />

        {/* Navy to cream. Previously a 240–400px empty div whose only job was
            to fade between two colours; at desktop width that is a full
            screen of nothing directly after the primary conversion point. */}
        <div
          aria-hidden="true"
          className="h-[clamp(4rem,9vw,7rem)] bg-gradient-to-b from-navy via-navy/60 to-cream"
        />

        {/* Light half — solution and proof. */}
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
