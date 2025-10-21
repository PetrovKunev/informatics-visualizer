import '@/app/(shared)/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Toaster } from '@/components/common/toaster';
import { ThemeProvider } from '@/components/common/theme-provider';

const inter = Inter({
  subsets: ['latin', 'cyrillic'], // важно за BG текст
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'CS Visual Lab – Интерактивно обучение по информатика',
  description:
    'CS Visual Lab е интерактивна платформа за визуализиране и усвояване на основни концепции от програмирането и структурите от данни.',
  metadataBase: new URL('https://cs-visual-lab.vercel.app'),
  openGraph: {
    title: 'CS Visual Lab',
    description:
      'Интерактивни визуализации за условни оператори, цикли, структури от данни и алгоритми.',
    type: 'website',
    locale: 'bg_BG',
    url: 'https://cs-visual-lab.vercel.app',
  },
  other: {
    'x-robots-tag': 'all',
  },
};

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={inter.variable}>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        {/* Клиентски провайдъри и UI могат да се използват вътре в server layout */}
        <ThemeProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
