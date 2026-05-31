/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

const GALLERY_PHOTOS = [
  {
    src: "https://res.cloudinary.com/dxpwgum9x/image/upload/v1780159731/ecofisio_tgrdq6.jpg",
    alt: "Atendimento de Osteopatia Clínico",
    title: "Osteopatia & Alívio de Dores",
    subtitle: "Diagnóstico preciso e técnicas manuais direcionadas à causa da dor."
  },
  {
    src: "https://res.cloudinary.com/dxpwgum9x/image/upload/v1780159742/ecofisio_v7qm51.jpg",
    alt: "Sessão de Reabilitação Integrativa",
    title: "Acompanhamento Individualizado",
    subtitle: "Exercícios terapêuticos e mobilizações articulares com foco na sua evolução."
  },
  {
    src: "https://res.cloudinary.com/dxpwgum9x/image/upload/v1780159751/front-view-osteopathic-therapist-checking-female-patient-s-shoulder-joint_vxnlrx.jpg",
    alt: "Fisioterapia Ortopédica e Articular",
    title: "Fisioterapia Ortopédica",
    subtitle: "Restauração da mobilidade e fortalecimento para retomar suas atividades cotidianas."
  },
  {
    src: "https://res.cloudinary.com/dxpwgum9x/image/upload/v1780159762/Captura_de_tela_2026-05-17_114643_w24t9d.jpg",
    alt: "Tratamento Manual Personalizado",
    title: "Sessão de Fisioterapia Individual",
    subtitle: "Atendimento humanizado focado em devolver qualidade de vida e movimento livre."
  }
];

// Duplicating photos for a perfect seamless loop in horizontal marquee scrolling
const MARQUEE_ITEMS = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS, ...GALLERY_PHOTOS];

export default function Gallery() {
  return (
    <section id="galeria" className="py-24 bg-brand-creme/50 overflow-hidden border-t border-brand-creme relative">
      {/* Absolute subtle background lights */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-brand-verde/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-brand-dourado/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl mb-16 relative z-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-dourado mb-3 inline-block">
              Sessões Reais
            </span>
            <h2 className="font-display font-light text-3xl md:text-5xl text-brand-verde-escuro tracking-wide leading-tight">
              O Cuidado em Detalhes
            </h2>
            <div className="w-12 h-[1px] bg-brand-dourado mt-5 hidden md:block" />
          </div>
          <p className="text-brand-texto-suave text-sm md:text-base font-light max-w-xl md:mb-1 leading-relaxed">
            Veja como realizo cada um dos meus atendimentos terapêuticos. Um consultório privativo focado em entregar silêncio, atenção individual de alto padrão e extremo acolhimento.
          </p>
        </div>
      </div>

      {/* Modern Infinite Horizontal Marquee Roller */}
      <div className="relative w-full flex overflow-x-hidden py-4 select-none">
        
        {/* Rolling Track */}
        <div className="flex gap-6 shrink-0 animate-marquee hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
          {MARQUEE_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex-none w-[290px] md:w-[380px] bg-brand-branco rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl border border-brand-creme/60 transition-all duration-500 group relative"
              whileHover={{ y: -6 }}
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-creme">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle dark tint to improve contrast for labels */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-verde-escuro/90 via-brand-verde-escuro/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Text Card Details */}
              <div className="p-6 md:p-8 bg-brand-branco border-t border-brand-creme/40 transition-colors duration-300 group-hover:bg-brand-verde-escuro relative">
                <span className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-brand-dourado group-hover:text-brand-dourado-claro block mb-2 transition-colors duration-300">
                  Sessão Particular
                </span>
                <h3 className="font-display text-lg md:text-xl font-medium text-brand-verde-escuro group-hover:text-brand-branco mb-2 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-brand-texto-suave group-hover:text-brand-creme/90 text-xs md:text-sm font-light leading-relaxed transition-colors duration-300 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
