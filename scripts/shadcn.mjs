#!/usr/bin/env node

// Скрипт за автоматизация с shadcn/ui.
// TODO: Да се интегрира официалният CLI при нужда от допълнителни компоненти.

const message = `
shadcn/ui CLI не е инсталиран по подразбиране.
За да добавите нови компоненти, изпълнете:
  pnpm dlx shadcn@latest add <component>
Документация: https://ui.shadcn.com
`;

console.log(message.trim());
