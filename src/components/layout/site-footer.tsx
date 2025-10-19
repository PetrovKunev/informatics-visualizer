"use client";

import Link from 'next/link';
import { Github } from 'lucide-react';
import { APP_NAME, FOOTER_DISCLAIMER, SITE_LINKS } from '@/constants/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container flex flex-col gap-6 py-10 text-sm text-slate-600 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md space-y-2">
          <p className="text-base font-semibold text-slate-900">{APP_NAME}</p>
          <p>{FOOTER_DISCLAIMER}</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-8">
          <div>
            <p className="font-semibold text-slate-900">Модули</p>
            <nav className="mt-2 flex flex-col gap-1">
              {SITE_LINKS.map((link) => (
                <Link key={link.href} href={link.href.replace('/(modules)', '')} className="hover:text-brand-600">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Ресурси</p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/docs/architecture" className="hover:text-brand-600">
                  Архитектура
                </Link>
              </li>
              <li>
                <Link href="https://github.com" target="_blank" className="inline-flex items-center gap-1 hover:text-brand-600">
                  <Github className="h-4 w-4" aria-hidden />
                  Репозитория
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-100 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {APP_NAME}. Всички права запазени за образователни цели.
      </div>
    </footer>
  );
}
