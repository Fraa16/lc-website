import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const FooterCTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefon: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail ein';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const nameParts = formData.name.trim().split(' ');
      const vorname = nameParts[0] || '';
      const nachname = nameParts.slice(1).join(' ') || '';

      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            vorname: vorname,
            nachname: nachname,
            email: formData.email,
            telefon: formData.telefon || null,
            firma: null,
            mitarbeiteranzahl: null,
            source: 'cta_footer_b2b'
          }
        ]);

      if (error) throw error;

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        telefon: ''
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Es gab einen Fehler beim Absenden des Formulars. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCTAClick = () => {
    const footer = document.getElementById('contact-form-section');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <section
      ref={sectionRef}
      id="kontakt"
      className="bg-[#F4F3EE] pt-20 md:pt-24 pb-0 relative"
    >
      <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto relative px-6 md:px-8">

          {/* CTA Card */}
          <div
            className={`transition-all duration-700 relative z-20 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="bg-[#000022] rounded-[28px] md:rounded-[32px] px-6 md:px-10 lg:px-12 py-10 md:py-12 lg:py-12 shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
              <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-start md:items-stretch">

                {/* Left Content */}
                <div className="flex-1 flex flex-col gap-5 md:gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-0.5 bg-[#B68F40]"></div>
                    <span className="text-xs md:text-sm uppercase tracking-wider text-[#DCC383] font-medium">
                      Jetzt beraten lassen
                    </span>
                  </div>

                  <h2 className="text-white text-3xl md:text-4xl font-semibold leading-tight md:leading-[1.05] max-w-xl">
                    Starten Sie jetzt Ihr funktionierendes Benefit-System.
                  </h2>

                  <p className="text-white/70 text-base md:text-lg max-w-xl">
                    Wir zeigen Ihnen, wie wir Ihre Benefits so strukturieren, dass sie messbar wirken – für Mitarbeitende, HR und Geschäftsführung.
                  </p>

                  <button
                    onClick={handleCTAClick}
                    className="bg-gradient-to-r from-[#B68F40] to-[#DCC383] text-[#000022] font-semibold px-6 py-3 rounded-xl hover:scale-[1.02] transition-all duration-300 w-full md:w-auto shadow-[0_6px_20px_rgba(182,143,64,0.35)]"
                  >
                    Jetzt Benefit-Analyse anfragen
                  </button>
                </div>

                {/* Right Form */}
                <div className="w-full md:w-[360px] lg:w-[380px] bg-white/5 rounded-2xl p-4 md:p-5 lg:p-6 flex flex-col gap-4">
                  <h3 className="text-white font-semibold text-lg">Schnellkontakt</h3>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ihr Name"
                      required
                      className="bg-white/5 border border-white/10 text-white placeholder:text-white/35 rounded-xl px-4 py-3 focus:border-[#DCC383] focus:ring-1 focus:ring-[#DCC383] outline-none transition-all duration-200"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ihre E-Mail"
                      required
                      className="bg-white/5 border border-white/10 text-white placeholder:text-white/35 rounded-xl px-4 py-3 focus:border-[#DCC383] focus:ring-1 focus:ring-[#DCC383] outline-none transition-all duration-200"
                    />
                    <input
                      type="tel"
                      name="telefon"
                      value={formData.telefon}
                      onChange={handleChange}
                      placeholder="Telefonnummer"
                      className="bg-white/5 border border-white/10 text-white placeholder:text-white/35 rounded-xl px-4 py-3 focus:border-[#DCC383] focus:ring-1 focus:ring-[#DCC383] outline-none transition-all duration-200"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-[#B68F40] to-[#DCC383] text-[#000022] font-medium text-sm px-5 py-3 rounded-lg hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="m22 2-7 20-4-9-9-4Z"></path>
                        <path d="M22 2 11 13"></path>
                      </svg>
                    </button>
                  </form>

                  {submitSuccess && (
                    <div className="mt-2 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-center text-sm">
                      Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

      </div>

      {/* Footer Content */}
      <div className="bg-[#DFE6F0] rounded-t-[26px] md:rounded-t-[30px] mt-[-120px] md:mt-[-140px] pt-[150px] md:pt-[170px] pb-9 md:pb-10 relative z-10 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1280px] xl:max-w-[1360px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-[#000022] font-semibold text-lg">
                Leibinn Consulting
              </h3>
              <p className="text-[#000022]/60 text-sm">
                Strukturierte Benefit- & Vorsorgekonzepte für Unternehmen
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-[#000022]/65">
              <a href="#datenschutz" className="hover:text-[#000022] transition-colors">
                Datenschutz
              </a>
              <a href="#impressum" className="hover:text-[#000022] transition-colors">
                Impressum
              </a>
            </div>
          </div>
          <div className="mt-7 pt-4 border-t border-[#000022]/10 text-xs text-[#000022]/50">
            © {currentYear} Leibinn Consulting. Alle Rechte vorbehalten.
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterCTASection;
