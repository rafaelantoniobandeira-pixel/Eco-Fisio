/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Stethoscope, 
  Activity, 
  Heart, 
  Zap, 
  Users, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Instagram, 
  Clock 
} from 'lucide-react';

export const WHATSAPP_NUMBER = '5561996543586';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const SERVICES = [
  {
    title: 'Fisioterapia Ortopédica',
    description: 'Tratamento especializado para disfunções musculoesqueléticas e reabilitação pós-traumática.',
    icon: Stethoscope,
  },
  {
    title: 'Reabilitação de Lesões',
    description: 'Protocolos específicos para retorno seguro às atividades diárias e esportivas.',
    icon: Activity,
  },
  {
    title: 'Dores na Coluna',
    description: 'Abordagem clínica para alívio de dores crônicas e agudas na região cervical e lombar.',
    icon: Heart,
  },
  {
    title: 'Fisioterapia Esportiva',
    description: 'Prevenção e tratamento de lesões para atletas amadores e profissionais.',
    icon: Zap,
  },
  {
    title: 'Pilates Clínico',
    description: 'Método focado em fortalecimento, equilíbrio e consciência corporal para reabilitação.',
    icon: Users,
  },
  {
    title: 'Prevenção de Lesões',
    description: 'Programas de exercícios preventivos baseados em avaliação biomecânica.',
    icon: CheckCircle2,
  },
  {
    title: 'Pós-operatório',
    description: 'Acompanhamento cuidadoso para garantir a melhor recuperação após cirurgias.',
    icon: Calendar,
  },
  {
    title: 'Mobilidade e Fortalecimento',
    description: 'Melhora da amplitude de movimento e ganho de força funcional.',
    icon: Activity,
  },
];

export const DIFFERENTIALS = [
  'Atendimento individualizado',
  'Avaliação completa antes do tratamento',
  'Ambiente acolhedor e profissional',
  'Técnicas modernas e seguras',
  'Foco em resultado e bem-estar',
  'Acompanhamento próximo da evolução',
];

export const WHO_IS_IT_FOR = [
  'Pessoas com dores musculares ou articulares',
  'Atletas e praticantes de atividade física',
  'Pacientes em recuperação de cirurgias',
  'Pessoas com dores na coluna',
  'Quem busca melhorar postura e mobilidade',
  'Quem deseja prevenir lesões',
];

export const TESTIMONIALS = [
  {
    name: 'Ricardo Silva',
    text: 'Cheguei com dores constantes na lombar e, após algumas sessões, senti uma grande melhora. O atendimento é nota dez.',
  },
  {
    name: 'Ana Oliveira',
    text: 'Ambiente muito acolhedor e atendimento extremamente profissional. Sinto que realmente cuidam do meu caso.',
  },
  {
    name: 'Carlos Mendes',
    text: 'O tratamento foi personalizado para minha rotina e minhas necessidades. Recomendo fortemente o Studio.',
  },
];
