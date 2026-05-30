/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown,
  Instagram, 
  CheckCircle2,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { 
  SERVICES, 
  DIFFERENTIALS, 
  FAQS, 
  WHATSAPP_LINK,
  WHATSAPP_TEXT,
  INSTAGRAM_LINK,
  INSTAGRAM_TEXT,
  CLINIC_LOCATION,
  CLINIC_HOURS
} from './constants';
import Gallery from './components/Gallery';

// --- Custom SVGs for Services ---
const ServiceIcon = ({ type, className = "w-7 h-7" }: { type: string, className?: string }) => {
  switch (type) {
    case 'lungs-infant':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v10m0 0a3.5 3.5 0 0 0-3.5-3.5h-1a3.5 3.5 0 1 0 0 7h1c1.5 0 2.5-.5 3.5-1.5m0-2a3.5 3.5 0 0 1 3.5-3.5h1a3.5 3.5 0 1 1 0 7h-1c-1.5 0-2.5-.5-3.5-1.5" />
          <circle cx="12" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    case 'spine-infant':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M9 6h6M8 10h8M9 14h6M8 18h8" />
          <circle cx="12" cy="6" r="1.5" fill="currentColor" />
          <circle cx="12" cy="10" r="1.5" fill="currentColor" />
          <circle cx="12" cy="14" r="1.5" fill="currentColor" />
          <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'pulse':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h3l2.5-6.5L12 18l2.5-9.5L17 12h3" />
        </svg>
      );
    case 'joint':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5a5.5 5.5 0 1 0-11 0M5 13a4 4 0 0 0 8 0M12 16a6 6 0 0 0 6-6" />
          <circle cx="11" cy="10" r="2" fill="currentColor" />
        </svg>
      );
    case 'hands':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1-2 2-3 3.5-3s2.5 1 2.5 2.5c0 3-4 6.5-6 7.5-2-1-6-4.5-6-7.5C6 9 7 8 8.5 8s2.5 1 3.5 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16M7 21h10" />
        </svg>
      );
    case 'lungs':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m-2-9a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v4a5 5 0 0 0 5 5h3m2-9a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v4a5 5 0 0 1-5 5h-3" />
        </svg>
      );
    default:
      return null;
  }
};

// --- Custom SVGs for Differentials ---
const DiffIcon = ({ type, className = "w-6 h-6 text-brand-dourado" }: { type: string, className?: string }) => {
  switch (type) {
    case 'user':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      );
    case 'map':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75h6m-6 3h6m-3 5.25v2.25M12 3c4.142 0 7.5 3.358 7.5 7.5a7.48 7.48 0 0 1-2.122 5.303l-4.743 4.744a.9.9 0 0 1-1.27 0l-4.743-4.744s0 0 0 0A7.48 7.48 0 0 1 4.5 10.5C4.5 6.358 7.858 3 12 3z" />
        </svg>
      );
    case 'baby':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM6 14.25c0-1.8 1.6-3.25 3.5-3.25h5c1.9 0 3.5 1.45 3.5 3.25V17a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3v-2.75z" />
          <circle cx="9.5" cy="6" r="1" fill="currentColor" />
          <circle cx="14.5" cy="6" r="1" fill="currentColor" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3.091 15 8.187 14.187 9 9l.813 5.187L14.909 15l-5.096.904zM19.006 5.005L18.5 8l-.506-2.995L15 4.5l2.994-.505L18.5 1l.506 2.995L22 4.5l-2.994.505zM17.004 14.004l-.253 1.498-.253-1.498L15 13.25l1.498-.253.253-1.498.253 1.498L19 13.25l-1.996.754z" />
        </svg>
      );
    default:
      return null;
  }
};

// --- Header Component ---
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Perguntas Frequentes', href: '#faq' },
    { label: 'Contato', href: '#contato' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-branco/90 backdrop-blur-md shadow-sm border-b border-brand-creme/50 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        {/* Brand Logo */}
        <a href="#inicio" className="flex items-center gap-3 group leading-none focus:outline-none">
          <img 
            src="https://res.cloudinary.com/dxpwgum9x/image/upload/v1780162705/side-view-doctor-using-adipometer_znirom.png" 
            alt="Logo Daiane Palhano" 
            className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-display font-semibold text-lg md:text-xl tracking-[0.05em] text-brand-verde-escuro group-hover:text-brand-verde transition-colors">
              Daiane Palhano
            </span>
            <span className="text-[8px] uppercase tracking-[0.22em] font-sans font-semibold text-brand-dourado mt-0.5">
              Fisioterapia e Osteopatia
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-9" aria-label="Navegação Principal">
          {menuItems.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="text-[14px] font-sans font-semibold text-brand-texto/80 hover:text-brand-verde transition-colors relative duration-200"
            >
              {item.label}
            </a>
          ))}
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-verde hover:bg-brand-verde-escuro text-brand-branco px-6 py-3 rounded-full text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.978L2 22l5.133-1.343a9.893 9.893 0 0 0 4.877 1.28h.005c5.507 0 9.99-4.478 9.991-9.984C22.007 6.478 17.519 2 12.012 2zm5.845 14.18c-.24.675-1.385 1.282-1.9 1.377-.465.085-1.07.155-1.72-.055-1.125-.365-2.585-1.145-3.69-2.095a12.181 12.181 0 0 1-2.92-3.8c-.37-.625-.795-1.545-.795-2.285 0-.825.435-1.23.59-1.39.155-.16.34-.2.45-.2h.325c.105 0 .25.015.385.34l.87 2.1c.07.165.115.355.005.57-.11.215-.225.46-.385.64-.15.17-.325.355-.165.63.465.795 1.05 1.45 1.77 2.085.93.815 1.75 1.255 2.455 1.57.26.115.52.09.715-.125.265-.29.83-.965 1.05-1.3.22-.335.5-.275.82-.155l2.09 1.025c.32.16.53.24.61.375.08.135.08.78-.16 1.455z"/>
            </svg>
            Agendar pelo WhatsApp
          </a>
        </nav>

        {/* Hamburger Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-brand-verde-escuro hover:text-brand-verde focus:outline-none"
          aria-label="Abrir Menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-brand-branco shadow-xl border-t border-brand-creme lg:hidden overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {menuItems.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-sans font-semibold text-brand-texto/90 hover:text-brand-verde py-1 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 flex items-center justify-center gap-3 bg-brand-verde hover:bg-brand-verde-escuro text-brand-branco py-4 rounded-xl text-center font-bold tracking-wide"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.978L2 22l5.133-1.343a9.893 9.893 0 0 0 4.877 1.28h.005c5.507 0 9.99-4.478 9.991-9.984C22.007 6.478 17.519 2 12.012 2zm5.845 14.18c-.24.675-1.385 1.282-1.9 1.377-.465.085-1.07.155-1.72-.055-1.125-.365-2.585-1.145-3.69-2.095a12.181 12.181 0 0 1-2.92-3.8c-.37-.625-.795-1.545-.795-2.285 0-.825.435-1.23.59-1.39.155-.16.34-.2.45-.2h.325c.105 0 .25.015.385.34l.87 2.1c.07.165.115.355.005.57-.11.215-.225.46-.385.64-.15.17-.325.355-.165.63.465.795 1.05 1.45 1.77 2.085.93.815 1.75 1.255 2.455 1.57.26.115.52.09.715-.125.265-.29.83-.965 1.05-1.3.22-.335.5-.275.82-.155l2.09 1.025c.32.16.53.24.61.375.08.135.08.78-.16 1.455z"/>
                </svg>
                Agendar pelo WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <section id="inicio" className="relative pt-32 pb-24 md:pt-44 md:pb-36 bg-brand-creme bg-noise overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.25em] font-bold text-brand-dourado mb-5 inline-block"
            >
              Cuidado individualizado. Resultados que transformam.
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-brand-texto-suave leading-[1.12] tracking-wide text-balance mb-6"
            >
              Fisioterapia que respeita o seu <span className="text-brand-verde-escuro font-normal italic">tempo</span> e o seu <span className="text-brand-verde-escuro font-normal italic">corpo</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base md:text-lg text-brand-texto-suave font-light leading-relaxed mb-10 max-w-xl text-balance"
            >
              Atendimento especializado para bebês, crianças e adultos. Sem pressa. Sem convênio. Com resultado focado integralmente na sua reabilitação e harmonia funcional.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-verde hover:bg-brand-verde-escuro text-brand-branco text-center px-8 py-4 rounded-xl font-semibold tracking-wide shadow-md hover:shadow-xl transition-all duration-300"
              >
                Quero agendar uma consulta
              </a>
              <a 
                href="#servicos"
                className="border border-brand-dourado text-brand-dourado hover:bg-brand-dourado hover:text-brand-branco text-center px-8 py-4 rounded-xl font-semibold tracking-wide transition-all duration-300"
              >
                Conheça os serviços
              </a>
            </motion.div>
          </div>

          {/* Aesthetic Professional Image */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-tr from-brand-verde-escuro/30 to-brand-dourado/30 p-[1px]"
            >
              <div className="w-full h-full bg-brand-creme rounded-[2.5rem] overflow-hidden relative group">
                <img 
                  src="https://res.cloudinary.com/dxpwgum9x/image/upload/v1780159780/main-sample.jpg" 
                  alt="Dra. Daiane Palhano" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating minimal glass card */}
                <div className="absolute bottom-6 left-6 right-6 bg-brand-branco/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/30 shadow-lg text-center">
                  <h3 className="font-display text-lg font-medium text-brand-verde-escuro tracking-wide">
                    Dra. Daiane Palhano
                  </h3>
                  <p className="text-[10px] text-brand-dourado uppercase tracking-[0.2em] font-semibold mt-1">
                    Fisioterapeuta & Osteopata
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Services Component ---
const Services = () => {
  return (
    <section id="servicos" className="py-24 bg-brand-branco transition-opacity duration-700">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-dourado mb-3 inline-block">
            Especialidades
          </span>
          <h2 className="font-display font-light text-3xl md:text-5xl text-brand-verde-escuro mb-5">
            Cada atendimento é pensado para você — individualmente.
          </h2>
          <div className="w-12 h-[1px] bg-brand-dourado mx-auto" />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv, index) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-brand-creme/30 p-8 rounded-[2rem] border border-brand-creme flex flex-col justify-between hover:shadow-xl hover:border-brand-dourado/20 hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div>
                {/* SVG Icon */}
                <div className="w-14 h-14 rounded-2xl bg-brand-creme flex items-center justify-center text-brand-verde mb-8 group-hover:bg-brand-verde group-hover:text-brand-branco transition-all duration-300">
                  <ServiceIcon type={srv.iconType} />
                </div>
                <h3 className="font-display text-xl font-medium text-brand-verde-escuro mb-4">
                  {srv.title}
                </h3>
                <p className="text-brand-texto-suave text-sm font-light leading-relaxed">
                  {srv.description}
                </p>
              </div>
              
              {/* Gold Accent Underline */}
              <div className="mt-8 pt-4 border-t border-brand-creme flex justify-end">
                <span className="w-10 h-[2px] bg-brand-dourado/30 group-hover:bg-brand-dourado group-hover:w-16 transition-all duration-300 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Differentials Component ---
const Differentials = () => {
  return (
    <section className="py-24 bg-brand-verde-escuro text-brand-branco bg-noise relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-xl mb-16 text-left">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-dourado-claro mb-3 inline-block">
            Por que escolher a Daiane Palhano?
          </span>
          <h2 className="font-display font-light text-3xl md:text-5xl tracking-wide leading-tight text-white">
            Excelência no toque, precisão e acolhimento humano.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {DIFFERENTIALS.map((diff, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-dourado/30 hover:bg-white/10 transition-colors duration-300"
            >
              {/* Icon */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-brand-dourado-claro">
                <DiffIcon type={diff.iconType} />
              </div>
              
              {/* Copy */}
              <div>
                <h3 className="font-display text-lg font-medium text-brand-branco mb-2">
                  {diff.title}
                </h3>
                <p className="text-brand-creme/80 text-sm font-light leading-relaxed">
                  {diff.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// --- About Component ---
const About = () => {
  return (
    <section id="sobre" className="py-24 bg-brand-branco overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Aesthetic Brand Profile Image */}
          <div className="lg:col-span-5 relative w-full flex justify-center order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[400px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl bg-gradient-to-br from-brand-creme via-brand-branco to-brand-dourado/20 p-1.5 flex flex-col justify-between border border-brand-creme"
            >
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative group">
                <img 
                  src="https://res.cloudinary.com/dxpwgum9x/image/upload/v1780159762/Captura_de_tela_2026-05-17_114643_w24t9d.jpg" 
                  alt="Dra. Daiane Palhano - Fisioterapeuta" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-verde-escuro/90 via-brand-verde-escuro/20 to-transparent" />
                
                {/* Overlay details */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 text-brand-branco">
                  <div className="bg-brand-verde-escuro/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white">Fisioterapeuta</span>
                  </div>
                  <div className="bg-brand-verde-escuro/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                    <span className="text-[10px] font-mono text-brand-branco">CREFITO 11/DF</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10 text-brand-branco">
                  <span className="text-xs uppercase tracking-widest font-semibold text-brand-dourado-claro block mb-1">D.P.</span>
                  <p className="font-display text-2xl font-light tracking-wide text-brand-branco animate-fade-in">
                    Daiane Palhano
                  </p>
                  <p className="text-xs text-brand-creme/90 mt-1 font-light">
                    Osteopatia & Saúde Integrativa de Alto Padrão
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* About Copy */}
          <div className="lg:col-span-7 lg:pl-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-dourado mb-3 inline-block">
                Sobre a Daiane
              </span>
              <h2 className="font-display font-light text-3xl md:text-5xl text-brand-verde-escuro mb-8">
                Cuidado que vai além do sintoma.
              </h2>
              
              <div className="font-sans text-brand-texto-suave space-y-6 text-base md:text-lg font-light leading-relaxed">
                <p>
                  Sou fisioterapeuta com formação em Osteopatia, apaixonada por oferecer um cuidado que vai além do sintoma. Atendo em Brasília, na região do Park Way, com foco em atendimento individualizado e de alto padrão — porque acredito que cada paciente merece tempo, atenção e um tratamento pensado especificamente para ele.
                </p>
                <p>
                  Sem atropelos, cada consulta é uma imersão na sua saúde física e de sua família. Buscando atingir a verdadeira harmonia por meio de diagnóstico preciso e intervenção terapêutica refinada.
                </p>
              </div>

              <div className="mt-10">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-verde hover:bg-brand-verde-escuro text-white font-semibold inline-flex items-center gap-3 px-8 py-4 rounded-xl shadow-md hover:shadow-xl transition-all"
                >
                  Agendar pelo WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- FAQ Component ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-brand-creme bg-noise">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-dourado mb-3 inline-block">
            Suas Dúvidas
          </span>
          <h2 className="font-display font-light text-3xl md:text-5xl text-brand-verde-escuro">
            Perguntas Frequentes
          </h2>
          <div className="w-12 h-[1px] bg-brand-dourado mx-auto mt-5" />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-brand-branco rounded-2xl overflow-hidden border border-brand-creme shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-8 py-6 flex justify-between items-center gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-medium text-brand-verde-escuro">
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full bg-brand-creme flex items-center justify-center text-brand-verde transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-6 text-brand-texto-suave text-sm md:text-base font-light font-sans leading-relaxed border-t border-brand-creme/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// --- CTA Section ---
const CTAFinal = () => {
  return (
    <section className="py-24 bg-brand-branco relative overflow-hidden">
      {/* Background Soft Gold / Cream Radial Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-creme via-brand-branco to-brand-creme opacity-75" />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-brand-creme to-[#ece4d6] border border-brand-dourado/20 rounded-[3rem] p-12 md:p-20 shadow-xl"
        >
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-verde-escuro mb-5 inline-block">
            Atendimento de alta qualidade
          </span>
          
          <h2 className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-brand-verde-escuro mb-8 text-balance">
            Pronta para cuidar de você.
          </h2>
          
          <p className="text-brand-texto-suave font-light text-lg mb-12 max-w-xl mx-auto leading-relaxed text-balance">
            Atendimento de segunda a sexta, das 8h às 18h. Consultório reservado com ampla tranquilidade na Região do Park Way, Brasília.
          </p>
          
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-verde hover:bg-brand-verde-escuro text-white px-10 py-5 rounded-full font-semibold text-lg md:text-xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Falar no WhatsApp agora
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="contato" className="bg-brand-verde-escuro text-brand-branco bg-noise pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 leading-none mb-6 font-semibold">
              <img 
                src="https://res.cloudinary.com/dxpwgum9x/image/upload/v1780162705/side-view-doctor-using-adipometer_znirom.png" 
                alt="Logo Daiane Palhano" 
                className="w-20 h-20 object-contain transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-display font-semibold text-xl tracking-[0.05em] text-white">
                  Daiane Palhano
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] font-sans font-semibold text-brand-dourado-claro mt-0.5">
                  Fisioterapia e Osteopatia
                </span>
              </div>
            </div>
            <p className="text-brand-creme/70 text-sm font-light leading-relaxed max-w-md">
              Oferecendo um toque acolhedor de alto padrão, sem convênios e inteiramente focado na recuperação real e fisiologia sistêmica de cada etapa da sua vida.
            </p>
          </div>

          {/* Links Quick Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-brand-dourado-claro mb-6">
              Menu
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              {['Servicos', 'Sobre', 'Perguntas Frequentes', 'Contato'].map((item) => {
                const label = item === 'Perguntas Frequentes' ? 'Perguntas Frequentes' : item;
                const id = item === 'Perguntas Frequentes' ? 'faq' : item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return (
                  <li key={item}>
                    <a href={`#${id}`} className="text-brand-creme/80 hover:text-brand-dourado-claro transition-colors inline-flex items-center gap-1.5">
                      <ChevronRight size={14} className="text-brand-dourado/40" /> {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contacts */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-brand-dourado-claro mb-6">
              Contato & Mídias
            </h4>
            <ul className="space-y-4 text-sm font-light text-brand-creme/90">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center text-brand-dourado-claro">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                  </svg>
                </span>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-brand-dourado-claro transition-colors font-semibold">
                  {INSTAGRAM_TEXT}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 flex items-center justify-center text-brand-dourado-claro">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.978L2 22l5.133-1.343a9.893 9.893 0 0 0 4.877 1.28h.005c5.507 0 9.99-4.478 9.991-9.984C22.007 6.478 17.519 2 12.012 2zm5.845 14.18c-.24.675-1.385 1.282-1.9 1.377-.465.085-1.07.155-1.72-.055-1.125-.365-2.585-1.145-3.69-2.095a12.181 12.181 0 0 1-2.92-3.8c-.37-.625-.795-1.545-.795-2.285 0-.825.435-1.23.59-1.39.155-.16.34-.2.45-.2h.325c.105 0 .25.015.385.34l.87 2.1c.07.165.115.355.005.57-.11.215-.225.46-.385.64-.15.17-.325.355-.165.63.465.795 1.05 1.45 1.77 2.085.93.815 1.75 1.255 2.455 1.57.26.115.52.09.715-.125.265-.29.83-.965 1.05-1.3.22-.335.5-.275.82-.155l2.09 1.025c.32.16.53.24.61.375.08.135.08.78-.16 1.455z"/>
                  </svg>
                </span>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-brand-dourado-claro transition-colors font-semibold">
                  {WHATSAPP_TEXT}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 flex items-center justify-center text-brand-dourado-claro shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <span>{CLINIC_LOCATION}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 flex items-center justify-center text-brand-dourado-claro shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </span>
                <span>{CLINIC_HOURS}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-creme/60">
            &copy; 2025 Daiane Palhano Fisioterapia. Todos os direitos reservados.
          </p>
          <div className="flex gap-1.5 items-center text-[10px] text-brand-creme/40 uppercase tracking-[0.1em]">
            <Lock size={10} /> Consultório Particular de Alto Padrão
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Floating WhatsApp Button ---
const FloatingWhatsApp = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25d366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none"
      aria-label="Falar com Daiane Palhano no WhatsApp"
    >
      <span className="absolute right-full mr-3 bg-brand-branco text-brand-verde-escuro font-sans font-bold text-xs px-3 py-1.5 rounded-lg border border-brand-creme shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 uppercase tracking-wider transition-opacity duration-300 hidden md:inline-block pointer-events-none">
        Agendar Consulta
      </span>
      {/* Pulse dynamic animation */}
      <span className="absolute inset-0 rounded-full bg-[#25d366]/30 animate-ping -z-10" />
      
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.978L2 22l5.133-1.343a9.893 9.893 0 0 0 4.877 1.28h.005c5.507 0 9.99-4.478 9.991-9.984C22.007 6.478 17.519 2 12.012 2zm5.845 14.18c-.24.675-1.385 1.282-1.9 1.377-.465.085-1.07.155-1.72-.055-1.125-.365-2.585-1.145-3.69-2.095a12.181 12.181 0 0 1-2.92-3.8c-.37-.625-.795-1.545-.795-2.285 0-.825.435-1.23.59-1.39.155-.16.34-.2.45-.2h.325c.105 0 .25.015.385.34l.87 2.1c.07.165.115.355.005.57-.11.215-.225.46-.385.64-.15.17-.325.355-.165.63.465.795 1.05 1.45 1.77 2.085.93.815 1.75 1.255 2.455 1.57.26.115.52.09.715-.125.265-.29.83-.965 1.05-1.3.22-.335.5-.275.82-.155l2.09 1.025c.32.16.53.24.61.375.08.135.08.78-.16 1.455z"/>
      </svg>
    </a>
  );
};

// --- Main App Entry ---
export default function App() {
  return (
    <div className="min-h-screen font-sans bg-brand-branco text-brand-texto antialiased selection:bg-brand-verde/20 selection:text-brand-verde-escuro">
      <Header />
      <main>
        <Hero />
        <Services />
        <Differentials />
        <About />
        <Gallery />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
