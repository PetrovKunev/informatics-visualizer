export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'CS Visual Lab';

export const SITE_LINKS = [
  {
    href: '/conditionals',
    label: 'Условия'
  },
  {
    href: '/loops',
    label: 'Цикли'
  },
  {
    href: '/data-structures',
    label: 'Структури от данни'
  },
  {
    href: '/algorithms',
    label: 'Алгоритми'
  }
] as const;

export const FOOTER_DISCLAIMER =
  'CS Visual Lab е обучителен инструмент. Визуализациите са опростени и не заместват детайлно академично обучение.';
