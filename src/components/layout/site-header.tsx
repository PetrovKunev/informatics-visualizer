"use client";

import type { Route } from 'next';
import Link from 'next/link';
import { Menu, Moon, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/components/common/theme-provider';
import { APP_NAME, SITE_LINKS } from '@/constants/site';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="rounded-full bg-brand-100 px-3 py-1 text-sm text-brand-600">CS</span>
          <span className="text-base md:text-lg">{APP_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {SITE_LINKS.map((link) => {
            const href = link.href.replace('/(modules)', '') as Route;
            const isActive = pathname.startsWith(href);
            return (
              <Button
                key={link.href}
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                asChild
              >
                <Link href={href}>{link.label}</Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Превключи тема"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" aria-hidden />
                  ) : (
                    <Moon className="h-5 w-5" aria-hidden />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Смяна на тема</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Меню">
                <Menu className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="md:hidden">
              <nav className="flex flex-col gap-2">
                {SITE_LINKS.map((link) => {
                  const href = link.href.replace('/(modules)', '') as Route;
                  const isActive = pathname.startsWith(href);
                  return (
                    <Link
                      key={link.href}
                      href={href}
                      className={cn(
                        'rounded-xl px-3 py-2 text-sm font-semibold transition',
                        isActive ? 'bg-brand-100 text-brand-600' : 'text-slate-700 hover:bg-slate-100'
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
