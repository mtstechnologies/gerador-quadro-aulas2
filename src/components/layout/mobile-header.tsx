'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Clock } from 'lucide-react';

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:hidden">
      <div className="flex items-center gap-2">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Clock className="h-5 w-5 text-primary" />
        </div>
        <span className="font-headline text-lg font-bold">
          SchoolTime
        </span>
      </div>
      <SidebarTrigger />
    </header>
  );
}
