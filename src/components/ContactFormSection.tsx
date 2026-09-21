import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

export default function ContactFormSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    firma: '',
    mitarbeiteranzahl: ''
  });

  const [errors, setErrors] = useState({
    vorname: '',
    nachname: '',
    email: '',
    firma: ''
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
      vorname: '',
      nachname: '',
      email: '',
      firma: ''
    };

    if (!formData.vorname.trim()) {
      newErrors.vorname = 'Vorname ist erforderlich';
    }
    if (!formData.nachname.trim()) {
      newErrors.nachname = 'Nachname ist erforderlich';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail ein';
    }
    if (!formData.firma.trim()) {
      newErrors.firma = 'Firma ist erforderlich';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            vorname: formData.vorname,
            nachname: formData.nachname,
            email: formData.email,
            telefon: formData.telefon || null,
            firma: formData.firma,
            mitarbeiteranzahl: formData.mitarbeiteranzahl || null
          }
        ]);

      if (error) throw error;

      setSubmitSuccess(true);
      setFormData({
        vorname: '',
        nachname: '',
        email: '',
        telefon: '',
        firma: '',
        mitarbeiteranzahl: ''
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

  return (
    <section
      ref={sectionRef}
      id="contact-form-section"
      className="bg-[#000022] py-16 md:py-20"
    >
      <div className="mx-auto max-w-[650px] px-6 sm:px-10">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative p-6 sm:p-8 lg:p-10">
            <h1 className="text-4xl sm:text-5xl lg:text-3xl xl:text-4xl font-bold leading-[1.1] text-[#F4F3EE] text-center mb-2">
              Jetzt kostenlose Benefit-Analyse vereinbaren
            </h1>

            <p className="text-sm sm:text-base text-[#F4F3EE]/70 text-center mb-8">
              Wir kontaktieren Sie innerhalb von 24 Stunden
            </p>

            {submitSuccess && (
              <div className="mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-center text-sm">
                Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="vorname" className="block text-xs font-medium text-[#F4F3EE] mb-1.5">
                    Vorname<span className="text-[#DCC383]">*</span>
                  </label>
                  <input
                    type="text"
                    id="vorname"
                    name="vorname"
                    value={formData.vorname}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 bg-[#DCC383] text-[#000022] placeholder-[#000022]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B68F40] transition-all text-sm ${
                      errors.vorname ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="Max"
                  />
                  {errors.vorname && (
                    <p className="mt-1 text-xs text-red-400">{errors.vorname}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="nachname" className="block text-xs font-medium text-[#F4F3EE] mb-1.5">
                    Nachname<span className="text-[#DCC383]">*</span>
                  </label>
                  <input
                    type="text"
                    id="nachname"
                    name="nachname"
                    value={formData.nachname}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 bg-[#DCC383] text-[#000022] placeholder-[#000022]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B68F40] transition-all text-sm ${
                      errors.nachname ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="Mustermann"
                  />
                  {errors.nachname && (
                    <p className="mt-1 text-xs text-red-400">{errors.nachname}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-[#F4F3EE] mb-1.5">
                    E-Mail Adresse<span className="text-[#DCC383]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 bg-[#DCC383] text-[#000022] placeholder-[#000022]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B68F40] transition-all text-sm ${
                      errors.email ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="max.mustermann@firma.de"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefon" className="block text-xs font-medium text-[#F4F3EE] mb-1.5">
                    Telefonnummer
                  </label>
                  <input
                    type="tel"
                    id="telefon"
                    name="telefon"
                    value={formData.telefon}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-[#DCC383] text-[#000022] placeholder-[#000022]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B68F40] transition-all text-sm"
                    placeholder="+49 123 456789"
                  />
                </div>

                <div>
                  <label htmlFor="firma" className="block text-xs font-medium text-[#F4F3EE] mb-1.5">
                    Firma<span className="text-[#DCC383]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firma"
                    name="firma"
                    value={formData.firma}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 bg-[#DCC383] text-[#000022] placeholder-[#000022]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B68F40] transition-all text-sm ${
                      errors.firma ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="Muster GmbH"
                  />
                  {errors.firma && (
                    <p className="mt-1 text-xs text-red-400">{errors.firma}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="mitarbeiteranzahl" className="block text-xs font-medium text-[#F4F3EE] mb-1.5">
                    Mitarbeiteranzahl
                  </label>
                  <select
                    id="mitarbeiteranzahl"
                    name="mitarbeiteranzahl"
                    value={formData.mitarbeiteranzahl}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-[#DCC383] text-[#000022] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B68F40] transition-all text-sm"
                  >
                    <option value="">Bitte auswählen</option>
                    <option value="1-3">1-3</option>
                    <option value="3-10">3-10</option>
                    <option value="10-25">10-25</option>
                    <option value="25-50">25-50</option>
                    <option value="50+">50+</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#B68F40] to-[#DCC383] text-[#000022] font-semibold text-base rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-[#B68F40]/40 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-[#B68F40]/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg mt-6"
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 ease-out pointer-events-none" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                <span className="relative z-10 transition-all duration-300 ease-out group-hover:tracking-wide pointer-events-none">
                  {isSubmitting ? 'Wird gesendet...' : 'Jetzt kostenlose Analyse anfragen'}
                </span>
              </button>

              <p className="text-xs text-[#F4F3EE]/50 text-center pt-2">
                Mit dem Absenden akzeptieren Sie unsere Datenschutzbestimmungen
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
