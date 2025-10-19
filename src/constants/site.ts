export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'CS Visual Lab';

export const SITE_LINKS = [
  {
    href: '/(modules)/conditionals',
    label: 'Условия'
  },
  {
    href: '/(modules)/loops',
    label: 'Цикли'
  },
  {
    href: '/(modules)/data-structures',
    label: 'Структури от данни'
  },
  {
    href: '/(modules)/algorithms',
    label: 'Алгоритми'
  }
] as const;

export const FOOTER_DISCLAIMER =
  'CS Visual Lab е обучителен инструмент. Визуализациите са опростени и не заместват детайлно академично обучение.';
