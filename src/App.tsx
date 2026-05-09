/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Instagram, 
  Clock,
  ArrowRight,
  MessageCircle,
  Quote,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { 
  SERVICES, 
  DIFFERENTIALS, 
  WHO_IS_IT_FOR, 
  TESTIMONIALS, 
  WHATSAPP_LINK 
} from './constants';

// --- Header Component ---
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Tratamentos', href: '#tratamentos' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#inicio" className="flex items-center gap-2 group">
          <div className="flex flex-col leading-none">
            <span className={`font-display font-bold transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'} text-brand-dark`}>
              ECO<span className="text-brand-medium">FISIO</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 group-hover:text-brand-medium transition-colors">
              Pilates & Fisioterapia
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium hover:text-brand-medium transition-colors ${
                isScrolled ? 'text-slate-700' : 'text-slate-800'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-brand-dark text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-medium transition-all shadow-md active:scale-95"
          >
            Agendar Avaliação
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-700 hover:text-brand-medium"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full bg-brand-dark text-white py-4 rounded-xl text-center font-bold text-lg"
              >
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
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-50">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-light/30 rounded-l-full -z-10 blur-3xl opacity-50" />
      
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-brand-light text-brand-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Activity size={14} /> Fisioterapia de Alta Performance
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-slate-900 leading-[1.1] mb-6 text-balance">
            Fisioterapia especializada para <span className="text-brand-medium italic">recuperar seu movimento</span> e melhor qualidade de vida
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
            Atendimento humanizado, avaliação individual e tratamentos personalizados para dores, lesões e reabilitação física constante.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-brand-dark text-white rounded-full font-semibold hover:bg-brand-medium transition-all shadow-lg flex items-center gap-2 group hover:gap-4"
            >
              Agendar avaliação <ArrowRight size={20} />
            </a>
            <a 
              href="#tratamentos"
              className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-sm"
            >
              Conhecer tratamentos
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-4 md:gap-6">
            {['Profissionais qualificados', 'Reabilitação segura', 'Atendimento personalizado'].map((item) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (['Profissionais qualificados', 'Reabilitação segura', 'Atendimento personalizado'].indexOf(item) * 0.1) }}
                className="bg-white/80 backdrop-blur-sm p-3 px-4 rounded-xl border border-slate-100 shadow-sm text-sm font-medium text-slate-700 flex items-center gap-2"
              >
                <CheckCircle2 size={16} className="text-brand-accent" /> {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white aspect-[4/3]">
            <img 
              src="https://res.cloudinary.com/dxpwgum9x/image/upload/v1778343071/front-view-osteopathic-therapist-checking-female-patient-s-shoulder-joint_vxnlrx.jpg" 
              alt="Fisioterapia profissional" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-medium rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-accent rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

// --- About Section ---
const About = () => {
  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="order-2 md:order-1"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl">
              <img 
                src="https://res.cloudinary.com/dxpwgum9x/image/upload/v1778343110/side-view-doctor-using-adipometer_znirom.jpg" 
                alt="Avaliação detalhada" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-sm font-bold text-brand-medium uppercase tracking-[0.2em] mb-4">O Nosso Studio</h2>
            <h3 className="text-3xl md:text-5xl font-display font-medium text-slate-900 mb-8 leading-tight">
              Atendimento individualizado focado na sua <span className="italic">recuperação real</span>
            </h3>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                O Studio de Fisioterapia nasceu com o propósito de oferecer um atendimento individualizado, humanizado e baseado nas necessidades reais de cada paciente.
              </p>
              <p>
                Aqui, cada tratamento é planejado com cuidado para promover recuperação, alívio da dor, prevenção de lesões e melhora da qualidade de vida. Nossos especialistas utilizam técnicas modernas em um ambiente projetado para o seu conforto e bem-estar.
              </p>
            </div>
            <div className="mt-10 pt-10 border-t border-slate-100 grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-display font-bold text-brand-dark">+1000</p>
                <p className="text-sm text-slate-500 uppercase tracking-wide">Pacientes Atendidos</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-brand-dark">100%</p>
                <p className="text-sm text-slate-500 uppercase tracking-wide">Planos Personalizados</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Services Component ---
const Services = () => {
  return (
    <section id="tratamentos" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-brand-medium uppercase tracking-[0.2em] mb-4">Tratamentos</h2>
          <h3 className="text-3xl md:text-5xl font-display font-medium text-slate-900 mb-6">Como podemos te ajudar?</h3>
          <p className="text-slate-600 text-lg">Oferecemos uma gama completa de serviços para garantir que você recupere sua saúde física e bem-estar.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 bg-brand-light text-brand-dark rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-medium group-hover:text-white transition-colors">
                <service.icon size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Differentials & "For Whom" ---
const Highlights = () => {
  return (
    <section id="diferenciais" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Differentials */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-brand-medium uppercase tracking-[0.2em] mb-4 text-center lg:text-left">Diferenciais</h2>
            <h3 className="text-3xl md:text-4xl font-display font-medium text-slate-900 mb-10 text-center lg:text-left">O que nos torna únicos</h3>
            <div className="grid gap-4">
              {DIFFERENTIALS.map((diff, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:border-brand-light hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-brand-accent/20 text-brand-accent flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-lg text-slate-700 font-medium">{diff}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* For Whom */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-brand-dark/5 p-8 md:p-12 rounded-[2.5rem]"
          >
            <h2 className="text-sm font-bold text-brand-medium uppercase tracking-[0.2em] mb-4 text-center lg:text-left">Para quem é</h2>
            <h3 className="text-3xl md:text-4xl font-display font-medium text-slate-900 mb-10 text-center lg:text-left">Ideal para você que busca</h3>
            <div className="space-y-6">
              {WHO_IS_IT_FOR.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-brand-medium shrink-0" />
                  <span className="text-lg text-slate-600 leading-tight">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 bg-brand-dark text-white py-5 rounded-2xl font-bold hover:bg-slate-900 transition-colors"
              >
                Solicitar avaliação personalizada
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Authority Section ---
const Authority = () => {
  return (
    <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-5xl font-display font-medium mb-8 leading-tight">
              Atendimento baseado em avaliação, planejamento e acompanhamento contínuo
            </h3>
            <p className="text-xl text-blue-100/80 mb-12 leading-relaxed">
              Não acreditamos em tratamentos genéricos. Cada paciente que entra em nosso studio recebe um plano de recuperação exclusivo, desenvolvido após uma avaliação biomecânica detalhada.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Avaliação', desc: 'Identificação da causa raiz do problema.' },
                { title: 'Planejamento', desc: 'Desenho da melhor estratégia de recuperação.' },
                { title: 'Acompanhamento', desc: 'Monitoramento próximo da sua evolução.' }
              ].map((step, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-left">
                  <div className="text-brand-medium font-bold text-xl mb-2">0{idx + 1}. {step.title}</div>
                  <p className="text-sm text-blue-50/70">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Testimonials Section ---
const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-medium uppercase tracking-[0.2em] mb-4 text-center">Depoimentos</h2>
          <h3 className="text-3xl md:text-4xl font-display font-medium text-slate-900 mb-4 text-center">O que nossos pacientes dizem</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center text-center"
            >
              <Quote className="text-brand-light mb-6" size={40} />
              <p className="text-lg text-slate-600 mb-8 italic">"{t.text}"</p>
              <div className="mt-auto">
                <div className="w-12 h-12 bg-slate-100 rounded-full mx-auto mb-4" />
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-400">Paciente</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CTA Section ---
const CTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-brand-dark to-slate-900 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden"
        >
          {/* Abstract decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">
              Comece hoje sua recuperação com um atendimento profissional e personalizado
            </h2>
            <p className="text-xl text-blue-100/70 mb-10">
              Agende uma avaliação e descubra o melhor caminho para aliviar dores, recuperar movimentos e melhorar sua qualidade de vida.
            </p>
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 bg-brand-medium hover:bg-brand-medium/90 text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl transition-all active:scale-95 group"
            >
              <MessageCircle size={24} className="group-hover:animate-bounce" /> Agendar pelo WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Footer Component ---
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contato" className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex flex-col leading-none mb-8">
              <span className="font-display font-bold text-2xl text-brand-dark">
                ECO<span className="text-brand-medium">FISIO</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                Pilates & Fisioterapia
              </span>
            </div>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Especialistas em transformar vidas através do movimento. Fisioterapia ética, moderna e focada em resultados reais.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-lg">Links Rápidos</h4>
            <ul className="space-y-4">
              {['Início', 'Sobre', 'Tratamentos', 'Diferenciais', 'Contato'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-slate-500 hover:text-brand-medium transition-colors flex items-center gap-2">
                    <ChevronRight size={14} /> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-lg">Contatos</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-500">
                <MapPin className="shrink-0 text-brand-dark" size={20} />
                <span>R. 64, quadra 86 - lote 17 - Jardim Ceu Azul, Valparaíso de Goiás - GO, 72870-064</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500">
                <Phone className="shrink-0 text-brand-dark" size={20} />
                <span>(61) 99654-3586</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500">
                <Clock className="shrink-0 text-brand-dark" size={20} />
                <span>Seg - Sex: 08:00 - 20:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-lg">Localização</h4>
            <div className="rounded-2xl overflow-hidden shadow-sm h-48 bg-slate-200">
              {/* Simple map placeholder or actual iframe if desired */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15332.99!2d-47.98!3d-16.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDA0JzEyLjAiUyA0N8KwNTgnNDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © {currentYear} Ecofisio - Pilates e Fisioterapia. Todos os direitos reservados.
          </p>
          <p className="text-xs text-slate-300">
            Desenvolvido com excelência clínica.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-medium selection:text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Highlights />
        <Authority />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      
      {/* WhatsApp FAB */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all md:hidden animate-bounce"
        aria-label="Agendar WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
